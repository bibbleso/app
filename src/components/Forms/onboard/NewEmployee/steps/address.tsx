import React, { useState, useEffect, useRef, ReactElement } from 'react';

import modalStyles from '../../index.module.scss';
import targetStyles from './index.module.scss';

import { Walletalt, Plus, Disc, Pluscircle } from 'src/components/Icons';

import { useStepContext } from 'src/store/context/step';

import FormInput from 'src/components/Input/FormInput';
import Button from 'src/components/Button';
import userService from 'src/services/user.service';
import { useStoreContext } from 'src/store/context/store';
import employeeService from 'src/services/employee.service';

const Address = (props: { close: any; data: any }) => {
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
    console.log(response);
    if (response instanceof Error) return console.log(response);
    console.log(stepContext.data);
    let response1 = await employeeService.addWalletWithId({
      id: stepContext.data.Employee[0].id,
      walletId: response.data.id,
      store: storeContext,
    });

    if (response instanceof Error) return console.log(response1);
    //stepContext.close();

    stepContext.nav('complete');
  };

  return (
    <form action="">
      <div className={targetStyles.walletInputModal}>
        <div
          className={`${modalStyles.sectionTitle} ${modalStyles.blank}`}></div>
        <div
          className={
            targetStyles.instruction
          }>{`this is where you will receive payment`}</div>
        <div
          className={`${targetStyles.instruction} ${targetStyles.bottom}`}>{`dont worry, it can be changed later`}</div>

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
          <div className={targetStyles.inputTitle}>Label</div>
          <FormInput
            ref={nameRef}
            className={targetStyles.input}
            type="text"
            value=""
            placeholder="Label"
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
