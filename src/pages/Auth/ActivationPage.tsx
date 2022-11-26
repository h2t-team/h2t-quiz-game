import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Activation.module.scss';

const ActivationPage = () => {
  const { state: state } = useLocation();
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (state == null) {
      navigate('/');
    } else {
      setType(state.type);
      setEmail(state.email);
    }
  }, [state]);

  const handleAnchorClick = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className={styles.activationPage}>
      <div className={styles.activation}>
        <FaCheckCircle className="mb-5" color="green" size="60px" />
        <p className="mb-2">
          A<span id="type"> {type} </span>
          email has been sent to
          <span className="fw-bold" id="email">
            {' '}
            {email}{' '}
          </span>
          <br />
          (expire after 20 minutes).
        </p>
        <p>
          <>
            Do not receive the verification email? Click on{' '}
            <a
              onClick={handleAnchorClick}
              href="/"
              className="fw-bold text-decoration-underline"
              id="resend"
            >
              Resend
            </a>
          </>
        </p>
      </div>
    </div>
  );
};

export default ActivationPage;
