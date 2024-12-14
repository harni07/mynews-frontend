import React from 'react';
import  { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import '../../styles/components/login.scss';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { FloatingLabel, Form as BSForm } from 'react-bootstrap';
import {useResetPasswordMutation} from "../../services/auth";
import LoadingButton from "../../components/buttons/loadingbuttuon";

interface FormValues {
    password: string;
    repeatPassword: string;
}


const ResetPassword = () => {
    const navigate = useNavigate();
    const [callback, setCallback] = useState(() => () => {});
    const [errorMsg, setErrorMsg] = useState(null);
    const [resetPassword, { data, error }] = useResetPasswordMutation();
    const { token } = useParams();
    const validationSchema = yup.object().shape({
        password: yup.string().required('Password is required'),
        repeatPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Repeat password is required')
    });

    const handleSubmit = async (values: FormValues, callback: () => void) => {
        const body = {
            newPassword: values.password,
            token: token
        };
        try {
            const response = await resetPassword(body).unwrap();
            if (response.error) {
                setErrorMsg(response.error.message);
            }
        } catch (error) {
            console.error(error, 'Error during password reset');
        }
        callback();
    };
    

    return (
        <>
            {data && (
                <>
                    <h3 className='text-white'>{data.message}</h3>
                    <div className="links">
                        <a onClick={()=> navigate("/login")}>Login</a>
                    </div>
                </>
            )}
            {!data && (
                <>
                    <h2 className='mb-2'>Reset your password</h2>
                    <Formik
                        initialValues={{ password: '', repeatPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values: FormValues) => {
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
                                <FloatingLabel controlId="password" label="New Password" className="mb-3">
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
                                <FloatingLabel controlId="repeatPassword" label="Repeat Password" className="mb-3">
                                    <BSForm.Control
                                        type="password"
                                        value={values.repeatPassword}
                                        onChange={handleChange('repeatPassword')}
                                        isInvalid={touched.repeatPassword && !!errors.repeatPassword}
                                    />
                                    <BSForm.Control.Feedback type="invalid">
                                        {errors.repeatPassword}
                                    </BSForm.Control.Feedback>
                                </FloatingLabel>
                                {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                                <div className="links">
                                    <a href='/login'>Login</a>
                                </div>
                                <LoadingButton variant="primary" type="submit" size="lg" text="Reset Password" onClickCallback={(submitCallback) => {
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

export default ResetPassword;
