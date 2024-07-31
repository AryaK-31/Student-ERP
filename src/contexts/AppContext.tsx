import React, { createContext, ReactNode, useContext, useState, useMemo } from 'react';

type AppContextType = {
  currentClass: string;
  setCurrentClass: (classValue: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentClass, setCurrentClass] = useState<string>('4');

  const contextValue = useMemo(
    () => ({ currentClass, setCurrentClass }),
    [currentClass, setCurrentClass],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('context is not defined');
  }
  return context;
};

export default AppContextProvider;
