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

const Start = (props: any) => {
  const stepContext = useStepContext();
  const modalContext = useModalContext();

  const usernameRef = useRef<HTMLFormElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatRef = useRef<HTMLInputElement>(null);

  const [buttonActive, setButtonActive] = useState<Boolean>(false);
  const [vis, setVis] = useState<boolean>(false);

  const handleChange = () => {};

  const handleNav = (page: string) => {
    stepContext.nav(page);
    modalContext.setBack(true);
  };

  const handleClick = async () => {
    if (
      !usernameRef.current?.value ||
      !passwordRef.current?.value ||
      !repeatRef.current?.value
    )
      return;

    let response = await userService.onboard({
      id: stepContext.data.User.id,
      email: stepContext.data.User.email,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: repeatRef.current.value,
      acceptTerms: false,
      verified: true,
    });

    if (response instanceof Error) return console.log(response);
    console.log(response);
    let auth = await userService.authenticate({
      user: usernameRef.current.value,
      pass: passwordRef.current.value,
    });
    if (auth instanceof Error) return console.log(response);
    handleNav('wallet');
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

        {/*         <div className={modalStyles.inputContainer}>
          <div className={modalStyles.inputTitle}>Username</div>
          <FormInput
            ref={usernameRef}
            className={modalStyles.input}
            type="text"
            value=""
            placeholder="Username"
            onChange={handleChange}></FormInput>
        </div>
        <div className={modalStyles.inputContainer}>
          <div className={modalStyles.inputTitle}>Password</div>
          <FormInput
            ref={usernameRef}
            className={modalStyles.input}
            type="text"
            value=""
            placeholder="Password"
            onChange={handleChange}></FormInput>
        </div>
        <div className={modalStyles.inputContainer}>
          <div className={modalStyles.inputTitle}>Repeat Password</div>
          <FormInput
            ref={usernameRef}
            className={modalStyles.input}
            type="text"
            value=""
            placeholder="Repeat Password"
            onChange={handleChange}></FormInput>
        </div> */}

        {/* <div className={formStyle.title}>WELCOME BACK</div> */}
        {/* <div className={formStyle.subtitle}>Welcome back. Please enter your details.</div> */}
        {/*         <div className={formStyle.container}> */}

        <div className={targetStyles.inputContainer}>
          <form className={targetStyles.form} action="">
            <div
              className={
                targetStyles.instruction
              }>{`let's setup your account`}</div>
            <Input
              ref={usernameRef}
              className={targetStyles.input}
              type="text"
              value=""
              placeholder="username"
              label=""
              onChange={handleChange}>
              <div className={targetStyles.icon}>
                <Profile size={16} className={formStyle.profile} />
              </div>
            </Input>

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

            <Input
              ref={repeatRef}
              className={targetStyles.input}
              type={!vis ? 'password' : 'text'}
              value=""
              placeholder="repeat password"
              label=""
              onChange={handleChange}>
              <div className={targetStyles.icon} onClick={() => setVis(!vis)}>
                <Arrowclockwiseback size={16} />
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
        {/*         </div> */}
      </div>
    </form>
  );
};

export default Start;
