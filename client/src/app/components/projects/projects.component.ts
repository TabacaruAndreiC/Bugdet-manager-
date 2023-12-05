import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../shared/models/project/project.model';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { DataService } from '../../service/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  dataService: DataService = inject(DataService);
  projects: Project[] = [];
  // icons: string[] = [
  //   'pie_chart',
  //   'show_chart',
  //   'insert_chart',
  //   'business_center',
  //   'table_chart',
  //   'bar_chart',
  //   'multiline_chart',
  // ];
  // usedIcons: string[] = [];
  projectsSubscription: Subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.dataService.updateData();
    this.projects = this.dataService.projects;

    this.projectsSubscription =
      this.dataService.updateProjectsSubject.subscribe((projects) => {
        this.projects = projects;
      });
  }

  // getRandomIcon(): string {
  //   const randomIndex: number = Math.floor(Math.random() * this.icons.length);
  //   const randomIcon: string = this.icons[randomIndex];

  //   this.usedIcons.push(randomIcon);
  //   // Remove used icons so there are no repeats unless necessary
  //   if (this.icons.length !== 1) {
  //     this.icons.splice(randomIndex, 1);
  //   } else {
  //     this.icons = this.usedIcons.slice();
  //     this.usedIcons = [];
  //   }

  //   return randomIcon;
  // }

  // getTasksCompletedCount(project: Project): number {
  //   return project.taskList.reduce((accumulator, task) => {
  //     return accumulator + (task.isFinished ? 1 : 0);
  //   }, 0);
  // }

  // getTotalHoursWorked(project: Project): number {
  //   return project.taskList.reduce((accumulator, task) => {
  //     return accumulator + (task.isFinished ? task.totalHours : 0);
  //   }, 0);
  // }

  ngOnDestroy(): void {
    this.projectsSubscription.unsubscribe();
  }
}
