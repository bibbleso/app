import React, { useState, useEffect, useRef, ReactElement } from 'react';

import modalStyles from '../../index.module.scss';
import targetStyles from './index.module.scss';
import formStyle from '../../../index.module.scss';

import { Walletalt, Plus, Disc, Pluscircle, Copy } from 'src/components/Icons';

import { useStepContext } from 'src/store/context/step';
import { useModalContext } from 'src/store/context/modal';

const Wallet = () => {
  const stepContext = useStepContext();
  const modalContext = useModalContext();

  const handleClick = (page: string) => {
    stepContext.nav(page);
    modalContext.setBack(true);
  };

  return (
    <form action="">
      <div className={targetStyles.start}>
        <div className={formStyle.title}>WELCOME TO CHECKSUM</div>
        <div
          className={
            modalStyles.sectionSubTitle
          }>{`${stepContext.data.Organization.name} would like to add you as an employee`}</div>

        <div
          className={
            targetStyles.instruction
          }>{`where would you like to receive payment`}</div>
        <div
          className={targetStyles.container}
          onClick={() => handleClick('provider')}>
          <div className={targetStyles.logo}>
            <Copy size={24} fill={'#6e30d7ff'} stroke={'#6e30d7ff'} />
          </div>
          <div className={targetStyles.wrapper}>
            <div className={targetStyles.title}>ADD WALLET WITH A PROVIDER</div>
            <p className={targetStyles.description}>
              Add a wallet using an already existing wallet on another platform.
              Our interagration with third-party wallet providers is based on
              user feedback and developer support.{' '}
            </p>
          </div>
        </div>

        <div
          className={targetStyles.container}
          onClick={() => handleClick('address')}>
          <div className={targetStyles.logo}>
            <Pluscircle size={24} fill={'#6e30d7ff'} stroke={'#6e30d7ff'} />
          </div>
          <div className={targetStyles.wrapper}>
            <div className={targetStyles.title}>ADD PUBLIC WALLET ADDRESS</div>
            <p className={targetStyles.description}>
              Add a wallet with a public address. You will be able to receive
              funds, but you will not be able to send funds until you add your
              recovery key.
            </p>
          </div>
        </div>
        <div
          className={targetStyles.container}
          onClick={() => handleClick('new')}>
          <div className={targetStyles.logo}>
            <Walletalt size={26} fill={'#6e30d7ff'} stroke={'#6e30d7ff'} />
          </div>
          <div className={targetStyles.wrapper}>
            <div className={targetStyles.title}>CREATE A NEW WALLET</div>
            <p className={targetStyles.description}>
              Create a new wallet with checksum
            </p>
          </div>
        </div>
        <div
          className={targetStyles.container}
          onClick={() => handleClick('restore')}>
          <div className={targetStyles.logo}>
            <Disc size={24} fill={'#6e30d7ff'} stroke={'#6e30d7ff'} />
          </div>
          <div className={targetStyles.wrapper}>
            <div className={targetStyles.title}>RECOVER WALLET FROM BACKUP</div>
            <p className={targetStyles.description}>
              Add a recovery key for wallet
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Wallet;
