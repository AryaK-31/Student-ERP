import React, { useState } from 'react';
import { Button, InputNumber, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectComponent from '../components/SelectComponent';
import styles from './AddMarks.module.scss';
import { useAppContext } from '../contexts/AppContext';
import allCoreSubjects from '../utils/constants/coreSubjects';

const schema = yup.object().shape({
  marks: yup
    .number()
    .required('Please enter valid marks and try again.')
    .test('between-one-to-hundred', 'Marks should be between 1 to 100', (value) => (
      value > 0 && value <= 100
    ))
    .nullable()
});

type FormValues = {
  marks: number | null;
};

const AddMarks: React.FC = () => {
  const { allStudentData, setAllStudentData, currentClass } = useAppContext();
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      marks: null,
    },
  });

  const currentClassData = allStudentData.find((cls) => cls.currentClass === currentClass);

  const studentOptions = currentClassData
    ? currentClassData.students.map((student) => ({
        value: student.roll_no,
        label: student.name,
      }))
    : [];

  const subjectOptions = [
    ...allCoreSubjects.map((subject) => ({
      value: subject.value,
      label: subject.label,
    })),
    ...(currentClassData
      ? currentClassData.additionalSubjects.map((subject) => ({
          value: subject.value,
          label: subject.label,
        }))
      : []),
  ];

  const handleStudentChange = (value: string) => {
    setSelectedStudent(value);
    setSelectedSubject(null);
    reset();
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    reset();
  };

  const onSubmit = async (data: FormValues) => {
    if (selectedStudent && selectedSubject) {
      setLoading(true);

      try {
        if (currentClassData) {
          const updatedClassData = {
            ...currentClassData,
            students: currentClassData.students.map((student) => {
              if (student.roll_no === selectedStudent) {
                return {
                  ...student,
                  subjectMarks: student.subjectMarks.map((subjectMark) => {
                    if (subjectMark.name.toLowerCase() === selectedSubject.toLowerCase()) {
                      return { ...subjectMark, marks: data.marks };
                    }
                    return subjectMark;
                  }),
                };
              }
              return student;
            }),
          };

          const updatedAllStudentData = allStudentData.map((cls) =>
            cls.currentClass === currentClass ? updatedClassData : cls,
          );

          setAllStudentData(updatedAllStudentData);

          await message.success('Marks have been added successfully.');
          reset();
        }
      } catch (error) {
        await message.error('Failed to add marks.');
      }

      setLoading(false);
    }
  };

  return (
    <div className={styles.selectBase}>
      <div className={styles.selectContainer}>
        <h3 className={styles.inputLabel}>Select a Student:</h3>
        <SelectComponent
          options={studentOptions}
          onChange={handleStudentChange}
          placeholder="Select a Student"
          disabled={false}
        />
      </div>
      <div className={styles.selectContainer}>
        <h3 className={styles.inputLabel}>Select a Subject:</h3>
        <SelectComponent
          options={subjectOptions}
          onChange={handleSubjectChange}
          placeholder="Select a Subject"
          disabled={!selectedStudent}
        />
      </div>

      {selectedStudent && selectedSubject && (
        <>
          <div className={styles.marksContainer}>
            <h3 className={styles.inputLabel}>Enter Marks:</h3>
            <Controller
              name="marks"
              control={control}
              render={({ field }) => (
                <>
                  <InputNumber
                    min={0}
                    max={100}
                    placeholder="Enter marks"
                    style={{ width: '20%', borderRadius: 0 }}
                    {...field}
                    onChange={(value) => field.onChange(value)}
                  />
                  {errors.marks && (
                    <div className={styles.errorWrapper}>{errors.marks.message}</div>
                  )}
                </>
              )}
            />
          </div>
          <Button
            type="primary"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmit(onSubmit)}
            className={styles.addButton}
            loading={loading}
            disabled={loading}
            style={{ width: '10%' }}
          >
            Add
          </Button>
        </>
      )}
    </div>
  );
};

export default AddMarks;