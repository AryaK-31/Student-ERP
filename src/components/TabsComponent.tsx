import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import AddStudent from '../form/AddStudent';
import AddMarks from '../form/AddMarks';


const items: TabsProps['items'] = [
  {
    key: 'addStudent',
    label: 'Add Student',
    children: <AddStudent />,
  },
  {
    key: 'addMarks',
    label: 'Add Marks',
    children: <AddMarks />,
  },
];



const TabsComponent: React.FC = () => (
  <Tabs items={items}  type="card" defaultActiveKey="addStudent" />
);

export default TabsComponent;
