import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import styles from "styles/blog-add.module.css";
import {useRouter} from 'next/router';
import moment from "moment";

export default function UpdatePost({ post }) {
  const router = useRouter();
  const now = moment();
  const [image, setImage] = useState(post.photo || null);
  const [title, setTitle] = useState(post.title || "");
  const [country, setCountry] = useState(post.country || "");
  const [description, setDescription] = useState(post.description || "");
  const [fetchImage, setFetchImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        setFetchImage(file);
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      });
    },
    [image]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accepts: "images/*", multiple: false });

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', fetchImage);
    data.append("upload_preset", "cwemx3sl");

    const response = await fetch("https://api.cloudinary.com/v1_1/grace26/image/upload", {
      method: "POST",
      body: data,
    })
    const result = await response.json();
    return result.secure_url;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {

      const photo = await uploadImage() || image;
      if(!photo) {
        alert("Please enter a photo");
      }
      const response = await fetch(`http://localhost:3000/api/post/${post._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title,
          country,
          description,
          photo,
        })
      })
      await response.json();
      setIsLoading(false);
      setTitle("");
      setCountry("");
      setDescription("");
      router.push('/');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  if(router.isFallback) {
    return <div>Loading...</div>
  }
  
  return (
    <Container>
      <Row>
        {image && (
          <Col className="mb-3" xs={6}>
            <Card>
              <Card.Img variant="top" src={image} alt="" />
            </Card>
          </Col>
        )}
      </Row>
      <Form onSubmit={handleSubmit}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Card className={styles.blogCard}>
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </Card>
        </div>
        <Form.Control className="mb-3" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <Form.Control className="mb-3" placeholder="country" value={country} onChange={(e) => setCountry(e.target.value)}/>
        <textarea
          className="mb-3 form-control"
          rows={10}
          placeholder="Description"
          value={description} onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="d-flex justify-content-end mb-3">
          <Button type="submit" disabled={isLoading}>{isLoading ? "Updating" : "Update"}</Button>
        </div>
      </Form>
    </Container>
  );
}

export const getStaticPaths = async () => {
  const response = await fetch("http://localhost:3000/api/blog");
  const {data} = await response.json();
  const paths = data.map((el) => {
    return {
      params: {
        updateId: `${el._id}`
      }
    }
  });

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const response = await fetch(`http://localhost:3000/api/post/${params.updateId}`);
  const data = await response.json();
  if(!data._id) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post: data
    },
    revalidate: 10,
  }
}
