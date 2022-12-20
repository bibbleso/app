import React, { useEffect, useState, useRef } from 'react';

import { useStoreContext } from '../../store/context/store';
import themes from './scripts/themes.json';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import {
  container,
  items,
  fadeIn,
  flyInRight,
} from 'src/components/Animations';

interface Props {
  show: boolean;
}

const ThemeSlider = ({ show }: Props) => {
  const storeContext = useStoreContext();
  const sliderRef = useRef<any>();
  const [index, setIndex] = useState(themes.indexOf(storeContext.theme[0]));

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

  return (
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
  );
};

export default ThemeSlider;
