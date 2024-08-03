import { BrowserRouter as Router, Routes, createBrowserRouter, Route } from 'react-router-dom';
import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import AppLayout from './layout/AppLayout';
import Students from './screens/Students';
import Subjects from './screens/Subjects';
import AppContextProvider from './contexts/AppContext';


const App = () => (
  <AppContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route  path='/' element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="subjects" element={<Subjects />} />
        </Route>
      </Routes>
    </Router>
  </AppContextProvider>
);

export default App;
