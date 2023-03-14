import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = "https://retoolapi.dev/Ljc0E8/data";

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Employee[]>(this.apiUrl);
  }

  delete(id: any){
    console.log("${this.apiUrl}/${id}: " + `${this.apiUrl}/${id}`);
    return this.http.delete<Employee>(`${this.apiUrl}/${id}`);
  }

  add(employee: any){
    return this.http.post<Employee>(this.apiUrl, employee);
  }

}
