import React from 'react';
import {useEffect, useState} from 'react';
import {useLoginMutation} from "../../services/auth";
import {useNavigate} from "react-router-dom";
import '../../styles/components/login.scss';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { FloatingLabel, Form as BSForm } from 'react-bootstrap';
import LoadingButton from "../../components/buttons/loadingbuttuon";
import {setUser} from "../../store/slices/user";
import {useDispatch} from "react-redux";

interface LoginFormValues {
    email: string;
    password: string;
}

const Login = () => {
    const [callback, setCallback] = useState(() => () => {});
    const navigate = useNavigate();
    const [loginUser, { data }] = useLoginMutation();
    const [errorMsg, setErrorMsg] = useState([]);
    const dispatch = useDispatch();

    const validationSchema = yup.object().shape({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required')
    });

    const handleSubmit = async (values: LoginFormValues, callback: () => void) => {
        try {
            const response = await loginUser({ email: values.email, password: values.password }).unwrap();
            dispatch(setUser(response));
            navigate("/home");
        } catch (error: any) {
            setErrorMsg(error.data.message);
        }
        callback();
    };
    

    useEffect(() => {
        const registerState = localStorage.getItem('token');
        const tokenData = registerState ? JSON.parse(registerState) : null;
    
        if (tokenData?.access_token) {
            navigate("/home");
        }
    
        if (data?.access_token) {
            localStorage.setItem('token', JSON.stringify(data));
            dispatch(setUser(data));
            navigate("/home");
        }
    }, [navigate, data, dispatch]);
    

    return (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values: LoginFormValues) => {
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
                        <h2 className='mb-3'>Prijava</h2>

                        <FloatingLabel controlId="email" label="Email" className="mb-3">
                            <BSForm.Control
                                type="text"
                                value={values.email}
                                onChange={handleChange('email')}
                                isInvalid={touched.email && !!errors.email}
                            />
                            <BSForm.Control.Feedback type="invalid">
                                {errors.email}
                            </BSForm.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="Lozinka" className="mb-3">
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

                        {data && <p className='text-danger mt-3'>{data.message}</p>}
                        {errorMsg && <p className='text-danger mt-3'>{errorMsg}</p>}

                        <div className="links">

                            <a className='cursor-pointer' onClick={()=> navigate("/forgot-password")}>Zaboravljena lozinka?</a>
                            <a onClick={()=> navigate("/register")}>Registracija</a>
                        </div>
                        <LoadingButton variant="primary" type="submit" size="lg" text="Prijavi se" onClickCallback={(submitCallback) => {
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

export default Login;
