import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import allClasses from '../utils/constants/allClasses';
import styles from './Topbar.module.scss';
import { useAppContext } from '../contexts/AppContext';

const items: MenuProps['items'] = allClasses.map((classType) => ({
  key: classType,
  label: (
    <span>
      {classType}
      <sup>th</sup>
    </span>
  ),
}));

const Topbar: React.FC = () => {
  const { currentClass, setCurrentClass } = useAppContext();

  return (
    <div className={styles.menu}>
      <Dropdown
        menu={{
          items,
          onClick: ({ key }) => {
            setCurrentClass(key);
          },
          selectable: true,
          selectedKeys: [currentClass],
        }}
        trigger={['click']}
      >
        <button type="button" className={styles.menuItem}>
          <Space>
            <p>
              Class {currentClass}
              <sup>th</sup>
            </p>
            <span>
              <DownOutlined />
            </span>
          </Space>
        </button>
      </Dropdown>
    </div>
  );
};

export default Topbar;
