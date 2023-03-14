import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Choix1';
  faCoffee = faCoffee;

  interval$ : Observable<number>;

  ngOnInit() {
    this.interval$ = interval(1000);
  // const interval$ = interval(1000);
  //   interval$.subscribe(value => console.log(value));
  //   setTimeout(() => {
  //     interval$.subscribe(value => console.log(value));
  // }, 3000);
  }

}
