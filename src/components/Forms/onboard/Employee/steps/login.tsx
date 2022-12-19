import React, { useState, useEffect, useRef, ReactElement } from 'react';

import modalStyles from '../../index.module.scss';
import targetStyles from './index.module.scss';
import formStyle from '../../../index.module.scss';

import { Walletalt, Plus, Disc, Pluscircle } from 'src/components/Icons';

import FormInput from 'src/components/Input/FormInput';
import Input from 'src/components/Input';

import { useStepContext } from 'src/store/context/step';
import { useModalContext } from 'src/store/context/modal';

import Link from 'next/link';

import Button from 'src/components/Button';

import {
  Profile,
  User,
  Emailclosed,
  Keyhold,
  Arrowclockwiseback,
} from 'src/components/Icons';
import userService from 'src/services/user.service';
import { verify } from 'jsonwebtoken';

const Login = (props: any) => {
  const stepContext = useStepContext();
  const modalContext = useModalContext();

  const usernameRef = useRef<HTMLFormElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [buttonActive, setButtonActive] = useState<Boolean>(false);
  const [vis, setVis] = useState<boolean>(false);

  const handleChange = () => {};

  const handleNav = (page: string) => {
    stepContext.nav(page);
  };

  const handleClick = async () => {
    if (!passwordRef.current?.value) return;

    let auth = await userService.authenticate({
      user: stepContext.data.User.username,
      pass: passwordRef.current.value,
    });
    if (auth instanceof Error) return console.log(auth);
    handleNav('start');
  };

  useEffect(() => {
    modalContext.setBack(false);
  });

  return (
    <form action="">
      <div className={targetStyles.start}>
        <div className={formStyle.title}>WELCOME TO CHECKSUM</div>
        <div
          className={
            modalStyles.sectionSubTitle
          }>{`${stepContext.data.Organization.name} would like to add you as an employee`}</div>

        <div className={targetStyles.inputContainer}>
          <form className={targetStyles.form} action="">
            <div
              className={
                targetStyles.instruction
              }>{`you need to log in first`}</div>

            <Input
              ref={passwordRef}
              className={targetStyles.input}
              type={!vis ? 'password' : 'text'}
              value=""
              placeholder="password"
              label=""
              onChange={handleChange}>
              <div className={targetStyles.icon} onClick={() => setVis(!vis)}>
                <Keyhold size={16} />
              </div>
            </Input>

            <div className={targetStyles.buttonContainer}>
              <Button
                className={targetStyles.button}
                type="secondary"
                theme="light"
                height={36}
                onClick={handleClick}>
                ENTER
              </Button>
            </div>
          </form>
        </div>
      </div>
    </form>
  );
};

export default Login;
