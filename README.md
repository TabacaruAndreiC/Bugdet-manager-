# Project Budget and Work Hours Management 

## Description

This project involves the development of a web application for project budget management and the calculation of work hours and salaries within an international company. The application allows the accountant to import employee work hours in the form of JSON files using a specified template. The goal is to facilitate the management of project budgets, visualize payments made, and those to be made in the future.

## Work Duration

The project was implemented within a two-week timeframe.

## Project Structure

### Front-end (Angular)
The front-end project was developed using the Angular framework and is structured into the following components:

- **details:** Component for displaying details about employee work hours and tasks.
  
- **Display-table:** Component responsible for displaying the table with project budgets, worked hours, and project status.

- **import:** Component dedicated to data import, where the accountant can upload files.

- **navbar:** Navigation component for easy access to various functionalities of the application.

- **projects:** Component for managing and viewing detailed information about company projects.

- **welcome:** Welcome and application presentation component.

### Back-end (C# API)
The server was developed using C# and APIs for data management. The project structure on the server includes:

- **Controllers:** Route management and interaction with the client application.
  
- **Data:** Includes classes for data manipulation, such as DbHelper, DTO (Data Transfer Objects), Entities (Employee, BaseEntity, Project, Task, WorkSesion), and repositories for database access.

- **Migration:** Using Entity Framework, this part of the project handles database migration and updates.

### Database (SQL Server Management Studio - SSMS)
Information about employees, work hours, projects, and tasks is stored in a database managed by SQL Server Management Studio.

## Pages and Functionalities

### Import Salaries Page

This page allows the accountant to upload Excel or JSON files with work hours to process salary payments. After uploading, the data is displayed in a table, and the accountant can initiate payment through a dedicated button.

### Budget/Project Page

On this page, the company's projects are displayed with details about their initial budget, current expenses, and remaining amount. For special projects, the number of completed tasks and the total estimated amount for these tasks are shown.

### Details Tasks/Employee Page

This page provides the accountant with the ability to view details about employee work hours and the tasks they have worked on within a specified timeframe. Information includes the day, employee name, hours worked, task name, and associated project. The task status, indicating whether it is completed or not, is also highlighted.

## Conclusion

This project provides a comprehensive and efficient solution for budget and work hour management within an international company. The user-friendly interface and well-defined functionalities make this application an essential tool for accountants in resource and salary management.
