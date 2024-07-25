import React from 'react';
import { Row, Col } from 'antd';
import styles from './Home.module.scss';
import allClasses from '../utils/constants/allClasses';
import CardComponent from '../components/CardComponent';

const Home: React.FC = () => (
  <div className={styles.homeBase}>
    <div className={styles.homeTitle}>Enter a Class</div>
    <div className={styles.homeCardGrid}>
      <Row justify="center" gutter={[100, 80]} className={styles.customRow}>
        {allClasses.map((classItem) => (
          <Col span={8} key={classItem}>
            <CardComponent>
              {classItem}
              <sup className={styles.supScript}>th</sup>{' '}
            </CardComponent>
          </Col>
        ))}
      </Row>
    </div>
  </div>
);

export default Home;
