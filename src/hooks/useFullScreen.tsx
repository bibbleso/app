import { useEffect, useState } from 'react';

const useFullScreen = () => {
  useEffect(() => {
    if (!window) return;
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }, []);
};

export default useFullScreen;
