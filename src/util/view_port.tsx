'use client'

import { Center, Title } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks"

export default function ViewViewPort({ children }: { children: any }) {
    const { width, height } = useViewportSize()

    if (width < 100) return <></>
    if (width < 720) return <Center bg={"black"} w={"100wh"} h={"100vh"}>
        <Title p={"lg"} c={"white"} align="center" >App Hanya Dikembangkan Untuk Desktop View Port</Title>
    </Center>
    return <>
        {children}
    </>
}