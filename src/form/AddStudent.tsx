import React, { useEffect, useState } from 'react';
import { Input, Button, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AllStudentsType } from '../utils/types/contextTypes';
import styles from '../components/TabsComponent.module.scss';
import { useAppContext } from '../contexts/AppContext';

const schema = yup.object().shape({
  name: yup.string().required('Please enter student name and try again'),
  roll: yup
    .string()
    .required('Please enter a roll no and try again')
    .matches(/^\d+$/, 'Roll number must be numeric')
    .test('is-unique', 'Roll number already exists in the current class!', (value, context) => {
      const currentClassData = context.options.context? context.options.context.currentClassData as AllStudentsType : null
      return currentClassData
        ? !currentClassData.students.some((student) => student.roll_no === value)
        : true;
    }),
});

type FormFields = {
  name: string;
  roll: string;
};


const AddStudent: React.FC = () => {
  const { allStudentData, setAllStudentData, currentClass } = useAppContext();
  const [loading, setLoading] = useState(false);

  const currentClassData = allStudentData.find((cls) => cls.currentClass === currentClass);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      roll: '',
    },
    context: { currentClassData }
  });

  useEffect(() => {
    reset();
  }, [currentClass, reset]);

  const onSubmit = async (data: FormFields) => {
    setLoading(true);

    try {
      const newStudent = { name: data.name, roll_no: data.roll };

      if (currentClassData) {
        const updatedClass = {
          ...currentClassData,
          students: [...currentClassData.students, newStudent],
        };

        setAllStudentData((prevData) => [
          ...prevData.filter((cls) => cls.currentClass !== currentClass),
          updatedClass,
        ]);
      } else {
        const newClass = {
          currentClass,
          students: [newStudent],
        };

        setAllStudentData((prevData) => [...prevData, newClass]);
      }

      await message.success('Student added successfully!');
    } catch (error) {
      await message.error('Failed to add student.');
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className={styles.inputContainer}>
      <div className={styles.inputContent}>
        <div className={styles.inputLabel}>
          <span className={styles.error}>*</span>
          <p>Student Name:</p>
        </div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className={styles.inputWrapper}>
              <Input {...field} className={styles.inputElement} placeholder="Enter Student Name" />
              <div className={styles.errorWrapper}>
                {errors.name && <div className={styles.error}>{errors.name.message}</div>}
              </div>
            </div>
          )}
        />
      </div>
      <div className={styles.inputContent}>
        <div className={styles.inputLabel}>
          <span className={styles.error}>*</span>
          <p>Roll No:</p>
        </div>
        <Controller
          name="roll"
          control={control}
          render={({ field }) => (
            <div className={styles.inputWrapper}>
              <Input {...field} className={styles.inputElement} placeholder="Enter Roll No." />
              <div className={styles.errorWrapper}>
                {errors.roll && <div className={styles.error}>{errors.roll.message}</div>}
              </div>
            </div>
          )}
        />
      </div>
      <div>
        <Button htmlType="submit" className={styles.inputButton} type="primary" loading={loading}>
          {loading ? 'Adding...' : 'Add'}
        </Button>
      </div>
    </form>
  );
};

export default AddStudent;
