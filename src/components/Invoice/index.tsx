import React, { useEffect, useState } from 'react';

import style from './index.module.scss';

import Router from 'next/router';

import { useStoreContext } from 'src/store/context/store';

import Button from 'src/components/Button';
import { axiosPrivate } from '@/lib/axios/axiosPrivate';
import invoiceService from '@/api/services/invoice.service';

interface Props {
  invoice: any;
}

const Invoice = ({ invoice }: Props) => {
  const handleLogin = () => {
    Router.push('/login');
  };
  const storeContext = useStoreContext();

  const getUser = async () => {
    await axiosPrivate(storeContext, false).get('/users/ping');
  };

  useEffect(() => {
    console.log(invoice);
    if (!storeContext.user?.username) getUser();
  });

  return (
    <>
      <div className={style.container}>
        <form className={style.form} action="">
          <div className={style.title}>INVOICE</div>
          <div className={style.subtitle}>{JSON.stringify(invoice)}</div>
          {storeContext.user && storeContext.user.id === invoice.senderId ? (
            <>
              {/*               <Button
                className={style.button}
                type="secondary"
                theme="light"
                height={40}
                onClick={handleLogin}>
                EDIT
              </Button> */}
              <Button
                className={style.button}
                type="secondary"
                theme="light"
                height={40}
                onClick={handleLogin}>
                CANCEL
              </Button>
            </>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default Invoice;
