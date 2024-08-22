import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import styles from './AppLayout.module.scss';


const AppLayout: React.FC = () => (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.rightLayout}>
        <div className={styles.topbar}><Topbar /></div>
        <div className={styles.outlet}><Outlet /></div>
      </div>
    </div>
  );

export default AppLayout;
