import React from 'react';
import TabsComponent from '../components/TabsComponent';
import styles from './Students.module.scss';

const Students: React.FC = () => (
  <div className={styles.studentBase}>
    <TabsComponent />
  </div>
);

export default Students;
