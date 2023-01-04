import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Post from "components/Post";
import Hero from "components/Hero";
import HeroCategories from "components/HeroCategories";
import axios from "axios";

export default function Home({ posts }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    setIsLoading(true);
    const PORT = process.env.NEXT_PUBLIC_PORT || "http://localhost:3000";
    const response = await fetch(`${PORT}/api/post/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    setIsLoading(false);
    return data;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <meta name="description" content="travel blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className={styles.hero}>
          <Hero />
        </div>
        <Container>
          <div className={styles.category}>
            <HeroCategories />
          </div>
          <div className={styles.explore}>
            <h3 className="text-center mb-5">Explore Cities</h3>
            <div>
              {
                posts.data.map((post) => (
                  <Row className={styles.post} key={post._id}>
                    <Post post={post} handleDelete={handleDelete} isLoading={isLoading}/>
                  </Row>
                ))
              }
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const PORT = process.env.NEXT_PUBLIC_PORT || "http://localhost:3000";
  const { data: posts } = await axios.get(`${PORT}/api/blog`);
  return {
    props: {
      posts: posts
    },
    revalidate: 10,
  }
}
