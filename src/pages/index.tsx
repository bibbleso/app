import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.scss';

import React, { useEffect, useRef, useState } from 'react';

import { useTest } from 'src/store/zustand';
import { wait } from '@/lib/helpers/wait';
import { useHasHydrated } from 'src/hooks/useHasHydrated';
import { useZustandStore, useZustandStore1 } from 'src/hooks/useZustandStore';
import { useStoreContext } from 'src/store/context/store';
import ThemeToggle from 'src/components/Theme/themeToggle';
import Button from 'src/components/Button';
import * as bibble from 'bibble';
import ThemeSlider from 'src/components/Theme/themeSlider';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import { container, items, fadeIn } from 'src/components/Animations';
import { Head } from 'next/document';

const Home: NextPage = () => {
  const router = useRouter();
  const color = useZustandStore(useTest, (state) => state.color);
  const setColor = useZustandStore(useTest, (state) => state.setColor);
  const storeContext = useStoreContext();
  const [theme, setTheme] = useState(storeContext.theme[0]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTheme(storeContext.theme[0]);
    setShow(true);
  }, [storeContext.theme[0]]);

  const buttons = () => {
    if (bibble)
      return bibble?.availableNetworks?.map((network) => (
        <motion.div variants={items}>
          <Button
            className={`w-100 flex flex-row justify-center align-middle pb-3`}
            type={'primary'}
            theme={theme}
            onClick={() => {
              setShow(false);
              setTimeout(() => router.push(`/${network}`), 300);
            }}>
            <div>{network}</div>
          </Button>
        </motion.div>
      ));
    return 'loading';
  };

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        className={`bg-first flex h-screen w-screen flex-col justify-center font-mono`}>
        <AnimatePresence>
          {show ? (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`flex flex-col justify-end h-[160px] p-5 pt-8`}>
              <h1 className="text-first text-4xl text-center font-lobster select-none">
                bibble
              </h1>
              <h1 className="text-first text-md text-center font-montserrat tracking-widest select-none">
                a friendly faucet
              </h1>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {show ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`p-5 grow overflow-y-auto`}>
              {buttons()}
            </motion.div>
          ) : null}
        </AnimatePresence>
        <ThemeSlider></ThemeSlider>
      </div>
    </>
  );
};

export default Home;
