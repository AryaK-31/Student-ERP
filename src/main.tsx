import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { ConfigProvider } from 'antd';
import App from './App';
import antdConfigProviderTheme from './antd-theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <ConfigProvider theme={antdConfigProviderTheme}>
      <App />
    </ConfigProvider>
  </StrictMode>,
);
