import { Task } from '../task/task.model';

export class Project {
  name!: string;
  numberOfFinishedTasks: number = 0;
  hoursOfTasks: number = 0;
  initialBudget: number = 0;
  amountSpent: number = 0;
  isSpecial: boolean = false;
}
