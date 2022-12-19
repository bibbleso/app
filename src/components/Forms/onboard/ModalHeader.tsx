import React from 'react';
import style from './index.module.scss';

import { Cross, ArrowLeft } from 'src/components/Icons';

import { useModalContext } from 'src/store/context/modal';
import { useStepContext } from 'src/store/context/step';

import Logo from 'src/components/Assets/images/png/checksum/logo_purple.png';
import Image from 'next/image';

const ModalHeader = (props: any) => {
  const modalContext = useModalContext();
  const stepContext = useStepContext();

  const handleClose = () => {
    props.close(undefined);
  };

  const handleBack = () => {
    stepContext.back();
  };

  return (
    <>
      <div className={style.titleContainer}>
        {!modalContext.back ? null : (
          /*           <div className={style.buttonWrapper} onClick={handleClose}>
            <Cross size={12} />
          </div> */
          <div className={style.buttonWrapper} onClick={handleBack}>
            <ArrowLeft size={16} />
          </div>
        )}
        {/* <div className={style.title}>{props.title.toUpperCase()}</div> */}
        <div className={style.logo}>
          <Image
            alt="Checksum Logo"
            src={Logo}
            width={'56px'}
            height={'56px'}></Image>
        </div>
      </div>
      {props.children}
    </>
  );
};

export default ModalHeader;
