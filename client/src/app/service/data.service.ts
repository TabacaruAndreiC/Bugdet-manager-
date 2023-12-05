import { Injectable } from '@angular/core';
import { WorkSession } from '../shared/models/work-session/work-session.model';
import { Project } from '../shared/models/project/project.model';
import { Subject, forkJoin, map } from 'rxjs';
import { ApiServiceService } from './api-service.service';
import { Employee } from '../shared/models/employee/employee.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  workSessions: WorkSession[] = [];
  projects: Project[] = [];
  employees: Employee[] = [];

  updateWorkSessionsSubject: Subject<WorkSession[]> = new Subject();
  updateProjectsSubject: Subject<Project[]> = new Subject();
  updateEmployeesSubject: Subject<Employee[]> = new Subject();

  constructor(private apiService: ApiServiceService) {}

  updateData() {
    return forkJoin(
      this.updateWorkSessions(),
      this.updateProjects(),
      this.updateEmployees(),
    );
  }

  updateWorkSessions() {
    return this.apiService.getWorkSessions().pipe(
      map((workSessions) => {
        const updatedWorkSessions = workSessions.map((session: any) => {
          const [day, month, year] = session.data.split('.');

          const dateFromString = new Date(
            Number(year),
            Number(month) - 1,
            Number(day),
          );

          return {
            lastName: session.lastName,
            firstName: session.firstName,
            hourRate: session.hourRate,
            hoursWorkedTotal: session.hourWork,
            date: dateFromString,
            projectName: session.projectName,
            taskName: session.taskName,
            hoursWorked: session.workedHours,
          };
        });

        this.workSessions = updatedWorkSessions;
        this.updateWorkSessionsSubject.next(this.workSessions);
      }),
    );
  }

  updateProjects() {
    return this.apiService.getProjects().pipe(
      map((projects) => {
        const updatedProjects = projects.map((project: any) => {
          return {
            name: project.projectName,
            numberOfFinishedTasks: project.numberOfFinishTask,
            hoursOfTasks: project.hourTask,
            initialBudget: project.initialBudget,
            amountSpent: project.amountSpent,
            isSpecial: project.isSpecial,
          };
        });

        this.projects = updatedProjects;
        this.updateProjectsSubject.next(this.projects);
      }),
    );
  }

  updateEmployees() {
    return this.apiService.getEmployees().pipe(
      map((employees) => {
        const updatedEmployees = employees.map((employee: any) => {
          return {
            lastName: employee.lastName,
            firstName: employee.firstName,
            hourlyWage: employee.hourRate,
            hoursPerWeek: employee.hourWork,
            moneyEarned: employee.moneyEarned,
          };
        });

        this.employees = updatedEmployees;
        this.updateEmployeesSubject.next(this.employees);
      }),
    );
  }
}
