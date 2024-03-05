import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [modal, setModal] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const toggleModal = () => setModal(!modal);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toLocaleDateString();
        const createdAt = currentDate;
        const newBlogPost = { ...newPost, createdAt, author: user.username };

        try {
            const response = await axios.post('http://localhost:8080/api/blog/posts', newBlogPost);
            console.log(response.data);
            setPosts([...posts, response.data]);
            toggleModal();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/blog/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Row className="mt-5 mb-4">
                <Col>
                    <h1>Welcome to Blog Posts</h1>
                </Col>
                <Col className="text-end">
                    {user && (
                        <div className="d-flex align-items-center justify-content-end">
                            <FaUser size={24} className="me-2" />
                            <div>
                                <p className="m-0">{user.username}</p>
                            </div>
                            <Button color="link" onClick={handleLogout}>Logout</Button>
                        </div>
                    )}
                </Col>
            </Row>
            <Row className="mt-5 mb-4">
                <Col className="d-flex justify-content-end">
                    <Button color="primary" onClick={toggleModal}>Add New Blog</Button>
                </Col>
            </Row>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add New Blog</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" value={newPost.title} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input type="textarea" name="content" id="content" value={newPost.content} onChange={handleChange} />
                        </FormGroup>
                        <Button color="primary" type="submit">Submit</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Row className="justify-content-center">
                {posts.map(post => (
                    <Col key={post.id} xs="8" className="mb-4">
                        <Card>
                            <CardBody>
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.content.substring(0, 100)}...</p>
                                <p className="card-text"><small className="text-muted">Created at: {post.createdAt}</small></p>
                                <p className="card-text"><small className="text-muted">Author: {post.author}</small></p>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Dashboard;
