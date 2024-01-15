import React from 'react';
import { Form } from 'react-bootstrap';

export const CustomInput = ({ label, forwardRef, ...rest }) => {
  return (
    <div>
      <Form.Group className='mb-3'>
        {label && <Form.Label>{label}</Form.Label>}

        <Form.Control ref={forwardRef} {...rest} />
      </Form.Group>
    </div>
  );
};

export default CustomInput;
