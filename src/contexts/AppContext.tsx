import React, { createContext, ReactNode, useContext, useState, useMemo } from 'react';
import { AllStudentsType } from 'src/utils/types/contextTypes';

type AppContextType = {
  allStudentData: AllStudentsType[];
  setAllStudentData: React.Dispatch<React.SetStateAction<AllStudentsType[]>>;
  currentClass: string;
  setCurrentClass: React.Dispatch<React.SetStateAction<string>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allStudentData, setAllStudentData] = useState<AllStudentsType[]>([]);
  const [currentClass, setCurrentClass] = useState<string>('4');

  const contextValue = useMemo(
    () => ({ allStudentData, setAllStudentData, currentClass, setCurrentClass }),
    [allStudentData, currentClass]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export default AppContextProvider;
