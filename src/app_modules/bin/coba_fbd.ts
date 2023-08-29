'use server'
import 'colors'
import fdb from "@/util/firebase_config"
import { ref, set } from "firebase/database"
import { getUserId } from ".."

export async function funCobaFdb(message: string) {
    const usrId = await getUserId()
    set(ref(fdb, `voice/chat/${usrId}/text`), message).then((v) => {

    }).catch((e) => {
        console.log("error".red, e)
    })
}