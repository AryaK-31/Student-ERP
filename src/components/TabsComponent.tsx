import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import AddStudent from '../form/AddStudent';

const items: TabsProps['items'] = [
  {
    key: 'addStudent',
    label: 'Add Student',
    children: <AddStudent />,
  },
  {
    key: 'addMarks',
    label: 'Add Marks',
    children: 'Add student marks',
  },
];



const TabsComponent: React.FC = () => (
  <Tabs items={items}  type="card" defaultActiveKey="addStudent" />
);

export default TabsComponent;
