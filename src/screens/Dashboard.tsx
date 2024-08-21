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
    render: (text) => (text !== null ? text : '-'),
  },
];

const subjectWiseColumns: TableProps<SubjectWiseTableDataTypes>['columns'] = [
  {
    title: 'Subject Name',
    dataIndex: 'subjectName',
    key: 'subjectName',
  },
  {
    title: 'Average Marks',
    dataIndex: 'averageMarks',
    key: 'averageMarks',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    render: (text) => (text !== null ? text : '-'),
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
  },
];

const Dashboard: React.FC = () => {
  const { allStudentData, currentClass } = useAppContext();

  const currentClassData = allStudentData.find((cls) => cls.currentClass === currentClass) || {
    students: [],
    additionalSubjects: [],
  };

  // Check if there are students in the current class
  const hasStudents = currentClassData.students.length > 0;

  const studentWiseData: StudentWiseTableDataTypes[] = hasStudents
    ? currentClassData.students.map((student) => {
        const totalMarks = student.subjectMarks.reduce(
          (sum, subject) => sum + (subject.marks || 0),
          0,
        );
        return {
          key: student.roll_no,
          studentName: student.name || '-',
          rollNo: student.roll_no || '-',
          totalMarks: totalMarks || '-',
        };
      })
    : [];

  const allSubjects = [
    ...new Set(
      currentClassData.additionalSubjects
        .map((sub) => sub.value)
        .concat(
          currentClassData.students.flatMap((student) =>
            student.subjectMarks.map((sub) => sub.name),
          ),
        ),
    ),
  ];

  const subjectWiseData: SubjectWiseTableDataTypes[] = hasStudents
    ? allSubjects.map((subject) => {
        const marks = currentClassData.students.flatMap((student) =>
          student.subjectMarks
            .filter((sub) => sub.name === subject)
            .map((sub) => ({ studentName: student.name, marks: sub.marks || 0 })),
        );

        const averageMarks =
          marks.length > 0
            ? (marks.reduce((sum, mark) => sum + mark.marks, 0) / marks.length).toFixed(2)
            : '-';

        const sortedMarks = marks.sort((a, b) => b.marks - a.marks);
        const topScorers = [0, 1, 2].map((rank) => sortedMarks[rank]?.studentName || '-');

        return {
          key: subject,
          subjectName: subject,
          averageMarks,
          topScorerRank1: topScorers[0],
          topScorerRank2: topScorers[1],
          topScorerRank3: topScorers[2],
        };
      })
    : [];

  return (
    <div>
      {hasStudents ? (
        <div className={styles.dashboardBase}>
          <div className={styles.tableContainer}>
            <SectionHeader headerText="Student-wise Total Marks" />
            <Table
              pagination={false}
              className={styles.tableOne}
              columns={studentWiseColumns}
              dataSource={studentWiseData}
            />
          </div>
          <div className={styles.tableContainer}>
            <SectionHeader headerText="Subject-wise Average Marks and Top Scorers" />
            <Table
              pagination={false}
              className={styles.tableTwo}
              columns={subjectWiseColumns}
              dataSource={subjectWiseData}
            />
          </div>
        </div>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
};

export default Dashboard;
