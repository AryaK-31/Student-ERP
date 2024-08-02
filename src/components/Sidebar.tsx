import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import items from '../utils/constants/sidebarItems';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.leftLayout}>
      <header className={styles.header} >
        School ERP
      </header>
      <Menu
        onClick={(e: { key: string }) => {navigate(`/${e.key}`);}}
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
