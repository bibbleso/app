import React, { useEffect, useState, useRef } from 'react';

import { Sun } from '../Icons';
import { useStoreContext } from '../../store/context/store';
import style from './index.module.scss';
import themes from './scripts/themes.json';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import {
  container,
  items,
  fadeIn,
  flyInRight,
} from 'src/components/Animations';
import Button from 'src/components/Button';

interface Props {
  show: boolean;
}

const FooterButton = ({ show }: Props) => {
  const storeContext = useStoreContext();

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          variants={flyInRight}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`h-full flex flex-row justify-center items-center `}>
          <Button
            className={`w-100 h-full flex flex-row justify-center items-center align-middle font-light font-next text-lg`}
            type={'primary'}
            theme={storeContext.theme[0]}
            onClick={() => {}}>
            <div>faucet</div>
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default FooterButton;
