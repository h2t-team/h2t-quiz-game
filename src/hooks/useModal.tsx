import { useState } from 'react'

function useModal() {
  const [isShowModal, setIsShowModal] = useState(false);

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return {
    openModal,
    closeModal,
    isShowModal,
  }
}

export default useModal;