'use server'
import JSONDb from 'simple-json-db'
import { v4 } from 'uuid'
const db = new JSONDb('./src/util/storage.json')

export async function getUserId() {
    if (!db.has('user_id')) {
        db.set('user_id', v4())
    }
    return db.get('user_id')
}