import React, { useState } from 'react';
import {useForgotPasswordMutation} from "../../services/auth";
import '../../styles/components/login.scss';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { FloatingLabel, Form as BSForm } from 'react-bootstrap';
import LoadingButton from "../../components/buttons/loadingbuttuon";
import {useNavigate} from "react-router-dom";

interface ForgotPasswordFormValues {
    email: string;
}

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [callback, setCallback] = useState(() => () => {});
    const [sendEmail, { data, isError }] = useForgotPasswordMutation();
    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email format').required('Email is required')
    });

    const handleSubmit = async (values: ForgotPasswordFormValues, callback: () => void) => {
        try {
            await sendEmail({ email: values.email }).unwrap();
        } catch (error) {
            console.error("Error sending forgot password email:", error);
        } finally {
            callback();
        }
    };
    

    return (
        <>
    {data && <h2 className='text-white'>{data.message}</h2>}
    {!data && (
        <>
            <h2 className='mb-2'>Forgot Password</h2>
            <p className='text-white'>Enter your email address to reset your password</p>
            <Formik
                initialValues={{ email: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
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
                        <FloatingLabel controlId="email" label="E-mail" className="mb-3">
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
                        {isError && <p className='text-danger'>User with this email address does not exist</p>}
                        <div className="links">
                            <a onClick={()=> navigate("/login")}>Login</a>
                            <a onClick={()=> navigate("/register")}>Register</a>
                        </div>
                        <LoadingButton variant="primary" type="submit" size="lg" text="Reset password" onClickCallback={(submitCallback) => {
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
    )}
</>
    );
};

export default ForgotPassword;
