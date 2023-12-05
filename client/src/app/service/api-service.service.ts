import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  baseURL: string = 'https://localhost:7162';

  constructor(private httpClient: HttpClient) {}

  getWorkSessions(): Observable<any> {
    const url = `${this.baseURL}/api/Main/WorkSession`;
    return this.httpClient.get<any>(url);
  }

  getProjects(): Observable<any> {
    const url = `${this.baseURL}/api/Main/Project`;
    return this.httpClient.get<any>(url);
  }

  getEmployees(): Observable<any> {
    const url = `${this.baseURL}/api/Main/Employee`;
    return this.httpClient.get<any>(url);
  }

  getAll(): Observable<any> {
    const url = `${this.baseURL}/your-endpoint`;
    return this.httpClient.get<any>(url);
  }

  post(data: any): Observable<any> {
    const formData = new FormData();
    formData.append(`file`, data);

    const url = `${this.baseURL}/api/Main`;
    return this.httpClient.post<any>(url, formData);
  }

  put(id: number, data: any): Observable<any> {
    const url = `${this.baseURL}/your-endpoint/${id}`;
    return this.httpClient.put<any>(url, data);
  }

  delete(id: number): Observable<any> {
    const url = `${this.baseURL}/your-endpoint/${id}`;
    return this.httpClient.delete<any>(url);
  }

  deleteAll(): Observable<any> {
    const url = `${this.baseURL}/your-endpoint`;
    return this.httpClient.delete<any>(url);
  }

  //Ramane sa adaug
}
