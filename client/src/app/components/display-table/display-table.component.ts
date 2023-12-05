import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkSession } from '../../shared/models/work-session/work-session.model';
import { MatButtonModule } from '@angular/material/button';
import { RowComponent } from './row/row.component';
import { DataService } from '../../service/data.service';
import { Subscription } from 'rxjs';
import { Employee } from '../../shared/models/employee/employee.model';

@Component({
  selector: 'app-display-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RowComponent],
  templateUrl: './display-table.component.html',
  styleUrl: './display-table.component.css',
})
export class DisplayTableComponent implements OnInit, OnDestroy {
  week: Date[] = [];
  separatedArrays: WorkSession[][] = [];
  paidRowsIndices: number[] = [];
  @Output() salaryPaidEvent = new EventEmitter<string>();

  dataService: DataService = inject(DataService);
  workSessions: WorkSession[] = [];
  employees: Employee[] = [];
  workSessionsSub: Subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.initializeData();

    this.workSessionsSub = this.dataService.updateWorkSessionsSubject.subscribe(
      (workSessions) => {
        this.initializeData();
      },
    );
  }

  initializeData() {
    this.dataService.updateData();
    this.workSessions = this.dataService.workSessions;
    this.employees = this.dataService.employees;
    this.setWeek();
    this.separatedArrays = this.getArraysByEmployee();
  }

  private getArraysByEmployee(): WorkSession[][] {
    // Use reduce to separate objects into arrays based on the name
    const separatedArrays: { [key: string]: WorkSession[] } =
      this.workSessions.reduce(
        (result: { [key: string]: WorkSession[] }, session) => {
          const key = `${session.firstName}_${session.lastName}`;

          // Check if an array for the current employee exists
          if (!result[key]) {
            result[key] = [];
          }

          // Push the work session into the array for the current employee
          result[key].push(session);

          // Return the updated result
          return result;
        },
        {},
      );

    // Convert the result into an array and return it
    return Object.values(separatedArrays);
  }

  private getMonday(date: Date): Date {
    date = new Date(date);
    let day = date.getDay();
    let diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
  }

  private setWeek(): void {
    let monday = this.getMonday(this.workSessions[0].date);

    for (let index = 0; index < 7; index++) {
      let day = new Date();
      day.setFullYear(monday.getFullYear());
      day.setMonth(monday.getMonth());
      day.setDate(monday.getDate() + index);
      this.week.push(day);
    }
  }

  getSalary(workSessions: WorkSession[]) {
    const employee = this.employees.find(
      (employee) =>
        employee.firstName === workSessions[0].firstName &&
        employee.lastName === workSessions[0].lastName,
    );

    return employee?.moneyEarned;
  }

  paySalary($event: { index: number; name: string }): void {
    this.paidRowsIndices.push($event.index);
    this.salaryPaidEvent.emit($event.name);
  }

  isRowPaid(index: number): boolean {
    return this.paidRowsIndices.includes(index);
  }

  ngOnDestroy(): void {
    this.workSessionsSub.unsubscribe();
  }
}
