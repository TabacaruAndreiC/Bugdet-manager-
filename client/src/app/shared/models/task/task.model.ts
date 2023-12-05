import { Project } from '../project/project.model';

export class Task {
  name!: string;
  value: number = 0;
  totalHours: number = 0;
  proiect!: Project;
  isFinished: boolean = false;
}
