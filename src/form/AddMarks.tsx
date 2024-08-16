import React, { useState } from 'react';
import { Button, InputNumber, message, Select, Space } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './AddMarks.module.scss';
import { useAppContext } from '../contexts/AppContext';
import allCoreSubjects from '../utils/constants/coreSubjects';

const schema = yup.object().shape({
  marks: yup
    .number()
    .required('Please enter valid marks and try again.')
    .test(
      'between-one-to-hundred',
      'Marks should be between 1 to 100',
      (value) => value > 0 && value < 101,
    )
    .nullable(),
  student: yup.string().required('Please select a student.'),
  subject: yup.string().required('Please select a subject.'),
});

type FormValues = {
  student: string;
  subject: string;
  marks: number | null;
};

const AddMarks: React.FC = () => {
  const { allStudentData, setAllStudentData, currentClass } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
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

  const onStudentChange = (value: string) => {
    setValue('student', value);
    setIsUpdating(false);
  };

  const onSubjectChange = (value: string) => {
    const selectedStudent = getValues('student');
    setValue('subject', value);

    if (selectedStudent && currentClassData) {
      const student = currentClassData.students.find(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (student) => student.roll_no === selectedStudent,
      );
      const subjectMark = student?.subjectMarks.find(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (subjectMark) => subjectMark.name.toLowerCase() === value.toLowerCase(),
      );

      setValue('marks', subjectMark?.marks || null);
      setIsUpdating(!!subjectMark?.marks);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    if (currentClassData) {
      try {
        const updatedClassData = {
          ...currentClassData,
          students: currentClassData.students.map((student) => {
            if (student.roll_no === data.student) {
              const subjectIndex = student.subjectMarks.findIndex(
                (subjectMark) => subjectMark.name.toLowerCase() === data.subject.toLowerCase(),
              );

              if (subjectIndex !== -1) {
                const updatedSubjectMarks = student.subjectMarks.map((subjectMark, index) =>
                  index === subjectIndex ? { ...subjectMark, marks: data.marks } : subjectMark,
                );
                return { ...student, subjectMarks: updatedSubjectMarks };
              }
              const newSubjectMark = { name: data.subject, marks: data.marks };
              return { ...student, subjectMarks: student.subjectMarks.concat(newSubjectMark) };
            }
            return student;
          }),
        };

        const updatedAllStudentData = allStudentData.map((cls) =>
          cls.currentClass === currentClass ? updatedClassData : cls,
        );

        setAllStudentData(updatedAllStudentData);

        await messageApi.success(
          isUpdating
            ? 'Marks have been updated successfully.'
            : 'Marks have been added successfully.',
          1,
        );
        reset();
        setIsUpdating(false);
      } catch {
        await messageApi.error('Failed to update marks.', 1);
      }
    }

    setLoading(false);
  };

  return (
    <div className={styles.selectBase}>
      {contextHolder}
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
                onChange={onStudentChange}
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
                onChange={onSubjectChange}
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
            <h3 className={styles.inputLabel}><span className={styles.inputSpan}>*</span>Enter Marks:</h3>
            <Controller
              name="marks"
              control={control}
              render={({ field }) => (
                <div className={styles.inputWrapper}>
                  <InputNumber
                    min={0}
                    max={100}
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
