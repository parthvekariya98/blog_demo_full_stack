import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import axios from 'axios';
import { FaUser, FaCalendarAlt, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

const BlogDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/blog/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPost();
    }, [id]);

    return (
        <Container>
            <Row className="mt-5 mb-4">
                <Col>
                    <h1>Blog Post Details</h1>
                </Col>
            </Row>
            {post && (
                <Row className="justify-content-center">
                    <Col xs="8">
                        <Card>
                            <CardBody>
                                <div className="d-flex align-items-center mb-3">
                                    <FaUser size={24} className="me-2" />
                                    <p className="m-0">{post.author}</p>
                                </div>
                                <div className="social-icons mb-3">
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}><FaTwitter /></a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}><FaLinkedin /></a>
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                                </div>
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.content}</p>
                                <p className="card-text"><FaCalendarAlt className="me-2" />Created at: {post.createdAt}</p>
                                <Link to="/dashboard">
                                    <Button color="primary">Back to Dashboard</Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default BlogDetails;
