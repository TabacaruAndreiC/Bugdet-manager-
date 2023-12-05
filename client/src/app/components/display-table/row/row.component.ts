import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkSession } from '../../../shared/models/work-session/work-session.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'tr[app-row]',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './row.component.html',
  styleUrl: './row.component.css',
})
export class RowComponent implements OnInit {
  @Input() workSessions: WorkSession[] = [];
  @Input() week: Date[] = [];
  @Input() rowIndex: number = 0;
  @Input() moneyEarned: number | undefined = 0;
  @Input() isPaid: boolean = false;
  @Output() buttonPressEvent = new EventEmitter<{
    index: number;
    name: string;
  }>();
  maxProjectsPerDay: number = 2;
  maxTasksPerProject: number = 0;
  isLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.maxProjectsPerDay = this.getMaxTasksPerProject();
  }

  private getMaxTasksPerProject() {
    const projectTaskCountMap = new Map<string, Map<string, number>>();

    this.workSessions.forEach((session) => {
      const projectName = session.projectName;
      // Convert Date to string
      const sessionDate = session.date.toISOString().split('T')[0];

      if (!projectTaskCountMap.has(projectName)) {
        // Initialize the project map if it doesn't exist
        projectTaskCountMap.set(projectName, new Map<string, number>());
      }

      const projectMap = projectTaskCountMap.get(projectName)!;

      if (projectMap.has(sessionDate)) {
        // Increment count if project and date exist
        projectMap.set(sessionDate, projectMap.get(sessionDate)! + 1);
      } else {
        // Initialize count if project and date don't exist
        projectMap.set(sessionDate, 1);
      }
    });

    // Find the maximum value in the nested maps
    let maxTasks = 0;
    projectTaskCountMap.forEach((projectMap) => {
      const maxTasksPerProject = Math.max(...Array.from(projectMap.values()));
      if (maxTasksPerProject > maxTasks) {
        maxTasks = maxTasksPerProject;
      }
    });

    return maxTasks;
  }

  private haveSameDate(date1: Date, date2: Date): boolean {
    const year1: number = date1.getFullYear();
    const month1: number = date1.getMonth();
    const day1: number = date1.getDate();

    const year2: number = date2.getFullYear();
    const month2: number = date2.getMonth();
    const day2: number = date2.getDate();

    return year1 === year2 && month1 === month2 && day1 === day2;
  }

  projectsInDay(workSessions: WorkSession[], day: Date) {
    const distinctProjects = new Set<string>();

    workSessions
      .filter((session) => this.haveSameDate(session.date, day))
      .forEach((session) => {
        distinctProjects.add(session.projectName);
      });

    // Convert the Set to an array to get distinct projects
    const distinctProjectsArray: string[] = Array.from(distinctProjects);

    return distinctProjectsArray;
  }

  sessionsInDay(workSessions: WorkSession[], day: Date) {
    const formatedSessions = this.aggregateTasksAndHours(
      workSessions.filter((session) => this.haveSameDate(session.date, day)),
    );

    return formatedSessions;
  }

  aggregateTasksAndHours(workSessions: WorkSession[]) {
    const projectsMap = new Map<
      string,
      { taskName: string; hoursWorked: number }[]
    >();

    workSessions.forEach((session) => {
      const projectName = session.projectName;
      const taskName = session.taskName;
      const hoursWorked = session.hoursWorked;

      if (projectsMap.has(projectName)) {
        // Add task and hours to existing project
        projectsMap.get(projectName)!.push({ taskName, hoursWorked });
      } else {
        // Initialize tasks array if project doesn't exist
        projectsMap.set(projectName, [{ taskName, hoursWorked }]);
      }
    });

    // Convert the Map to an array of objects
    const resultArray: {
      projectName: string;
      tasks: { taskName: string; hoursWorked: number }[];
    }[] = Array.from(projectsMap).map(([projectName, tasks]) => ({
      projectName,
      tasks,
    }));

    return resultArray;
  }

  onButtonPress(): void {
    this.isLoading = true;
    setTimeout(() => {
      const employeeName = `${this.workSessions[0].firstName} ${this.workSessions[0].lastName}`;

      this.buttonPressEvent.emit({ index: this.rowIndex, name: employeeName });
      this.isLoading = false;
    }, 1000);
  }
}
