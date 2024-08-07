export type StudentType = {
  name: string;
  roll_no: string;
};

export type AllStudentsType = {
  currentClass: string;
  students: StudentType[];
};
