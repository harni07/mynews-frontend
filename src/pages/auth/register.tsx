import '../../App.css';
import React, {useState} from 'react';
import {useRegisterMutation} from "../../services/auth";
import * as yup from 'yup';
import LoadingButton from "../../components/buttons/loadingbuttuon";
import { FloatingLabel, Form as BSForm } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import {useNavigate} from "react-router-dom";

interface RegisterFormValues {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}


const Register = () => {
    const navigate = useNavigate();
    const [callback, setCallback] = useState(() => () => {});
    const [errorMsg, setErrorMsg] = useState(null);
    let [registerUser, { data: response }] = useRegisterMutation();

    const validationSchema = yup.object().shape({
        first_name: yup.string().required('First name is required'),
        last_name: yup.string().required('Last name is required'),
        email: yup.string().email('Please enter a valid email').required('Email is required'),
        password: yup.string().required('Password is required')
    });

    const handleSubmit = async (values: RegisterFormValues, callback: () => void) => {
        try {
            const response: any = await registerUser(values);
            if (response.error && response.error.status === 400) {
                setErrorMsg(response.error.data.message || "An error occurred.");
            }
        } catch (error: any) {
            setErrorMsg(error.message || "An unexpected error occurred.");
        }
        callback();
    };

    return (
        <>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values: RegisterFormValues) => {
                    handleSubmit(values, callback);
                }}
            >
                {({
                      handleSubmit,
                      handleChange,
                      values,
                      touched,
                      errors,
                      validateForm
                  }) => (
                    <Form>
                        <h2>Register</h2>

                        <FloatingLabel controlId="first_name" label="First Name" className="mb-3">
                            <BSForm.Control
                                type="text"
                                value={values.first_name}
                                onChange={handleChange('first_name')}
                                isInvalid={touched.first_name && !!errors.first_name}
                            />
                            <BSForm.Control.Feedback type="invalid">
                                {errors.first_name}
                            </BSForm.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="last_name" label="Last Name" className="mb-3">
                            <BSForm.Control
                                type="text"
                                value={values.last_name}
                                onChange={handleChange('last_name')}
                                isInvalid={touched.last_name && !!errors.last_name}
                            />
                            <BSForm.Control.Feedback type="invalid">
                                {errors.last_name}
                            </BSForm.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="email" label="Email" className="mb-3">
                            <BSForm.Control
                                type="email"
                                value={values.email}
                                onChange={handleChange('email')}
                                isInvalid={touched.email && !!errors.email}
                            />
                            <BSForm.Control.Feedback type="invalid">
                                {errors.email}
                            </BSForm.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="Password" className="mb-3">
                            <BSForm.Control
                                type="password"
                                value={values.password}
                                onChange={handleChange('password')}
                                isInvalid={touched.password && !!errors.password}
                            />
                            <BSForm.Control.Feedback type="invalid">
                                {errors.password}
                            </BSForm.Control.Feedback>
                        </FloatingLabel>

                        {errorMsg && <p className='text-danger mt-3'>{errorMsg}</p>}
                        {response && <p className='text-white mt-3'>{response.message}</p>}

                        <div className="links">
                            <a onClick={()=> navigate("/login")}>Login</a>
                        </div>
                        <LoadingButton variant="primary" type="submit" size="lg" text="Register" onClickCallback={(submitCallback) => {
                            validateForm().then((v: any) => {
                                for (let value in values) {
                                    if (v[value] !== undefined) {
                                        submitCallback();
                                        return;
                                    }
                                }
                                setCallback(() => submitCallback);
                                handleSubmit();
                            });
                        }}/>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Register;
