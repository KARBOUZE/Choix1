import { Component, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  @Output() newItemEvent = new EventEmitter<Employee>();

  myEmployee: Employee={
    Nom: '',
    Prenom: '',
    Entreprise: '',
    DatedeNaissance: ''
  }

  showForm = false;
  editForm = false;

  constructor(private employeeService: EmployeeService) { 
  }

  addEmployee(){
    this.employeeService.add(this.myEmployee)
    .subscribe((employee) => {
      this.newItemEvent.emit(employee);
    }); 
    this.resetEmployee();
    this.showForm = false;
  }

  resetEmployee(){
    this.myEmployee={
      Nom: '',
      Prenom: '',
      Entreprise: '',
      DatedeNaissance: ''
    }
  }

}
