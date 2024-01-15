import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../components/custom-input/CustomInput';
import { toast } from 'react-toastify';
import { postNewAdmin } from '../../helpers/axiosHelper';

const initialState = {
  fName: '',
  lName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [passwordValidationError, setPasswordValidationError] = useState('');

  const handleOnChange = (e) => {
    // password rule  //regex
    // 1. Must be longer than 6 chars
    // 2. must include uppercase
    // 2. must include lowercase
    // 2. must include numbers

    const { name, value } = e.target;
    setPasswordValidationError('');
    if (name === 'password') {
      value.length < 6 &&
        setPasswordValidationError('Must be longer than 6 chars ');

      !/[A-Z]/.test(value) &&
        setPasswordValidationError('Must include uppercase');

      !/[a-z]/.test(value) &&
        setPasswordValidationError('Must include lowercase');

      !/[0-9]/.test(value) &&
        setPasswordValidationError('Must include numbers');
    }
    if (name === 'confirmPassword') {
      form.password !== value &&
        setPasswordValidationError('Password do not match');
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      toast.error('Password do not match');
      return;
    }
    const userPending = postNewAdmin(rest);
    toast.promise(userPending, {
      pending: 'Please wait...',
      // success:
      //   'We have sent you an email with instructions to verify your email. Please check your inbox',
      // error: 'Error! Unable to process your request, please contact admin',
    });
    const { status, message } = await userPending;
    toast[status](message);
  };

  const inputs = [
    {
      label: 'First Name',
      name: 'fName',
      placeholder: 'Sujan',
      type: 'text',
      required: true,
    },
    {
      label: 'Last Name',
      name: 'lName',
      placeholder: 'Mahat',
      type: 'text',
      required: true,
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'sujan9@gmail.com',
      type: 'email',
      required: true,
    },
    {
      label: 'Phone',
      name: 'phone',
      placeholder: '444444444',
      type: 'number',
    },
    {
      label: 'Address',
      name: 'address',
      placeholder: '15 Burleigh Street',
      type: 'address',
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

      <Form
        onSubmit={handleOnSubmit}
        className='w-50 m-auto border rounded shadow-lg p-3 mt-5'
        style={{ width: '500px' }}
      >
        <h3>Admin Signup Only</h3>
        <hr />
        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}
        <div className=''>
          {passwordValidationError && (
            <div className='text-danger fw-bold p-3'>
              {passwordValidationError}
            </div>
          )}
        </div>

        <div className='d-grid'>
          <Button type='submit' disabled={passwordValidationError}>
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
