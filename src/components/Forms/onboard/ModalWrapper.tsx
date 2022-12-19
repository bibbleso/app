import React from 'react';
import style from './index.module.scss';

const Wrapper = (props: any) => {
  return (
    <>
      <div className={style.modal}>
        <div className={style.modalWrapper}>
          <div className={style.banner}></div>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Wrapper;
