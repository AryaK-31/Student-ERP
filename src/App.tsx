import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';

const router = createBrowserRouter(
  [
    {
      path : '/',
      element : <Home />
    },
    {
      path : '/dashboard',
      element : <Dashboard />
    }
  ]
);

const App = () => (
    <RouterProvider router={router}/>
);

export default App;
