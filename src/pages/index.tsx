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
import Head from 'next/head';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

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
              setTimeout(() => router.push(`/${network}`), 400);
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
        <title>Home</title>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1, width=device-width, target-densitydpi=device-dpi"
        />
      </Head>
      <div
        className={`bg-first flex fixed h-[100%] w-screen flex-col justify-center font-mono transition-colors delay-250`}>
        <Header back={false} />
        <AnimatePresence>
          {show && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`flex flex-col justify-end h-fit p-1 pt-4`}>
              <h1 className="text-first text-4xl text-center font-lobster select-none">
                bibble
              </h1>
              <h1 className="text-first text-md text-center font-montserrat tracking-widest select-none mt-2">
                a friendly faucet
              </h1>
              <h1 className="text-first text-md text-center font-montserrat tracking-widest select-none">
                {`+ chain directory`}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {show && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`p-5 grow overflow-y-auto font-montserrat text-sm font-light`}>
              {buttons()}
            </motion.div>
          )}
        </AnimatePresence>
        <Footer>
          <ThemeSlider show={show}></ThemeSlider>
        </Footer>
      </div>
    </>
  );
};

export default Home;
