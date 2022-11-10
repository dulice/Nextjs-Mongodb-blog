import React from "react";
import { Row, Col, Card } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from "data/category";
import { motion, AnimatePresence } from 'framer-motion';

const HeroCategories = () => {
    const pVariant = {
        visible: {
          opacity: 1,
          y: 0,
          transition: {ease: "easeIn", type: "spring", duration: 2, delay: 0.5}
        },
        hidden: {
          opacity: 0,
          y: "-10vh",
        },
        exit : {
          opacity: 0,
          y: "10vh",
          transition: {ease: "easeOut"}
        }
      }
  return (
    <Row>
      {categories.map((cat) => (
        <Col key={cat.id} xs={3}>
            <AnimatePresence>

            <motion.div variants={pVariant}
              initial="hidden"
              animate="visible"
              exit="exit">

                <Card>
                    <>
                    <Link href={`posts/${cat.url}`}>
                        <Image
                        src={cat.image}
                        alt=""
                        style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                        }}
                        />
                        <p className="text-center">{cat.name}</p>
                    </Link>
                    </>
                </Card>
            </motion.div>
            </AnimatePresence>
        </Col>
      ))}
    </Row>
  );
};

export default HeroCategories;
