import React, { useEffect } from 'react';
import { Input, Button } from 'antd';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../components/TabsComponent.module.scss';
import { useAppContext } from '../contexts/AppContext';

type FormFields = {
  name: string;
  roll: string;
};

const schema = yup.object().shape({
  name: yup.string().required('Please enter student name and try again'),
  roll: yup.string().required('Please enter a roll no and try again'),
});

const TabOneContent: React.FC = () => {
  const { classes } = useAppContext();

  const currentClass = classes.length > 0 ? classes[0].class : '';

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset();
  }, [currentClass]);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={() => handleSubmit(onSubmit)} className={styles.inputContainer}>
      <div className={styles.inputContent}>
        <div className={styles.inputLabel}>
          <span className={styles.error}>*</span>
          <p>Student Name:</p>
        </div>
        <Controller
          name="name"
          control={control}
          defaultValue=""
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
          defaultValue=""
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
        <Button htmlType="submit" className={styles.inputButton} type="primary">
          Add
        </Button>
      </div>
    </form>
  );
};

export default TabOneContent;
