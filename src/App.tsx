import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </>
  ),
);

const App = () => (
  <div>
    <RouterProvider router={router}/>
  </div>
);

export default App;
