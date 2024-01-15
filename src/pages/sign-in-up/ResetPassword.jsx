import React, { useRef, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import CustomInput from '../../components/custom-input/CustomInput';
import { requestOTP } from '../../helpers/axiosHelper';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const emailRef = useRef('');

  const [showOtp, setShowOtp] = useState(true);
  const [response, setResponse] = useState({});

  const handleOnOtpRequest = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    if (!email) {
      return toast.error('Email is required');
    }
    const pending = requestOTP(email);
    toast.promise(pending, {
      pending: 'Please wait',
    });

    const resp = await pending;
    setResponse(resp);

    resp.status === 'success' && setShowOtp(false);
  };
  const inputsOtp = [
    {
      label: 'Email',
      name: 'email',
      placeholder: 'sujan9@gmail.com',
      type: 'email',
      required: true,
      forwardRef: emailRef,
    },
  ];
  const inputsResetPassword = [
    {
      label: 'OTP',
      name: 'otp',
      placeholder: '345566',
      required: true,
    },

    {
      label: 'Password',
      name: 'password',
      placeholder: '********',
      type: 'password',
      required: true,
    },

    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      placeholder: '********',
      type: 'password',
      required: true,
    },
  ];
  return (
    <div>
      <div className='text-center'>Tech Gare Admin cms</div>
      <hr />

      {response.message && (
        <Alert variant={response.status === 'success' ? 'success' : 'danger'}>
          {response.message}
        </Alert>
      )}

      {showOtp ? (
        <Form
          onSubmit={handleOnOtpRequest}
          className='w-50 m-auto border rounded shadow-lg p-3 mt-5'
          style={{ width: '500px' }}
        >
          <div className=''>Requset OTP to reset password</div>
          <hr />
          {inputsOtp.map((item, i) => (
            <CustomInput key={i} {...item} />
          ))}

          <div className='d-grid'>
            <Button type='submit'>Request OTP</Button>
          </div>

          <div className='mt-4 text-end'>
            Ready to Sign In? <a href='/'>Sign In</a> Now.
          </div>
        </Form>
      ) : (
        <Form
          // onSubmit={handleOnSubmit}
          className='w-50 m-auto border rounded shadow-lg p-3 mt-5'
          style={{ width: '500px' }}
        >
          <div className=''>Update your password</div>
          <hr />
          {inputsResetPassword.map((item, i) => (
            <CustomInput key={i} {...item} />
          ))}

          <div className='d-grid'>
            <Button type='submit'>Update Password</Button>
          </div>

          <div className='mt-4 text-end'>
            Ready to Sign In? <a href='/'>Sign In</a> Now.
          </div>
        </Form>
      )}
    </div>
  );
};

export default ResetPassword;
