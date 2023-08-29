import { NextResponse } from 'next/server'
import { v4 } from 'uuid'

import JSONDb from 'simple-json-db'
const db = new JSONDb('./src/util/storage.json')

export async function GET() {

    if (!db.has("user_id")) {
        db.set('user_id', v4())
    }

    return NextResponse.json({
        success: true,
        userId: db.get('user_id')
    })
}