import React, { useState, useEffect, useRef, ReactElement } from 'react';

import modalStyles from '../../index.module.scss';
import targetStyles from './index.module.scss';
import formStyle from '../../../index.module.scss';

import { Walletalt, Plus, Disc, Pluscircle } from 'src/components/Icons';

import { useStepContext } from 'src/store/context/step';

import FormInput from 'src/components/Input/FormInput';
import Button from 'src/components/Button';
import userService from 'src/services/user.service';
import { useStoreContext } from 'src/store/context/store';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useModalContext } from 'src/store/context/modal';

const Complete = (props: { close: any; data: any }) => {
  const storeContext = useStoreContext();
  const stepContext = useStepContext();
  const modalContext = useModalContext();

  const addressRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    //console.log(e);
  };

  const handleClick = async () => {
    stepContext.nav('complete');
    Router.push('/login');
  };

  useEffect(() => {
    modalContext.setBack(false);
  });

  return (
    <form action="">
      <div className={targetStyles.walletInputModal}>
        <div
          className={`${modalStyles.sectionTitle} ${modalStyles.blank}`}></div>
        <div
          className={`${targetStyles.completeHeader}`}>{`onboard process`}</div>
        <div className={`${targetStyles.completeTitle}`}>{`COMPLETE`}</div>
        <div
          className={`${targetStyles.instruction} ${targetStyles.top} ${targetStyles.bottom}`}>{`proceed back to login page`}</div>

        <div className={modalStyles.buttonContainer}>
          <Button
            className={modalStyles.button}
            type="secondary"
            theme="light"
            height={36}
            onClick={handleClick}>
            BACK TO LOGIN PAGE
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Complete;
