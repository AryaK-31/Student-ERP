import { SubjectType } from "../types/contextTypes";
import toSnakeCase from "../helpers/snakeCase";

const coreSubjects = ['Hindi', 'English', 'Maths', 'Science', 'Social Studies'];

const allCoreSubjects: SubjectType[] = coreSubjects.map((sub) => ({
  value: toSnakeCase(sub),
  label: sub
}));

export default allCoreSubjects;
