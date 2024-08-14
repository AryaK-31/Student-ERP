import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import SectionHeader from '../components/SectionHeader';
import { useAppContext } from '../contexts/AppContext';
import styles from './Dashboard.module.scss';

type StudentWiseTableDataTypes = {
  key: string;
  studentName: string;
  rollNo: string;
  totalMarks: number | string;
};

type SubjectWiseTableDataTypes = {
  key: string;
  subjectName: string;
  averageMarks: string | number;
  topScorerRank1: string;
  topScorerRank2: string;
  topScorerRank3: string;
};

const studentWiseColumns: TableProps<StudentWiseTableDataTypes>['columns'] = [
  {
    title: 'Student Name',
    dataIndex: 'studentName',
    key: 'studentName',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    render: (text) => text,
  },
  {
    title: 'Roll No',
    dataIndex: 'rollNo',
    key: 'rollNo',
  },
  {
    title: 'Total Marks',
    dataIndex: 'totalMarks',
    key: 'totalMarks',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    render: (text) => text !== null ? text : '-',
  }
];

const subjectWiseColumns: TableProps<SubjectWiseTableDataTypes>['columns'] = [
  {
    title: 'Subject Name',
    dataIndex: 'subjectName',
    key: 'subjectName',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    render: (text) => text,
  },
  {
    title: 'Average Marks',
    dataIndex: 'averageMarks',
    key: 'averageMarks',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    render: (text) => text !== null ? text : '-',
  },
  {
    title: 'Top Scorer Rank 1',
    dataIndex: 'topScorerRank1',
    key: 'topScorerRank1',
  },
  {
    title: 'Top Scorer Rank 2',
    dataIndex: 'topScorerRank2',
    key: 'topScorerRank2',
  },
  {
    title: 'Top Scorer Rank 3',
    dataIndex: 'topScorerRank3',
    key: 'topScorerRank3',
  }
];

const Dashboard: React.FC = () => {
  const { allStudentData, currentClass } = useAppContext();

  const currentClassData = allStudentData.find(cls => cls.currentClass === currentClass);

  const studentWiseData: StudentWiseTableDataTypes[] = currentClassData
    ? currentClassData.students.map(student => {
        const totalMarks = student.subjectMarks.reduce((sum, subject) => sum + (subject.marks ? subject.marks : 0), 0);
        return {
          key: student.roll_no,
          studentName: student.name || '-',
          rollNo: student.roll_no || '-',
          totalMarks: totalMarks || '-'
        };
      })
    : [];

  const allSubjects = currentClassData
    ? [...new Set([
        ...currentClassData.additionalSubjects.map(sub => sub.value),
        ...currentClassData.students.flatMap(student => student.subjectMarks.map(sub => sub.name))
      ])]
    : [];

  const subjectWiseData: SubjectWiseTableDataTypes[] = allSubjects.map(subject => {
    const marks = currentClassData?.students.flatMap(student => {
      const subjectMarks = student.subjectMarks.find(sub => sub.name === subject);
      return subjectMarks ? [{ studentName: student.name, marks: subjectMarks.marks }] : [];
    }) || [];

    const averageMarks = marks.length > 0
      ? (marks.reduce((sum, mark) => sum + (mark.marks || 0), 0) / marks.length).toFixed(2)
      : '-';

    const sortedMarks = marks.sort((a, b) => (b.marks || 0) - (a.marks || 0));
    const topScorers = [
      sortedMarks[0]?.studentName || '-',
      sortedMarks[1]?.studentName || '-',
      sortedMarks[2]?.studentName || '-'
    ];

    return {
      key: subject,
      subjectName: subject,
      averageMarks,
      topScorerRank1: topScorers[0],
      topScorerRank2: topScorers[1],
      topScorerRank3: topScorers[2]
    };
  });

  return (
    <div className={styles.dashboardBase}>
      <div className={styles.tableContainer}>
        <SectionHeader headerText="Student-wise Total Marks" />
        <Table pagination={false} className={styles.tableOne} columns={studentWiseColumns} dataSource={studentWiseData} />
      </div>
      <div className={styles.tableContainer}>
        <SectionHeader headerText="Subject-wise Average Marks and Top Scorers" />
        <Table pagination={false} className={styles.tableTwo} columns={subjectWiseColumns} dataSource={subjectWiseData} />
      </div>
    </div>
  );
};

export default Dashboard;
