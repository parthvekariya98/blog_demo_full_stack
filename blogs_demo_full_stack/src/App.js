import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

const App = () => {
  const [posts, setPosts] = useState([{
    id: 1,
    title: 'test',
    content: 'test content',
    createdAt: '22-02-2024'
  },
  {
    id: 2,
    title: 'test',
    content: 'test content',
    createdAt: '22-02-2024'
  }]);

  useEffect(() => {

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