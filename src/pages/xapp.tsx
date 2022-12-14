import type { NextPage } from 'next';
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

import { useOtt } from 'src/store/zustand';

const XApp: NextPage = () => {
  const mobileDetect = useMobileDetect();
  const storeContext = useStoreContext();

  const router = useRouter();

  const [token, setToken] = useState<string | undefined>(undefined);
  const [style, SetStyle] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSignup = () => {
    Router.push('/signup');
  };

  const { fetchTokenData, tokenData, wallet } = useOtt();

  const fetchOtt = async (token: string) => {
    await fetchTokenData(token);
    console.log(tokenData);
    return setIsLoading(false);
  };

  useEffect(() => {
    if (token && typeof window !== 'undefined' && mobileDetect.isXApp()) {
      const { xApp } = require('xumm-xapp-sdk');
      const xapp = new xApp();
      window.sdk = xapp;
      fetchOtt(token);
    }
  }, [token]);

  useEffect(() => {
    let { xAppToken, xAppStyle } = router.query;
    if (typeof xAppStyle == 'object') xAppStyle = xAppStyle[0];
    if (typeof xAppToken == 'object') xAppToken = xAppToken[0];
    setToken(xAppToken);
  });

  return (
    <>
      <Head>
        <title>apex</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default XApp;
