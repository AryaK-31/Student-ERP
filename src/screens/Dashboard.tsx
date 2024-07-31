import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const Dashboard: React.FC = () => {
  const appContext = useAppContext();
  const { currentClass } = appContext;

  return <div className="dashboardBase">Dashboard you are on {currentClass}</div>;
};

export default Dashboard;
