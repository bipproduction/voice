'use client'
import { Box, Button, Center, Flex, Group, Loader, Paper, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from '@mantine/hooks';

import { useHookstate } from "@hookstate/core";
import { useState } from "react";
import { MdMic, MdMicOff } from 'react-icons/md';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { WaveformAudioRecorder, WaveformAudioRecorderType } from 'waveform-audio-recorder';
import { val_chat } from "../val/chat";

// export const dynamic = 'force-dyanamic'

export default function ViewSpech() {
    const [recorderState, setRecorderState] = useState<WaveformAudioRecorderType | null>(null)
    const [client, setClient] = useState(false)
    const { value: chat, set: setChat } = useHookstate(val_chat)
    const [loading, setLoading] = useState(false)
    const [ask, setAsk] = useState("")

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    useShallowEffect(() => {
        if (window) return setClient(true)
    }, [])

    useShallowEffect(() => {
        if (transcript.split(' ').includes("answer")) {
            const message = transcript.replace('answer', '')
            setAsk(message)
            setLoading(true)
            try {
                recorderState?.saveRecording()
                SpeechRecognition.stopListening()
            } catch (error) {
                console.log("mic sudah mati")
            }

            fetch('/api/completion', {
                method: "POST",
                body: JSON.stringify({ message }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((v) => {
                if (v.status === 201) {
                    setLoading(false)
                    resetTranscript()
                }
            })

        }
    }, [transcript])

    if (!client) return <></>

    return (<>
        <Stack align="center">
            <Stack >
                <Stack>
                    <Title>
                        BIP VOICE AI
                    </Title>
                    <Text>Wibu dev</Text>
                </Stack>
                <Group position={"center"}>
                    <Paper bg={"gray.0"} shadow="sm" w={720}>
                        <Stack align="center"  >
                            <Box p={"lg"} bg={"gray.2"} w={"100%"} >
                                <Center>
                                    <WaveformAudioRecorder setRecorderState={setRecorderState} />
                                </Center>
                            </Box>
                            <Center p={"md"}>
                                {listening ? <MdMic color={"blue"} size={32} /> : <MdMicOff size={32} />}
                            </Center>
                            <Flex gap={"lg"} p={"md"}>
                                <Button onClick={() => {
                                    SpeechRecognition.startListening({
                                        continuous: true
                                    })
                                    recorderState?.startRecording()

                                }} disabled={listening}>Start</Button>
                                <Button onClick={() => {
                                    SpeechRecognition.stopListening()
                                    recorderState?.saveRecording()
                                    resetTranscript()

                                }} disabled={!listening}>Stop</Button>
                                {/* <Button onClick={resetTranscript}>Reset</Button> */}
                            </Flex>
                            <Text fs={"italic"}>Triger Answer Use [ oke ]</Text>
                            {loading ? <Center><Loader /></Center> : null}
                            <Text p={"md"} size={24} c={"cyan"}>{transcript.replace("oke", "")}</Text>

                        </Stack>
                    </Paper>
                </Group>
                <Paper w={720}>
                    <Stack bg={"gray.1"}>
                        <Text p={"md"} fw={"bold"}>{ask}</Text>
                        <Text p={"md"} mah={360} w={"100%"}>
                            {chat}
                        </Text>
                    </Stack>
                </Paper>
            </Stack>
        </Stack>
    </>)
}