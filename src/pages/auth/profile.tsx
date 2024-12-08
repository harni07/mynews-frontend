import React, {useEffect, useState} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Layout from "../../components/layout/layout";
import {useUpdateAccountMutation} from "../../services/auth";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../store/slices/user";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const [updateUser, { data }] = useUpdateAccountMutation();
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);


    //read data from user store
    useEffect(() => {
        if (user.access_token) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
        }
    }, [user]);

    //update user details in local storage
    useEffect(() => {
        if (data) {
            const localStorageData: any = localStorage.getItem('token');
            const saveData = JSON.parse(localStorageData);
            saveData.first_name = data.first_name;
            saveData.last_name = data.last_name;
            localStorage.setItem('token', JSON.stringify(saveData));
        }
    }, [data]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await updateUser({ id: user.id, first_name: firstName, last_name: lastName });
        const userData = {
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            email: user.email,
            access_token: user.access_token,
        }
        dispatch(setUser(userData));
    };

    return (
        <Layout>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <h2 className="text-center mb-4">Profile</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFirstName">
                                <Form.Label className='text-white'>First Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formLastName" className="mt-3">
                                <Form.Label className='text-white'>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-4">
                                Save Changes
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Profile;
