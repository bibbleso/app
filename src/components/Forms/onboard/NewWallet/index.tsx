import React, { Suspense, lazy, useState } from 'react';
import style from '../index.module.scss';

import {
  StepRouter,
  StepContextProvider,
  useStepContext,
} from 'src/store/context/step';
import { directory, steps } from './directory';
import ModalHeader from '../ModalHeader';

const App = (props: { close: any }) => {
  const stepContext = useStepContext();
  return (
    <div className={style.modalContent}>
      {StepRouter(stepContext, directory)}
    </div>
  );
};

const Index = (props: any) => {
  return (
    <StepContextProvider steps={steps} close={props.close}>
      <ModalHeader close={props.close} title={props.title} />
      <App close={props.close} />
    </StepContextProvider>
  );
};

export default Index;
