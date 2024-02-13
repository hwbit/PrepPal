import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Button, Col, Row } from 'react-bootstrap';

const logo = require('../assets/logo.png')

function Profile() {

    return (
        <div className='py-3'>
            <Row className='p-3 d-flex'>
                <div className="w-100" style={{ maxWidth: '2000px' }}>
                    <Card className="p-4 d-flex" style={{ backgroundColor: "#F2E8DC" }}>
                    <Col className='d-flex justify-content-end'>
                        <Button className='d-flex' variant="primary" type="submit" title="Edit" size="sm" style={{ maxWidth: '40px', backgroundColor: "#401E01" }}>Edit</Button>
                    </Col>
                        <Card.Header className='d-flex align-items-center'>
                            <Col className='d-flex justify-content-start align-items-center'>
                                <Image src={logo} alt="Logo" rounded style={{ maxWidth: '200px' }} />
                                <Card.Title className='p-2'>Username</Card.Title>
                            </Col>
                            <Col className='d-flex justify-content-end'>
                                <Card.Subtitle>Following: 100</Card.Subtitle>
                            </Col>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Bio</Card.Title>
                            <Card.Subtitle>I like turtles.</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
            <Row className='px-3'>
                <div className="w-100" style={{ maxWidth: '2000px' }}>
                    <Card className="p-4" style={{ backgroundColor: "#F2E8DC" }}>
                        <Card.Header>
                            <Card.Title>Content</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>Details here</Card.Text>
                        </Card.Body>
                        <Card.Header>
                            <Card.Title>Following</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>Details here</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </div>
    );
};

export default Profile;
