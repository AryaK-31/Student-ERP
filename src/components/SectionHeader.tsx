import React from 'react';
import styles from './SectionHeader.module.scss'

type PropTypes = {
  headerText : any;
}

const SectionHeader : React.FC<PropTypes> = ({ headerText }) => (
  <div>
    <h2 className={styles.headerText}>{headerText}</h2>
  </div>
);

export default SectionHeader;
