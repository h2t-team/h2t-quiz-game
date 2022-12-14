import { useLocation } from 'react-router-dom';

function useRoute() {
  const { pathname } = useLocation();

  const isEditPresentation = () => {
    const pathnameSplit = pathname.split('/');
    return (
      pathnameSplit.includes('presentations') &&
      (pathnameSplit.includes('edit') ||
        pathnameSplit[pathnameSplit.length - 1] !== 'presentations')
    );
  };

  return {
    isEditPresentation,
  };
}

export default useRoute;
