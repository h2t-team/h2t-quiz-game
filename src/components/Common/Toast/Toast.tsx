import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar
      closeOnClick={false}
      pauseOnHover={false}
      theme="light"
    />
  );
};

export default Toast;
