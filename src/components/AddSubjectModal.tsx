import React, { useState } from 'react';
import { Button, Input, message, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import allCoreSubjects from '../utils/constants/coreSubjects';
import styles from './AddSubjectModal.module.scss';
import { useAppContext } from '../contexts/AppContext';
import { AllStudentsType } from '../utils/types/contextTypes';
import toSnakeCase from '../utils/helpers/snakeCase';
import capitalizeFirstWord from '../utils/helpers/capitalizeFirstWord';

type FormValues = {
  subject: string;
};

const schema = yup.object().shape({
  subject: yup
    .string()
    .required('Please enter subject name and try again.')
    .matches(/^[a-zA-Z\s]+$/, 'Subject must be alphabetic')
    .test('is-unique', 'This subject already exists.', (value, context) => {
      const currentClassData = context.options.context
        ? (context.options.context.currentClassData as AllStudentsType)
        : null;

      const allSubjects = currentClassData
        ? currentClassData.additionalSubjects.map((sub) => sub.value).concat(allCoreSubjects.map((sub) => sub.value))
        : allCoreSubjects.map((sub) => sub.value);

      return !allSubjects.includes(toSnakeCase(value || ''));
    }),
});

const AddSubjectModal: React.FC = () => {
  const { allStudentData, setAllStudentData, currentClass } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const currentClassData = allStudentData.find((cls) => cls.currentClass === currentClass);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      subject: '',
    },
    context: { currentClassData },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data: FormValues) => {
    const { subject } = data;

    const capitalizedSubject = capitalizeFirstWord(subject);

    const snakeCaseSubject = toSnakeCase(subject);

    try {
      if (currentClassData) {
        const updatedClassData: AllStudentsType = {
          ...currentClassData,
          additionalSubjects: [
            ...currentClassData.additionalSubjects,
            { value: snakeCaseSubject, label: capitalizedSubject },
          ],
          students: currentClassData.students.map((student) => ({
            ...student,
            subjectMarks: [...student.subjectMarks, { name: capitalizedSubject, marks: null }],
          })),
        };

        const updatedAllStudentData = allStudentData.map((cls) =>
          cls.currentClass === currentClass ? updatedClassData : cls,
        );

        setAllStudentData(updatedAllStudentData);
      } else {
        const newClassData: AllStudentsType = {
          currentClass,
          students: [],
          additionalSubjects: [{ value: snakeCaseSubject, label: capitalizedSubject }],
        };

        setAllStudentData([...allStudentData, newClassData]);
      }

      await messageApi.success({ content: 'Subject has been added successfully.', duration: 1 });
    } catch (error) {
      await messageApi.error({ content: 'Failed to add subject.', duration: 1 });
    }

    setIsModalOpen(false);
    reset();
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" className={styles.addButton} onClick={showModal}>
        <PlusCircleOutlined className={styles.addIcon} />
        <p>Add Subject</p>
      </Button>
      <Modal
        centered
        footer={null}
        width={500}
        title="Add a Subject"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className={styles.modalContainer}>
          <div className={styles.dividor} />
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form className={styles.modalContent} onSubmit={handleSubmit(onSubmit)}>
            <p className={styles.label}>Subject:</p>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <div className={styles.inputWrapper}>
                  <Input
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...field}
                    className={styles.inputElement}
                    placeholder="Enter a new subject"
                  />
                  {errors.subject && (
                    <div className={styles.errorWrapper}>{errors.subject.message}</div>
                  )}
                </div>
              )}
            />
            <Button className={styles.inputButton} htmlType="submit" type="primary">
              Add
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddSubjectModal;
