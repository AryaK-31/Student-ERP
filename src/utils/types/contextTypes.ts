export type SubjectMarksType = {
  name: string;
  marks: number | null;
};

export type SubjectType = {
  label: string;
  value: string; 
}

export type StudentType = {
  name: string;
  roll_no: string;
  subjectMarks: SubjectMarksType[];
};

export type AllStudentsType = {
  currentClass: string;
  students: StudentType[];
  additionalSubjects: SubjectType[];
};
