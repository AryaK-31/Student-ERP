import React, { useState, useEffect } from 'react';
import { Button, InputNumber, message, Select, Space } from 'antd';
import { useForm, Controller, Resolver } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './AddMarks.module.scss';
import { useAppContext } from '../contexts/AppContext';
import allCoreSubjects from '../utils/constants/coreSubjects';
import toSnakeCase from '../utils/helpers/snakeCase';

const schema = yup.object().shape({
  marks: yup
    .number()
    .required('Please enter valid marks and try again.')
    .test(
      'between-zero-to-hundred',
      'Marks should be between 0 to 100',
      (value) => value >= 0 && value <= 100,
    )
    .nullable(),
});

type FormValues = {
  student: string;
  subject: string;
  marks: number | null;
};

const AddMarks: React.FC = () => {
  const { allStudentData, setAllStudentData, currentClass } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      student: '',
      subject: '',
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

  const subjectOptions = allCoreSubjects
    .map((subject) => ({
      value: subject.value,
      label: subject.label,
    }))
    .concat(
      currentClassData
        ? currentClassData.additionalSubjects.map((subject) => ({
            value: subject.value,
            label: subject.label,
          }))
        : [],
    );

  const watchStudent = watch('student');
  const watchSubject = watch('subject');
  
  useEffect(() => {
    reset(); 
  }, [currentClass, reset]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    if (currentClassData) {
      try {
        /** A flag used to determine if the marks for the subject exists or not */
        let subjectMarksExists = false; 
        const updatedClassData = {
          ...currentClassData,
          students: currentClassData.students.map((student) => {
            if (student.roll_no === data.student) {
              const updatedSubjectMarks = student.subjectMarks.map((subjectMark) => {
                if (toSnakeCase(subjectMark.name) === data.subject.toLowerCase()) {
                  subjectMarksExists = subjectMark.marks === null;
                  return { ...subjectMark, marks: data.marks };
                }
                return subjectMark;
              });

              return { ...student, subjectMarks: updatedSubjectMarks };
            }
            return student;
          }),
        };

        const updatedAllStudentData = allStudentData.map((cls) =>
          cls.currentClass === currentClass ? updatedClassData : cls,
        );

        setAllStudentData(updatedAllStudentData);

        await messageApi.success(
          subjectMarksExists
            ? 'Marks have been added successfully.'
            : 'Marks have been updated successfully.', 1
        );
        reset();
      } catch {
        await messageApi.error('Failed to update marks.', 1);
      }
    }

    setLoading(false);
  };

  return (
    <>
      {contextHolder}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className={styles.selectBase} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.selectContainer}>
          <h3 className={styles.inputLabel}>Select a Student:</h3>
          <Space wrap>
            <Controller
              name="student"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: 320 }}
                  options={studentOptions}
                  placeholder="Select a Student"
                  onChange={(value) => {
                    field.onChange(value);
                    setValue('subject', '');
                  }}
                  className={styles.inputSelect}
                  value={field.value || undefined}
                />
              )}
            />
            {errors.student && <div className={styles.errorWrapper}>{errors.student.message}</div>}
          </Space>
        </div>
        <div className={styles.selectContainer}>
          <h3 className={styles.inputLabel}>Select a Subject:</h3>
          <Space wrap>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: 320 }}
                  options={subjectOptions}
                  placeholder="Select a Subject"
                  onChange={(value) => {
                    field.onChange(value);
                    const student = currentClassData?.students.find(
                      (studentIndividual) => studentIndividual.roll_no === watch('student'),
                    );
                    const subjectMark = student?.subjectMarks.find(
                      (subjectMarkIndividual) =>
                        toSnakeCase(subjectMarkIndividual.name) === value.toLowerCase(),
                    );

                    setValue('marks', subjectMark?.marks as number);
                  }}
                  className={styles.inputSelect}
                  value={field.value || undefined}
                  disabled={!watchStudent}
                />
              )}
            />
            {errors.subject && <div className={styles.errorWrapper}>{errors.subject.message}</div>}
          </Space>
        </div>

        {watchStudent && watchSubject && (
          <>
            <div className={styles.marksContainer}>
              <h3 className={styles.inputLabel}>
                <span className={styles.inputSpan}>*</span>Enter Marks:
              </h3>
              <Controller
                name="marks"
                control={control}
                render={({ field }) => (
                  <div className={styles.inputWrapper}>
                    <InputNumber
                      placeholder="Enter marks"
                      style={{ width: '100%', borderRadius: 0 }}
                      {...field}
                    />
                    {errors.marks && (
                      <div className={styles.errorWrapper}>{errors.marks.message}</div>
                    )}
                  </div>
                )}
              />
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.addButton}
              loading={loading}
              disabled={loading}
              style={{ width: '10%' }}
            >
              Add
            </Button>
          </>
        )}
      </form>
    </>
  );
};

export default AddMarks;
