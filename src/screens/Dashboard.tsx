import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import styles from './Dashboard.module.scss'

const Dashboard: React.FC = () => {
  const { currentClass } = useAppContext();

  return <div className={styles.dashboardBase}> No Data</div>;
};

export default Dashboard;
