import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorkSession } from '../../../shared/models/work-session/work-session.model';
import { MatCardModule } from '@angular/material/card';
import { Employee } from '../../../shared/models/employee/employee.model';
import { MatDividerModule } from '@angular/material/divider';
import { Project } from '../../../shared/models/project/project.model';

@Component({
  selector: 'app-employee-accordion',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatCardModule, MatDividerModule],
  templateUrl: './employee-accordion.component.html',
  styleUrl: './employee-accordion.component.css',
})
export class EmployeeAccordionComponent implements OnInit, OnDestroy {
  accordionId = 0;
  route: ActivatedRoute = inject(ActivatedRoute);
  private routeSubscription: Subscription = new Subscription();
  @Input() workSessions: WorkSession[] = [];
  @Input() projects: Project[] = [];
  currentDayWorkSessions: WorkSession[] = [];

  constructor() {}

  ngOnInit(): void {
    this.accordionId = Number(this.route.snapshot.params['id']);
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.accordionId = Number(params['id']);

      const currentDate = new Date(this.accordionId);
      this.currentDayWorkSessions = this.workSessions.filter((session) =>
        this.haveSameDate(session.date, currentDate),
      );
    });
  }

  private haveSameDate(date1: Date, date2: Date) {
    const year1: number = date1.getFullYear();
    const month1: number = date1.getMonth();
    const day1: number = date1.getDate();

    const year2: number = date2.getFullYear();
    const month2: number = date2.getMonth();
    const day2: number = date2.getDate();

    return year1 === year2 && month1 === month2 && day1 === day2;
  }

  workedOnSpecialProject(workSession: WorkSession) {
    const project = this.projects.find(
      (project) => project.name === workSession.projectName,
    );

    return project?.isSpecial;
  }

  getUniqueEmployees() {
    const uniqueEmployeesSet = new Set(
      this.currentDayWorkSessions.map((session) => {
        return JSON.stringify({
          lastName: session.lastName,
          firstName: session.firstName,
        });
      }),
    );

    // Convert the stringified objects back to JSON
    const uniqueEmployeesArray = Array.from(uniqueEmployeesSet).map(
      (strObject) => JSON.parse(strObject),
    );

    return uniqueEmployeesArray;
  }

  getEmployeeWorkSessions(employee: { lastName: string; firstName: string }) {
    return this.currentDayWorkSessions.filter(
      (session) =>
        session.firstName == employee.firstName &&
        session.lastName === employee.lastName,
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
