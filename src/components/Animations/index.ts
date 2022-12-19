export const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  show: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const items = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
  show: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    scale: 1,
    x: 'calc(-200vw)',
    transition: {
      duration: 0.5,
    },
  },
};

export const flyInRight = {
  hidden: {
    opacity: 1,
    scale: 1,
    x: 'calc(200vw)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    x: 'calc(-200vw)',
    transition: {
      duration: 0.5,
    },
  },
};

export const flyInLeft = {
  hidden: {
    opacity: 1,
    scale: 0,
    x: 'calc(-200vw)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    scale: 1,
    x: 'calc(-200vw)',
    transition: {
      duration: 0.5,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
  show: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    scale: 1,
    x: 'calc(-200vw)',
    transition: {
      duration: 0.5,
    },
  },
};
