export const divVariant = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {ease: "easeIn", type: "spring", duration: 1.5, stiffness: "50"}
    },
    hidden: {
      opacity: 0,
      y: "10vh",
    },
    exit : {
      opacity: 0,
      y: "-10vh",
      transition: {ease: "easeOut"}
    }
  }