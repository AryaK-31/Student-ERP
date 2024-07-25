import React, { ReactNode } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.scss';

type CardComponentProps = {
  children: ReactNode;
};

const CardComponent: React.FC<CardComponentProps> = ({ children }) => {
  
  /** function provided by react-router-dom for navigating to routes without refresh */
  const navigate = useNavigate(); 

  return (
    /** onClick Navigates the page to '/dashboard' */
    <Card onClick={() => navigate('/dashboard')} hoverable className={styles.cardStyle}>
      <p className={styles.cardStylePara}>{children}</p>
    </Card>
  );
};

export default CardComponent;
