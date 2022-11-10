import React from 'react'
import { Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <Container>
        <Nav className="py-3 justify-content-between">
            <Link href='/' className="text-decoration-none">
                <h6 className="text-warning font-monospace">Dulice Blog</h6>
            </Link>
            <Nav.Item>
                <Link href='/blog-add' className="btn btn-outline-secondary">Create Post</Link>
            </Nav.Item>
        </Nav>
    </Container>
  )
}

export default Header