import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { WaveformAudioRecorder, WaveformAudioRecorderType } from 'waveform-audio-recorder'

export default function ViewTrans() {
    const [recorderState, setRecorderState] = useState<WaveformAudioRecorderType | null>(null)
    useShallowEffect(() => {
        load()
    }, [])

    async function load() {


    }

    return <>
        <div className='App'>

            <button onClick={recorderState?.initRecording ? recorderState?.saveRecording : recorderState?.startRecording}>
                {recorderState?.initRecording ? 'Stop' : 'Start'}
            </button>

            <WaveformAudioRecorder setRecorderState={setRecorderState} />

            {recorderState?.recordingDuration}
        </div>

    </>
}