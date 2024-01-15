import { useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { postVerifyEmail } from '../../helpers/axiosHelper';

//show spinner

//grab query strings from url

//call server with e and c

//remove spinner and show message from server

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();

  const [showSpinner, setShowSpinner] = useState(true);
  const [resp, setResp] = useState({});
  const associate = searchParams.get('e');
  const token = searchParams.get('c');

  useEffect(() => {
    userEmailVerification();

    //call axios helper to call api
  }, []);

  const userEmailVerification = async () => {
    const response = await postVerifyEmail({ associate, token });
    setShowSpinner(false);
    setResp(response);
  };
  return (
    <div>
      <div className='text-center'>Tech Gare Admin cms</div>
      <hr />

      <div className='text-center mt-5'>
        {showSpinner && <Spinner variant='primary' animation='border' />}
      </div>
      {resp.message && (
        <Alert
          className='w-50 m-auto'
          variant={resp.status === 'success' ? 'success' : 'danger'}
        >
          {resp.message}
        </Alert>
      )}
      {resp.status === 'success' && <a href='/'>Login Now</a>}
    </div>
  );
};

export default VerifyEmail;
