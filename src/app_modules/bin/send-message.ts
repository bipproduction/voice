'use server'
import { ChatGPTAPI } from 'chatgpt'
import 'colors'
import JSONDb from 'simple-json-db'
import { funCobaFdb } from './coba_fbd'
import _ from 'lodash'
const db = new JSONDb('./src/util/storage.json')
const api = new ChatGPTAPI({ apiKey: process.env.AI_KEY as string })

export async function sendMessage(message: string) {
    console.log(message)
    if (_.isEmpty(message)) return {
        success: false,
        message: "empty message"
    }

    if (!db.has('chat_id')) {
        await api.sendMessage(message, {
            messageId: db.get("chat_id"),
            onProgress: async (val) => {
                // putChat(val.text)
                funCobaFdb(val.text)
            },

        }).then(async (val) => {
            db.set("chat_id", val.id);
            // await putChat(val.text)
            // funCobaFdb(val.text)
        });

    } else {
        await api.sendMessage(message, {
            messageId: db.get("chat_id"),
            onProgress: async (val) => {
                console.log(val.text)
                funCobaFdb(val.text)
            },

        }).then(async (val) => {
            // funCobaFdb(val.text)
        });
    }

    return {
        success: true,
        message: "success"
    }
}