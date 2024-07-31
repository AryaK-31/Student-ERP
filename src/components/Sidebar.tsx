import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import items from '../utils/constants/sidebarItems';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e: { key: string }) => {
    navigate(`/${e.key}`);
  };

  const handleHeaderClick = () => {
    navigate('/');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      navigate('/');
    }
  };

  return (
    <div className={styles.leftLayout}>
      <header
        onClick={handleHeaderClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className={styles.header}
      >
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
