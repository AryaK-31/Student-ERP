import React, { createContext, ReactNode, useContext, useState, useMemo } from 'react';

type Student = {
  name: string;
  roll_no: string;
};

type AppContextType = {
  currentClass: string;
  students: Student[];
  setCurrentClass: React.Dispatch<React.SetStateAction<string>>;
  addStudent: (student: Student) => void;
};

const defaultContextValue: AppContextType = {
  currentClass: '4',
  students: [],
  setCurrentClass: () => {},
  addStudent: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<Array<{ class: string; students: Student[] }>>([]);
  const [currentClass, setCurrentClass] = useState<string>('4');

  const addStudent = (student: Student) => {
    setClasses((prevClasses) => {
      const classIndex = prevClasses.findIndex((classItem) => classItem.class === currentClass);

      if (classIndex === -1) {
        // class check fails and adds new class 
        return [...prevClasses, { class: currentClass, students: [student] }];
      }

      // Update existing class with the new student
      return prevClasses.map((classItem, index) =>
        index === classIndex
          ? { ...classItem, students: [...classItem.students, student] }
          : classItem,
      );
    });
  };

  const contextValue = useMemo(() => {
    const currentClassData = classes.find((classItem) => classItem.class === currentClass) || {
      class: currentClass,
      students: [],
    };
    return {
      currentClass,
      students: currentClassData.students,
      setCurrentClass,
      addStudent,
    };
  }, [currentClass, classes]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('context is not defined');
  }
  return context;
};

export default AppContextProvider;
