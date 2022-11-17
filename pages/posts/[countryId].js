import React from "react";
import Post from "components/Post";
import { Container, Row } from "react-bootstrap";
import styles from 'styles/Home.module.css'
import { motion } from 'framer-motion';
import { divVariant } from "components/divMotion";
import { useRouter } from 'next/router';

const CountryId = ({ posts }) => {
  const router = useRouter();
  
  if(router.isFallback) return <div>Loading...</div>
  return (
    <Container>
      <motion.div variants={divVariant} initial="hidden" animate="visible" exit="exit">
        {posts.data.map((post) => (
          <Row className={styles.post} key={post._id}>
            <Post post={post} />
          </Row>
        ))}
      </motion.div>
    </Container>
  );
};

export const getStaticPaths = async () => {
  const PORT = process.env.PORT;
  const response = await fetch(`${PORT}/api/blog`);
  const { data } = await response.json();
  const paths = data.map((el) => {
    return {
      params: { countryId: `${el.country}` },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const PORT = process.env.PORT;
  const response = await fetch(`${PORT}/api/${params.countryId}`);
  const data = await response.json();
  return {
    props: {
      posts: data,
    },
    revalidate: 10,
  };
};

export default CountryId;
