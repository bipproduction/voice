import 'colors'
import { NextResponse } from 'next/server'
import { ChatGPTAPI } from 'chatgpt'
import JSONDb from 'simple-json-db'
import { putChat } from '@/app_modules/bin/put_chat'
import { funCobaFdb } from '@/app_modules/bin/coba_fbd'
const db = new JSONDb('./src/util/storage.json')
const api = new ChatGPTAPI({ apiKey: process.env.AI_KEY as string })

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {

    const { message } = await req.json();

    if (!message) return NextResponse.json({
        success: false,
        message: "message empty or null"
    }, {
        status: 201
    })

    await new Promise(async (a, b) => {
        // Check if there is a chat ID stored in the database
        if (!db.has('chat_id')) {
            api.sendMessage(message, {
                messageId: db.get("chat_id"),
                onProgress: async (val) => {
                    funCobaFdb(val.text)
                },

            }).then((val) => {
                db.set("chat_id", val.id);
                funCobaFdb(val.text)
                a(true)
            });

        } else {
            api.sendMessage(message, {
                messageId: db.get("chat_id"),
                onProgress: async (val) => {
                    funCobaFdb(val.text)
                },

            }).then(val => {
                funCobaFdb(val.text)
                a(true)
            });
        }
    })
    return NextResponse.json({
        success: true
    }, {
        status: 201
    })
}