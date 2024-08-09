import React from 'react';
import { Tag } from 'antd';
import allCoreSubjects from '../utils/constants/coreSubjects';
import SectionHeader from '../components/SectionHeader';
import styles from './Subjects.module.scss';

const Subjects: React.FC = () => (
  <div className={styles.subjectsBase}>
    <div>
      <SectionHeader headerText="Core Subjects" />
      <div className={styles.coreSubjects}>
        {allCoreSubjects.map((subject) => (
          <Tag key={subject} className={styles.tagText}>{subject}</Tag>
        ))}
      </div>
    </div>
    <div>
      <SectionHeader headerText="Additional Subjects" />
    </div>
  </div>
);

export default Subjects;
