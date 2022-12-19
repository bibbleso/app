import React, { useState, useEffect, useRef, ReactElement } from 'react';

import modalStyles from '../../index.module.scss';
import targetStyles from './index.module.scss';

import { Walletalt, Plus, Disc, Pluscircle } from 'src/components/Icons';

import { useStepContext } from 'src/store/context/step';

import FormInput from 'src/components/Input/FormInput';
import Button from 'src/components/Button';
import userService from 'src/services/user.service';
import { useStoreContext } from 'src/store/context/store';

const Address = (props: { close: any }) => {
  const storeContext = useStoreContext();
  const stepContext = useStepContext();

  const addressRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    //console.log(e);
  };

  const handleClick = async () => {
    if (!addressRef.current?.value) return;

    let details: any = {
      address: addressRef.current.value,
      provider: 'OBSERVATION',
      name: nameRef.current?.value ? nameRef.current.value : undefined,
      description: descriptionRef.current?.value
        ? descriptionRef.current.value
        : undefined,
    };

    let response = await userService.addWallet({
      ...details,
      store: storeContext,
    });

    if (response instanceof Error) return console.log(response);
    stepContext.close();
  };

  return (
    <form action="">
      <div className={targetStyles.walletInputModal}>
        <div
          className={`${modalStyles.sectionTitle} ${modalStyles.blank}`}></div>
        <div className={targetStyles.inputContainer}>
          <div className={targetStyles.inputTitle}>Public Address</div>
          <FormInput
            ref={addressRef}
            className={targetStyles.input}
            type="text"
            value=""
            placeholder="XRPL public address"
            onChange={handleChange}></FormInput>
        </div>

        <div className={targetStyles.inputContainer}>
          <div className={targetStyles.inputTitle}>Name</div>
          <FormInput
            ref={nameRef}
            className={targetStyles.input}
            type="text"
            value=""
            placeholder="Name"
            onChange={handleChange}></FormInput>
        </div>

        <div className={targetStyles.inputContainer}>
          <div className={targetStyles.inputTitle}>Description</div>
          <FormInput
            ref={descriptionRef}
            className={targetStyles.input}
            type="text"
            value=""
            placeholder="Add a desciption for this wallet"
            onChange={handleChange}></FormInput>
        </div>

        <div className={targetStyles.buttonContainer}>
          <Button
            className={targetStyles.button}
            type="secondary"
            theme="light"
            height={36}
            onClick={handleClick}>
            NEXT
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Address;
