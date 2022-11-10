import React from "react";
import { Container, Button } from "react-bootstrap";
import { motion } from 'framer-motion';

const Hero = () => {
  const pVariant = {
    visible: {
      scale: 1,
      transition: {ease: "easeIn", type: "spring", duration: 2}
    },
    hidden: {
      scale: 0,
    },
    exit : {
      scale: 0,
      transition: {ease: "easeOut"}
    }
  }
  return (
    <Container>
      <motion.div variants={pVariant} initial="hidden" animate="visible" exit="exit">
        <h2 className="text-uppercase text-white">find yourself outside</h2>
        <p className="text-white-50">Don't let the loud of noise scare you.</p>
        <p className="text-white-50">Let the rhythms of the dance amuse you.</p>
        <p className="text-white-50">You are given a very rare chance.</p>
        <p className="text-white-50">Feel the moment of the nature.</p>
        <Button variant="warning">Explore</Button>
      </motion.div>
    </Container>
  );
};

export default Hero;
