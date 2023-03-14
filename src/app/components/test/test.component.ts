import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `<div class="{{label}}" style="color:{{color}}">Hello world</div>`,
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  @Input() color:string;
  @Input() label:string;
}
