import React, { ReactNode } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.scss';
import { useAppContext } from '../contexts/AppContext';

type CardComponentProps = {
  children: ReactNode;
  classKey: string;
};

const CardComponent: React.FC<CardComponentProps> = ({ children, classKey }) => {
  const { setCurrentClass } = useAppContext();
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        setCurrentClass(classKey);
        navigate('dashboard');
      }}
      hoverable
      className={styles.cardStyle}
    >
      <p className={styles.cardStylePara}>{children}</p>
    </Card>
  );
};

export default CardComponent;
