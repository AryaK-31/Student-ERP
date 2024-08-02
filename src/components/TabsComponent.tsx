import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TabOneContent from '../form/TabOneContent';

const items: TabsProps['items'] = [
  {
    key: 'tab1',
    label: 'Add Student',
    children: <TabOneContent />,
  },
  {
    key: 'tab2',
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
