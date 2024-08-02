import React, { createContext, ReactNode, useContext, useState, useMemo } from 'react';

type StudentType = {
  name: string;
  roll_no: string;
};

type ClassType = {
  class: string;
  students: StudentType[];
};

type AppContextType = {
  classes: ClassType[];
  setClasses: (classes: ClassType[]) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<ClassType[]>([
    {
      class: '4',
      students: [
        { name: 'Arya Kaslikar', roll_no: '1' },
        { name: 'Ajay More', roll_no: '2' },
      ],
    },
  ]);

  const contextValue = useMemo(
    () => ({ classes, setClasses }),
    [classes, setClasses]
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
