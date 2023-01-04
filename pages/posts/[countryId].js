import React from "react";
import Post from "components/Post";
import { Container, Row } from "react-bootstrap";
import styles from 'styles/Home.module.css'
import { motion } from 'framer-motion';
import { divVariant } from "components/divMotion";
import { useRouter } from 'next/router';
import axios from "axios";

const PORT = process.env.NEXT_PUBLIC_PORT || "http://localhost:3000";

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
  const { data: posts } = await axios.get(`${PORT}/api/blog`);
  const paths = posts.data.map((el) => {
    return {
      params: { countryId: `${el.country}` },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { data } = await axios.get(`${PORT}/api/${params.countryId}`);
  return {
    props: {
      posts: data,
    },
    revalidate: 10,
  };
};

export default CountryId;