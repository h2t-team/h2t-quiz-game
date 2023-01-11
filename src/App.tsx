import React, { useContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './asset/scss/common.scss';
import route from './routes';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { Toast } from 'components/Common';
import { StoreContext } from 'store';
import { GroupByUser } from 'models';
import { axiosWithToken } from 'utils';
import { toast } from 'react-toastify';

const queryClient = new QueryClient();

function App() {
  const {
    globalState: { socket },
  } = useContext(StoreContext);

  const groupData = useQuery({
    queryKey: ['groupList'],
    queryFn: async (): Promise<GroupByUser[]> => {
      const res = await axiosWithToken.get('/groups');
      return res.data.groups;
    },
  });

  useEffect(() => {
    groupData.data?.forEach((item) => {
      socket.emit('join room', item.group.id);
    });

    socket.on('notify present', ({ inviteCode, presentName, groupName }) => {
      toast.info(
        <a href={`/join-game/?code=${inviteCode}`}>
          &quot;{presentName}&quot; is presentating in {groupName}
        </a>
      );
    });

    return () => {
      socket.off('notify present');
    };
  }, [groupData.data]);

  const router = createBrowserRouter(route);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toast />
      </QueryClientProvider>
    </div>
  );
}

export default App;
