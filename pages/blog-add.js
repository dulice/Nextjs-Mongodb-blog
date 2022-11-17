import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import styles from "styles/blog-add.module.css";
import { useRouter } from "next/router";
import moment from "moment";
import { motion } from "framer-motion";
import { divVariant } from "components/divMotion";

export default function CreatePost() {
  const router = useRouter();
  const now = moment();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "images/*",
    multiple: false,
  });

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", fetchImage);
    data.append("upload_preset", "cwemx3sl");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/grace26/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const result = await response.json();
    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const photo = await uploadImage();
      if (!photo) {
        alert("Please enter a photo");
      }
      const PORT = process.env.PORT;
      const response = await fetch(`${PORT}/api/blog`, {
        method: "POST",
        body: JSON.stringify({
          email: "user@example.com",
          title,
          country,
          description,
          photo,
          createdAt: now.format(),
        }),
      });
      await response.json();
      setIsLoading(false);
      setTitle("");
      setCountry("");
      setDescription("");
      router.push("/");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <motion.div
        variants={divVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
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
          <Form.Control
            className="mb-3"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Control
            className="mb-3"
            placeholder="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <textarea
            className="mb-3 form-control"
            rows={10}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="d-flex justify-content-end mb-3">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Uploading" : "Add"}
            </Button>
          </div>
        </Form>
      </motion.div>
    </Container>
  );
}
