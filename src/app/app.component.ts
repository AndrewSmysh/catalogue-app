import {Component, ViewChild} from '@angular/core';
import { CarListComponent } from './car-list/car-list.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(CarListComponent) carList!: CarListComponent;
  cars: any[] = [];
  title = 'catalogue-app';

  constructor() {
  }


  onFilterChanged(filters: any) {
    this.carList.applyFilters(filters);
  }



}
