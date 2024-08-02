import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const Dashboard: React.FC = () => {
  const appContext = useAppContext();
  const { classes } = appContext;

  const currentClass = classes.length > 0 ? classes[0].class : '';

  return <div className="dashboardBase">Dashboard: You are on class {currentClass}</div>;
};

export default Dashboard;
