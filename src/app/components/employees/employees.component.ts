import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, AfterViewInit{

  
  resultEmployees: Employee[] = []; 

  displayedColumns: string[] = ['Nom', 'Prenom','Age','delete'];
  dataSource = new MatTableDataSource<Employee>(this.resultEmployees);
  sortedData: Employee[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  i = 0;

  constructor(private employeeService: EmployeeService, private _liveAnnouncer: LiveAnnouncer) { 
    this.sortedData = this.resultEmployees.slice();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addEmployee(newEmployee: Employee){
    this.resultEmployees.push(newEmployee); 
    this.ngAfterViewInit(); 
  }

  ngOnInit(): void {
    console.log("brgin ngOnInit");
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.findAll()
    .subscribe((employees)=> {
      this.dataSource.data = this.resultEmployees =  employees;
      //console.log(JSON.stringify(this.resultEmployees))
    })
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteEmployee(id: any){
    this.employeeService.delete(id)
    .subscribe(() => {
      this.resultEmployees = this.resultEmployees.filter(employee => employee.id != id);
      const itemIndex = this.dataSource.data.findIndex(obj => obj.id === id);
      this.dataSource.data.splice(itemIndex, 1);
      this.ngAfterViewInit();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  CalculateAge(birthdate:any):any{
    let bDate = new Date(birthdate);
    let timeDiff = Math.abs(Date.now() - bDate.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

}
