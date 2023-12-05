import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ImportComponent } from './components/import/import.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DetailsComponent } from './components/details/details.component';
import { EmployeeAccordionComponent } from './components/details/employee-accordion/employee-accordion.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    title: 'Budget Manager',
  },
  {
    path: 'import',
    component: ImportComponent,
    title: 'Import - Budget Manager',
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    title: 'Projects - Budget Manager',
  },
  {
    path: 'details',
    component: DetailsComponent,
    children: [
      {
        path: ':id',
        component: EmployeeAccordionComponent,
      },
    ],
    title: 'Details - Budget Manager',
  },
];
