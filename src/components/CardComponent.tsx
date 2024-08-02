import React, { ReactNode } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.scss';
import { useAppContext } from '../contexts/AppContext';

type CardComponentProps = {
  children: ReactNode;
};

const CardComponent: React.FC<CardComponentProps> = ({ children }) => {
  const { setCurrentClass } = useAppContext();

  /** function provided by react-router-dom for navigating to routes without refresh */
  const navigate = useNavigate();

  /** onClick Navigates the page to '/dashboard' */
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const classVal = e.currentTarget.innerText;
    setCurrentClass(classVal[0]);
    navigate('/dashboard');
  };

  return (
      <Card onClick={handleClick} hoverable className={styles.cardStyle}>
        <p className={styles.cardStylePara}>{children}</p>
      </Card>
  );
};

export default CardComponent;
