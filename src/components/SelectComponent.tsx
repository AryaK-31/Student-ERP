import React from 'react';
import { Select, Space } from 'antd';
import styles from './SelectComponent.module.scss'

type SelectComponentProps = {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
  value : string | undefined
}

const SelectComponent: React.FC<SelectComponentProps> = ({ options, onChange, placeholder, disabled, value }) => (
  <Space wrap>
    <Select
      style={{ width: 320 }}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      className={styles.inputSelect}
      disabled={disabled} 
      value={value}
    />
  </Space>
);

export default SelectComponent;
