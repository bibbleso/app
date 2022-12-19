import React, { useState, useEffect, useRef, ReactElement } from 'react';
import style from './index.module.scss';

import FormInput from '../Input/FormInput';
import Button from 'src/components/Button';
import ModalHeader from './ModalHeader';
import orgService from 'src/services/org.service';
import { useStoreContext } from 'src/store/context/store';

const NewBusiness = (props: any) => {
  const storeContext = useStoreContext();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    //console.log(e);
  };

  const handleClick = async () => {
    if (!nameRef.current?.value) return;

    let details: any = {
      name: nameRef.current.value,
      description: descriptionRef.current?.value
        ? descriptionRef.current.value
        : undefined,
    };

    let response = await orgService.create({ ...details, store: storeContext });

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
            <div className={style.inputTitle}>Name</div>
            <FormInput
              ref={nameRef}
              className={style.input}
              type="text"
              value=""
              placeholder="Name"
              onChange={handleChange}></FormInput>
          </div>

          <div className={style.inputContainer}>
            <div className={style.inputTitle}>Description</div>
            <FormInput
              ref={descriptionRef}
              className={style.input}
              type="text"
              value=""
              placeholder="Add a description ( optional )"
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

export default NewBusiness;
