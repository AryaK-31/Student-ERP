import React from 'react';
import { Row, Col } from 'antd';
import styles from './Home.module.scss';
import allClasses from '../utils/constants/allClasses';
import CardComponent from '../components/CardComponent';

const Home: React.FC = () => (
    <div className={`home ${styles.homeBase}`}>
      <div className={`home--title ${styles.homeTitle}`}>Enter a Class</div>
      <div className={`home--card-grid ${styles.homeCardGrid}`}>
        <Row justify="center" gutter={[100, 80]}>
          {allClasses.map((classItem) => (
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={8}
              span={8}
              key={classItem}
            >
              <CardComponent>{classItem}th</CardComponent>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );


export default Home;
