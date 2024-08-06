import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import items from '../utils/constants/sidebarItems';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  const handleMenuClick = (e: { key: string }) => {
    navigate(`/${e.key}`);
  };

  return (
    <div className={styles.leftLayout}>
      <header  className={styles.header}>
        School ERP
      </header>
      <Menu
        onClick={handleMenuClick}
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
