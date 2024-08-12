import React, { useState } from 'react';
import { Button, Input, Modal, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './AddSubjectModal.module.scss';
import { useAppContext } from '../contexts/AppContext';
import { AllStudentsType } from '../utils/types/contextTypes';
import toSnakeCase from '../utils/helpers/snakeCase';
import capitalizeFirstWord from '../utils/helpers/upperCase';

type FormValues = {
  subject: string;
};

const schema = yup.object().shape({
  subject: yup
    .string()
    .required('Please enter subject name and try again.')
    .test('is-unique', 'This subject already exists.', (value, context) => {
      const currentClassData = context.options.context
        ? (context.options.context.currentClassData as AllStudentsType)
        : null;
      return currentClassData
        ? !currentClassData.additionalSubjects.some((sub) => sub.value === toSnakeCase(value || ''))
        : true;
    }),
});

const AddSubjectModal: React.FC = () => {
  const { allStudentData, setAllStudentData, currentClass } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentClassData: AllStudentsType | undefined = allStudentData.find(
    (cls) => cls.currentClass === currentClass,
  );

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

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data: FormValues) => {
    const { subject } = data;
  
    try {
      const capitalizedSubject = capitalizeFirstWord(subject);
  
      if (currentClassData) {
        const updatedClassData: AllStudentsType = {
          ...currentClassData,
          additionalSubjects: [
            ...currentClassData.additionalSubjects,
            { value: toSnakeCase(subject), label: capitalizedSubject },
          ],
          students: currentClassData.students.map((student) => ({
            ...student,
            subjectMarks: [
              ...student.subjectMarks,
              { name: capitalizedSubject, marks: null }, // Capitalized subject name
            ],
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
          additionalSubjects: [{ value: toSnakeCase(subject), label: capitalizedSubject }],
        };
  
        setAllStudentData([...allStudentData, newClassData]);
      }
  
      await message.success('Subject has been added successfully.');
    } catch (error) {
      await message.error('Failed to add subject.');
    }
  
    setIsModalOpen(false);
    reset();
  };



  return (
    <>
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
