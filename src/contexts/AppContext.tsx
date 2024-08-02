import React, { createContext, ReactNode, useContext, useState, useMemo } from 'react';

type AppContextType = Array<{
  currentClass: string;
  students: Array<{
    name: string;
    roll_no: string;
  }>;
  setCurrentClass: (classValue: string) => void;
  addStudent: (student: { name: string; roll_no: string }) => void;
}>;
const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentClass, setCurrentClass] = useState<string>('4');
  const [students, setStudents] = useState<Array<{ name: string; roll_no: string }>>([
    { name: 'Arya Kaslikar', roll_no: '1' },
  ]);

  const addStudent = (student: { name: string; roll_no: string }) => {
    setStudents((prevStudents) => [...prevStudents, student]);
  };

  const contextValue: AppContextType = useMemo(
    () => [
      {
        currentClass,
        students,
        setCurrentClass,
        addStudent,
      },
    ],
    [currentClass, students, setCurrentClass, addStudent]
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
