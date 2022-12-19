import React, { useState, useEffect, useRef, ReactElement } from 'react';
import style from '../index.module.scss';

import FormInput from 'src/components/Input/FormInput';
import Button from 'src/components/Button';
import ModalHeader from 'src/components/Modal/ModalHeader';
import orgService from 'src/services/org.service';

import { useStoreContext } from 'src/store/context/store';

const NewEmployee = (props: any) => {
  const storeContext = useStoreContext();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLInputElement>(null);
  const orgRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    //console.log(e);
  };

  const getOrg = async (name: string) => {
    return await orgService.findByName(name);
  };

  const handleClick = async () => {
    if (
      !firstNameRef.current?.value ||
      !lastNameRef.current?.value ||
      !emailRef.current?.value ||
      !orgRef.current?.value
    )
      return;

    let org: any = await getOrg(orgRef.current.value);
    if (org instanceof Error) return console.log(org);

    let response = await orgService.addEmployee({
      email: emailRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      orgId: org.data.id,
      note: noteRef.current?.value ? noteRef.current.value : undefined,
      store: storeContext,
    });

    if (response instanceof Error) return console.log(response);
    props.close();
  };

  return (
    <>
      <ModalHeader close={props.close} title={props.title} />
      <div className={style.modalContent}>
        <form action="">
          <div className={`${style.sectionTitle} ${style.blank}`}></div>

          <div className={style.inputContainer}>
            <div className={style.inputTitle}>Business</div>
            <FormInput
              ref={orgRef}
              className={style.input}
              type="text"
              value=""
              placeholder="Name"
              onChange={handleChange}></FormInput>
          </div>

          <div className={style.inputContainer}>
            <div className={style.inputTitle}>First Name</div>
            <FormInput
              ref={firstNameRef}
              className={style.input}
              type="text"
              value=""
              placeholder="Name"
              onChange={handleChange}></FormInput>
          </div>

          <div className={style.inputContainer}>
            <div className={style.inputTitle}>Last Name</div>
            <FormInput
              ref={lastNameRef}
              className={style.input}
              type="text"
              value=""
              placeholder="Name"
              onChange={handleChange}></FormInput>
          </div>

          <div className={style.inputContainer}>
            <div className={style.inputTitle}>Email</div>
            <FormInput
              ref={emailRef}
              className={style.input}
              type="text"
              value=""
              placeholder="Email address"
              onChange={handleChange}></FormInput>
          </div>

          <div className={style.inputContainer}>
            <div className={style.inputTitle}>Note</div>
            <FormInput
              ref={noteRef}
              className={style.input}
              type="text"
              value=""
              placeholder="Add a description ( Optional )"
              onChange={handleChange}></FormInput>
          </div>

          <div className={style.buttonContainer}>
            <Button
              className={style.button}
              type="secondary"
              theme="light"
              height={36}
              onClick={handleClick}>
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewEmployee;
