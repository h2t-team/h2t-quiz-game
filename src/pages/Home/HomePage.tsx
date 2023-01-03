import React, { useEffect } from 'react';
import { AppLayout } from 'components/Layouts';
import { StoreContext, actions } from 'store';

const HomePage = () => {
  //Sample use global store
  const { globalState, dispatch } = React.useContext(StoreContext);
  // eslint-disable-next-line no-console
  console.log(globalState);
  useEffect(() => {
    dispatch(actions.setTestVal('abc'));
  }, []);
  return <AppLayout>Home</AppLayout>;
};

export default HomePage;
