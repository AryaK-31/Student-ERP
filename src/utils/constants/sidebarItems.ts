import type { MenuProps } from 'antd';

const customDividerStyle: React.CSSProperties = {
  borderColor: 'black',
  margin: 0,
};


type MenuItem = Required<MenuProps>['items'][number];

/** Array of objects of sidebar item titles */
const items: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
  },
  {
    type: 'divider',
    style: customDividerStyle,
  },
  {
    key: 'students',
    label: 'Students',
  },
  {
    type: 'divider',
    style: customDividerStyle,
  },
  {
    key: 'subjects',
    label: 'Subjects',
  },
  {
    type: 'divider',
    style: customDividerStyle,
  },
];

export default items;
