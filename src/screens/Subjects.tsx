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

  const currentClassData: AllStudentsType | undefined = allStudentData.find(
    (cls) => cls.currentClass === currentClass
  );

  console.log(allStudentData)

  const handleDelete = async (subjectValue: string) => {
    const lowercaseSubjectValue = subjectValue.toLowerCase();
  
    const updatedClassData: AllStudentsType = {
      ...currentClassData!,
      additionalSubjects: currentClassData!.additionalSubjects.filter(
        (subject) => subject.value.toLowerCase() !== lowercaseSubjectValue
      ),
      students: currentClassData!.students.map((student) => ({
        ...student,
        subjectMarks: student.subjectMarks.filter(
          (mark) => mark.name.toLowerCase() !== lowercaseSubjectValue
        ),
      })),
    };
  
    const updatedAllStudentData = allStudentData.map((cls) =>
      cls.currentClass === currentClass ? updatedClassData : cls
    );
  
    setAllStudentData(updatedAllStudentData);
    await message.success('Subject has been removed successfully');
  };
  

  const additionalSubjects = currentClassData && currentClassData.additionalSubjects;

  return (
    <div className={styles.subjectsBase}>
      <div>
        <SectionHeader headerText="Core Subjects" />
        <div className={styles.coreSubjects}>
          {allCoreSubjects.map((subject) => (
            <Tag key={subject.value} className={styles.tagText}>
              {subject.label}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <SectionHeader headerText="Additional Subjects" />
        <div className={styles.coreSubjects}>
          {additionalSubjects &&
            additionalSubjects.map((subject) => (
              <div key={subject.value}>
                <Tag className={styles.tagText}>
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
