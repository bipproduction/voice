import Google from '@opentranslate/google'
import { NextResponse } from 'next/server'

export async function GET() {
    const google = new Google()

    const result = await google.translate('saya mau sholat dulu', "id", "en")

    return NextResponse.json({
        success: true,
        result: result.trans.paragraphs
    })
}