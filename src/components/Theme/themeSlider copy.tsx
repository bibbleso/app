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
  button?: boolean;
}

const ThemeSlider = ({ show, button }: Props) => {
  const storeContext = useStoreContext();
  const sliderRef = useRef<any>();
  const [index, setIndex] = useState(themes.indexOf(storeContext.theme[0]));

  const { scrollX } = useScroll({
    container: sliderRef,
  });

  const handleThemeChange = (theme: string) => {
    storeContext.theme[1](theme);
    setIndex(themes.indexOf(theme));
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 48 + 88 * index;
    }
  }, [index, sliderRef.current]);

  const slider = () => {
    return themes.map((theme) => (
      <motion.div
        variants={items}
        className={`snap-center w-fit h-fit rounded-full bg-first ring-1 ring-third ring-offset-4 ring-offset-first mr-7 ml-7`}>
        <div
          onClick={() => handleThemeChange(theme)}
          className={`theme-${theme} bg-first rounded-full ${
            theme === storeContext.theme[0] ? 'w-10 h-10' : 'w-[32px] h-[32px]'
          }`}></div>
      </motion.div>
    ));
  };

  const fundButton = () => {
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

  return (
    <div
      ref={sliderRef}
      className={`shrink-0 scroll-smooth will-change-scroll snap-mandatory snap-x w-[100%] overflow-y-hidden overflow-x-scroll border-solid border-third border-t-[0.062rem] no-scrollbar min-h-[60px]`}>
      {button ? (
        fundButton()
      ) : (
        <AnimatePresence>
          {show ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`pl-[50%] pr-[50%] flex flex-row justify-start items-center w-fit h-[59px]`}>
              {slider()}
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
    </div>
  );
};

export default ThemeSlider;
