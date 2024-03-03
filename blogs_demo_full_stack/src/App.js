import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/blog/posts');
        console.log(response)
        setPosts(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBlogsData();
  }, []);

  return (
    <Container>
      <h1 className="mt-5 mb-4">Blog Posts</h1>
      <Row>
        {posts.map(post => (
          <Col key={post.id} sm="6" md="4" lg="3" className="mb-4">
            <Card>
              <CardBody>
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content.substring(0, 100)}...</p>
                <p className="card-text"><small className="text-muted">Created at: {post.createdAt}</small></p>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
