import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './AddSubjectModal.module.scss';
import { useAppContext } from '../contexts/AppContext';

const AddSubjectModal: React.FC = () => {
  const { allStudentData } = useAppContext()
  console.log(allStudentData)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" style={{ borderRadius: 0 }} onClick={showModal}>
        <PlusCircleOutlined style={{ fontSize: '1rem' }} />
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
          <div className={styles.modalContent}>
            <p style={{fontWeight : 500, color : 'black'}}>Subject:</p>
            <Input className={styles.inputElement} placeholder="Enter a new subject" />
            <Button className={styles.inputButton} htmlType="submit">Add</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddSubjectModal;
