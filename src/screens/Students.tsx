import React from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import styles from './Students.module.scss';
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


const Students: React.FC = () => (
  <div className={styles.studentBase}>
    <Tabs items={items}  type="card" defaultActiveKey="addStudent" />
  </div>
);

export default Students;
