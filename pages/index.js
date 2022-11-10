import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import useSWR from 'swr'
import { useState } from "react";
import Post from "components/Post";
import Hero from "components/Hero";
import HeroCategories from "components/HeroCategories";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR('posts', fetchPosts);
  if(error) {
    return {
      notFound: true
    }
  }

  const handleDelete = async (id) => {
    setIsLoading(true);
    const response = await fetch(`http://localhost:3000/api/post/${id}`, {
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
              {!data ? <div>Loading... </div> : (
                data.map((post) => (
                  <Row className={styles.post} key={post._id}>
                    <Post post={post} handleDelete={handleDelete} isLoading={isLoading}/>
                  </Row>
                ))
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/api/blog");
  const {data} = await response.json();
  return data;
};
