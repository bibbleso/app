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
    <div
      className={`bg-first h-[100%] w-screen flex flex-col justify-center font-mono overflow-y-hidden`}>
      <AnimatePresence>
        {show ? (
          <motion.div
            variants={flyInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-first text-md text-center font-montserrat tracking-widest select-none">
            {data?.name}
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className={`p-5 grow overflow-y-auto`}></div>
      <ThemeSlider></ThemeSlider>
    </div>
  );
};

export default Network;
