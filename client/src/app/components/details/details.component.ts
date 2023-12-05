import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Employee } from '../../shared/models/employee/employee.model';
import { WorkSession } from '../../shared/models/work-session/work-session.model';
import { Router, RouterOutlet } from '@angular/router';
import { EmployeeAccordionComponent } from './employee-accordion/employee-accordion.component';
import { DataService } from '../../service/data.service';
import { Subscription } from 'rxjs';
import { ApiServiceService } from '../../service/api-service.service';
import { Project } from '../../shared/models/project/project.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatSelectModule, RouterOutlet],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit, OnDestroy {
  dates: Date[] = [];
  dataService: DataService = inject(DataService);
  workSessions: WorkSession[] = [];
  projects: Project[] = [];
  workSessionsSub: Subscription = new Subscription();
  projectsSub: Subscription = new Subscription();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataService.updateData();
    this.workSessions = this.dataService.workSessions;
    this.projects = this.dataService.projects;
    this.getUniqueDates();

    this.workSessionsSub = this.dataService.updateWorkSessionsSubject.subscribe(
      (workSessions) => {
        this.workSessions = workSessions;
        this.getUniqueDates();
      },
    );

    this.projectsSub = this.dataService.updateProjectsSubject.subscribe(
      (projects) => {
        this.projects = projects;
      },
    );
  }

  getUniqueDates() {
    const uniqueDatesSet = new Set(
      this.workSessions.map((session) => session.date.toISOString()),
    );

    this.dates = Array.from(uniqueDatesSet).map(
      (dateString) => new Date(dateString),
    );
    this.dates.sort((a, b) => a.getTime() - b.getTime());
  }

  onChange(selectedDate: Date) {
    if (selectedDate === undefined) {
      this.router.navigate(['details']);
      return;
    }
    const routeParam: string = selectedDate.getTime().toString();
    this.router.navigate(['details', routeParam]);
  }

  onOutletLoaded(component: EmployeeAccordionComponent) {
    component.workSessions = this.workSessions;
    component.projects = this.projects;
  }

  ngOnDestroy(): void {
    this.workSessionsSub.unsubscribe();
    this.projectsSub.unsubscribe();
  }
}
