import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const Dashboard: React.FC = () => {
  const { currentClass } = useAppContext()[0];

  return <div className="dashboardBase">Dashboard you are on {currentClass}</div>;
};

export default Dashboard;
