import React, { createContext, ReactNode, useContext, useState, useMemo } from 'react';

type Student = {
  name: string;
  roll_no: string;
};

type AppContextType = Array<{
  class: string;
  students: Student[];
}>;

const AppContext = createContext<
  | {
      currentClass: string;
      students: Student[];
      setCurrentClass: (classValue: string) => void;
      addStudent: (student: Student) => void;
    }
  | undefined
>(undefined);

const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<AppContextType>([]);
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

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('context is not defined');
  }
  return context;
};

export default AppContextProvider;
