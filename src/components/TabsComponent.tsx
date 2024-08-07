import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TabOneContent from '../form/AddStudent';

const items: TabsProps['items'] = [
  {
    key: 'addStudent',
    label: 'Add Student',
    children: <TabOneContent />,
  },
  {
    key: 'addMarks',
    label: 'Add Marks',
    children: 'Add student marks',
  },
];

const onChange = (key: string) => {
  console.log(key);
};

const TabsComponent: React.FC = () => (
  <Tabs items={items} onChange={onChange} type="card" defaultActiveKey="tab1" />
);

export default TabsComponent;
