import React from 'react';
import { Tag, Popconfirm, message } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import allCoreSubjects from '../utils/constants/coreSubjects';
import SectionHeader from '../components/SectionHeader';
import styles from './Subjects.module.scss';
import { useAppContext } from '../contexts/AppContext';
import { AllStudentsType } from '../utils/types/contextTypes';

const Subjects: React.FC = () => {
  const { allStudentData, setAllStudentData, currentClass } = useAppContext();
  const [messageApi, contextHolder] = message.useMessage();

  const currentClassData = allStudentData.find(
    (cls) => cls.currentClass === currentClass
  ) as AllStudentsType ;

  const handleDelete = async (subjectValue: string) => {

    const normalizedSubjectValue = subjectValue.trim().toLowerCase();
    console.log(`Normalized subject value to delete: "${normalizedSubjectValue}"`);

    const updatedClassData: AllStudentsType = {
      ...currentClassData,
      additionalSubjects: currentClassData.additionalSubjects.filter((subject) => {
        const normalizedSubject = subject.value.trim().toLowerCase();
        console.log(`Checking additional subject: "${normalizedSubject}"`);
        return normalizedSubject !== normalizedSubjectValue;
      }),
      students: currentClassData.students.map((student) => ({
        ...student,
        subjectMarks: student.subjectMarks.filter((mark) => {
          const normalizedMark = mark.name.trim().toLowerCase();
          console.log(`Checking subject mark: "${normalizedMark}"`);
          return normalizedMark !== normalizedSubjectValue;
        }),
      })),
    };

    const updatedAllStudentData = allStudentData.map((cls) =>
      cls.currentClass === currentClass ? updatedClassData : cls,
    );

    setAllStudentData(updatedAllStudentData);
    await messageApi.success('Subject has been removed successfully', 1);
  };

  const additionalSubjects = currentClassData?.additionalSubjects || [];

  return (
    <div className={styles.subjectsBase}>
      {contextHolder}
      <div className={styles.coreSubjectsWrapper}>
        <SectionHeader headerText="Core Subjects" />
        <div className={styles.coreSubjects}>
          {allCoreSubjects.map((subject) => (
            <Tag key={subject.value} className={styles.tagText}>
              {subject.label}
            </Tag>
          ))}
        </div>
      </div>
      <div className={styles.additionalSubjectsWrapper}>
        <SectionHeader headerText="Additional Subjects" />
        <div className={styles.coreSubjects}>
          {additionalSubjects.length > 0 ? (
            additionalSubjects.map((subject) => (
              <Tag key={subject.value} className={styles.tagText}>
                {subject.label}
                <Popconfirm
                  title="Are you sure you want to delete this subject?"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onConfirm={() => handleDelete(subject.value)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteFilled
                    style={{ color: 'red', cursor: 'pointer', marginLeft: 8 }}
                  />
                </Popconfirm>
              </Tag>
            ))
          ) : (
            <div className={styles.noData}>No Subjects</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
