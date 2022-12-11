import { useLocation } from 'react-router-dom';

function useRoute() {
  const { pathname } = useLocation();

  const isEditPresentation = () => pathname.includes('presentations') && pathname.includes('edit');


  return {
    isEditPresentation,
  };
}

export default useRoute;
