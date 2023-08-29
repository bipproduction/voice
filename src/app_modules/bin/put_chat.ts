'use server'
import { getUserId } from ".."

export async function putChat(text: string) {
    const userId = await getUserId()
    const res = await fetch(`https://bip-server-default-rtdb.asia-southeast1.firebasedatabase.app/voice/chat/${userId}.json`, {
        method: "PUT",
        body: JSON.stringify({ text }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(v => v.json()).then(v => v)

    return res
}