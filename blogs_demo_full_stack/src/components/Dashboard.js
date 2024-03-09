import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { FaUser, FaChartBar, FaInfoCircle, FaEnvelope } from 'react-icons/fa'; // Importing icons
import { useNavigate, Link, useParams } from 'react-router-dom';

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
        <Container fluid>
            <Row>
                <Col md={2} className="bg-light text-dark py-4">
                    <Col>
                        <h2>Welcome to Blog Posts</h2>
                    </Col>
                    <ul className="list-unstyled mb-5">
                        <li>
                            <Link to="/dashboard" className="text-dark">
                                <FaChartBar className="me-2" />Dashboard {/* Added icon */}
                            </Link>
                        </li>
                        <li>
                            <Link to="/blogdetails" className="text-dark">
                                <FaInfoCircle className="me-2" />Blog Details {/* Added icon */}
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-dark">
                                <FaInfoCircle className="me-2" />About {/* Added icon */}
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-dark">
                                <FaEnvelope className="me-2" />Contact {/* Added icon */}
                            </Link>
                        </li>
                    </ul>

                    <p className="mb-4 text-muted small">BlogPost Community a constructive and inclusive social network for software developers. With you every step of your journey.</p>
                    <p className="mb-4 text-muted small">Built on Forem — the open source software that powers BlogPost and other inclusive communities.</p>
                    <p className="mb-0 text-muted small">Made with love in React and Java. BlogPost Community © 2024</p>
                </Col>
                <Col md={10} className="bg-light">
                    <Container className="pt-4">
                        <Row className="mb-4">
                            <Col className="text-end">
                                <Button color="primary" onClick={toggleModal}>Add New Blog</Button>
                            </Col>
                        </Row>
                        {posts.map(post => (
                            <Row key={post.id} className="mb-4">
                                <Col md={{ size: 8, offset: 2 }}>
                                    <Link to={`/blogdetails/${post.id}`} className="text-decoration-none text-dark">
                                        <Card className="h-100">
                                            <CardBody className="d-flex flex-column">
                                                <div className="d-flex align-items-center mb-3">
                                                    <FaUser size={24} className="me-2" />
                                                    <p className="m-0">{post.author}</p>
                                                </div>
                                                <h5 className="card-title">{post.title}</h5>
                                                <p className="card-text">{post.content.substring(0, 100)}...</p>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </Col>
                            </Row>
                        ))}
                    </Container>

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
        </Container>
    );
};

export default Dashboard;
