import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() filterChanged = new EventEmitter<any>();
  selectedManufacturer: string = '';
  selectedYear: number = 0;
  selectedColor: string = '';
  selectedEngine: string = '';
  selectedPrice: number = 0;
  selectedField: string = '';

  constructor( ) {
  }
  sortCars() {
    const filters = {
      manufacturer: this.selectedManufacturer,
      price: this.selectedPrice,
      sortField: this.selectedField
    };

    this.filterChanged.emit(filters);
  }
}
