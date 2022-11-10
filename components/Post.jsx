import React from "react";
import { Col, Button, Spinner } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaEdit, FaTrash } from "react-icons/fa";

const Post = ({ post, handleDelete, isLoading }) => {
  const router = useRouter();
  return (
    <>
      <Col>
        <Image
          src={post.photo}
          alt=""
          width={1000}
          height={350}
          style={{ objectFit: "cover" }}
          className="w-100 rounded-1"
        />
      </Col>
      <Col>
        <div className="d-flex justify-content-between">
          <h5>{post.title}</h5>
          <div>
            <Button
              variant="outline-warning"
              onClick={() => router.push(`/posts/updatePost/${post._id}`)}
            >
              <FaEdit />
            </Button>
            <Button
              variant="outline-danger"
              className="ms-3"
              onClick={() => handleDelete(post._id)}
            >
              {isLoading ? <Spinner variant="danger" /> : <FaTrash />}
            </Button>
          </div>
        </div>
        <p>{post.description}</p>
      </Col>
    </>
  );
};

export default Post;
