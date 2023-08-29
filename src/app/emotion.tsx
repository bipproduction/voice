'use client';
import { getUserId } from '@/app_modules';
import { val_chat } from '@/app_modules/val/chat';
import fdb from '@/util/firebase_config';
import ViewViewPort from '@/util/view_port';
import { CacheProvider } from '@emotion/react';
import { useHookstate } from '@hookstate/core';
import { MantineProvider, useEmotionCache } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { onValue, ref, onChildChanged } from 'firebase/database';

import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
import 'regenerator-runtime';

export default function RootStyleRegistry({ children }: { children: React.ReactNode }) {
  const cache = useEmotionCache();
  cache.compat = true;
  const { value: chat, set: setChat } = useHookstate(val_chat)
  const [isClient, setIsclient] = useState(false)

  useShallowEffect(() => {
    load()
  }, [])

  useShallowEffect(() => {
    if (window) setIsclient(true)
  }, [])

  async function load() {

    const usrId = await getUserId()

    onChildChanged(ref(fdb, `voice/chat/${usrId}`), (val) => {
      console.log(val.val())
      setChat(val.val())
    })

    return onValue(ref(fdb, `voice/chat/${usrId}/text`), (val) => {
      // console.log(val.val())
    });

  }

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  if (!isClient) return <></>
  return (
    <CacheProvider value={cache}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ViewViewPort>
          {children}
        </ViewViewPort>
      </MantineProvider>
    </CacheProvider>
  );
}
