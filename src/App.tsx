import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import AppLayout from './layout/AppLayout';
import Students from './screens/Students';
import Subjects from './screens/Subjects';
import AppContextProvider from './contexts/AppContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    element: <AppLayout />,
    
    /** These elements will replace the Outlet */
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/students',
        element: <Students />,
      },
      {
        path: '/subjects',
        element: <Subjects />,
      },
    ],
  },
]);

const App = () => (
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);

export default App;
