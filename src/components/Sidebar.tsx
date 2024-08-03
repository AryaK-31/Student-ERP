import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import items from '../utils/constants/sidebarItems';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [location.pathname, navigate]);

  return (
    <div className={styles.leftLayout}>
      <header className={styles.header}>
        School ERP
      </header>
      <Menu
        onClick={({ key }) => { navigate(key); }}
        className={styles.menu}
        selectable
        defaultSelectedKeys={['dashboard']}
        mode="vertical"
        items={items}
      />
    </div>
  );
};

export default Sidebar;
