import type { MenuProps } from 'antd';
import styles from 'src/components/Sidebar.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

/** Array of objects of sidebar item titles */
const items: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
  },
  {
    type: 'divider',
    className: styles.customDividerStyle,
  },
  {
    key: 'students',
    label: 'Students',
  },
  {
    type: 'divider',
    className: styles.customDividerStyle,
  },
  {
    key: 'subjects',
    label: 'Subjects',
  },
  {
    type: 'divider',
    className: styles.customDividerStyle,
  },
];

export default items;
