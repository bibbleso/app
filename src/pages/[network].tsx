import type { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/index.module.scss';
import Link from 'next/link';
import Router from 'next/router';
import Button from '../components/Button';

import { useEffect } from 'react';

import Image from 'next/image';

import Header from 'src/components/Header';

import { useRouter } from 'next/router';

import React, { useState } from 'react';

import useMobileDetect from 'src/hooks/useMobileDetect';

import { useStoreContext } from 'src/store/context/store';
import { useHasHydrated } from 'src/hooks/useHasHydrated';
import { useTest } from 'src/store/zustand';
import * as bibble from 'bibble';

import { ParsedUrlQuery } from 'querystring';

import { AnimatePresence, motion } from 'framer-motion';

import {
  container,
  items,
  fadeIn,
  flyInRight,
  flyInLeft,
} from 'src/components/Animations';
import ThemeSlider from 'src/components/Theme/themeSlider';

interface IParams extends ParsedUrlQuery {
  network: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = bibble.availableNetworks?.map((i: string) => {
    return { params: { network: i } };
  });
  return {
    paths: paths || [{ params: { network: '' } }],
    fallback: true, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // This is where the error occurs
  const { network } = context.params as IParams; // Property 'slug' does not exist on type 'ParsedUrlQuery | undefined'
  const n = bibble.networks.filter((i) => i.name === network);
  if (!n[0]) {
    return {
      notFound: true,
    };
  }

  return { props: { data: n[0] } };
};

const Network: NextPage = ({ data }: any) => {
  const storeContext = useStoreContext();
  const [theme, setTheme] = useState(storeContext.theme[0]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTheme(storeContext.theme[0]);
  }, []);
  return (
    <>
      <Head>
        <title>{data?.name}</title>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1, width=device-width, target-densitydpi=device-dpi"
        />
      </Head>
      <div
        className={`fixed bg-first h-[100%] w-screen flex flex-col justify-center items-center font-mono overflow-hidden select-none text-7xl font-next text-first`}>
        <Header back={true} />
        <AnimatePresence>
          {show ? (
            <motion.div
              variants={flyInRight}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`pr-4 pl-4 w-[100%] max-w-lg grow flex flex-col align-top overflow-hidden`}>
              <div className="pt-3 pb-3 space-y-2 pr-3 pl-3">
                <div className="text-lg text-center tracking-widest pb-2">
                  {data?.name}
                </div>
                <div className="text-xs text-center tracking-widest">
                  {data?.desc}
                </div>
              </div>

              <div className={`overflow-y-auto overflow-x-hidden`}>
                <div className="flex flex-row border-solid text-xs border-first border-t-[0.05em] pr-5 pl-3 pt-3 pb-3 uppercase">
                  <div className="grow">network id</div>
                  <div className="">{data?.id ? data.id : 'null'}</div>
                </div>

                {/* Docs */}
                <div className="flex flex-col border-solid text-xs border-first border-t-[0.05em] pr-5 pl-3 pt-3 pb-3 ">
                  <div className="grow uppercase">docs</div>
                  <div className="pl-3">{data?.docs}</div>
                </div>

                {/* RPC */}
                <div className="flex flex-col border-solid text-xs border-first border-t-[0.05em] pr-5 pl-3 pt-3 pb-3 ">
                  <div className="grow uppercase">rpc</div>
                  <div className="pl-3">{data?.rpc}</div>
                </div>

                {/* WSS */}
                <div className="flex flex-col border-solid text-xs border-first border-t-[0.05em] pr-5 pl-3 pt-3 pb-3">
                  <div className="grow uppercase">wss</div>
                  <div className="pl-3">{data?.wss}</div>
                </div>

                {/* explorer */}
                <div className="flex flex-col border-solid text-xs border-first border-t-[0.05em] pr-5 pl-3 pt-3 pb-3">
                  <div className="grow uppercase">explorer</div>
                  <div className="pl-3">{data?.explorer}</div>
                </div>

                {/* repo */}
                <div className="flex flex-col border-solid text-xs border-first border-t-[0.05em] pr-5 pl-3 pt-3 pb-3">
                  <div className="grow uppercase">repo</div>
                  <div className="pl-3">{data?.repo}</div>
                </div>

                {/* UNL */}
                {data?.vl ? (
                  <div className="flex flex-col border-solid text-xs border-first border-t-[0.05em] pr-5 pl-3 pt-3 pb-3">
                    <div className="grow uppercase">unl</div>
                    <div className="pl-3">{JSON.stringify(data?.vl)}</div>
                  </div>
                ) : null}

                {/* peers */}
                {data?.peers ? (
                  <div className="flex flex-col border-solid text-xs border-first border-t-[0.05em] pr-5 pl-3 pt-3 pb-3">
                    <div className="grow uppercase">peers</div>
                    <div className="pl-3">{JSON.stringify(data?.peers)}</div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <ThemeSlider></ThemeSlider>
      </div>
    </>
  );
};

export default Network;
