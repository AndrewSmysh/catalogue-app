import {Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CarForComponent } from '../carfor/carfor.component';
import {MatDialog} from "@angular/material/dialog";
import { CarService } from '../car.service';
import {EditCarComponent} from "../edit-car/edit-car.component";
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  @Input() cars: any[] = [];

  displayedCars: any[] = [];
  isEditing = false;
  selectedCar: any[] = [];



  constructor(private http: HttpClient, private dialog: MatDialog, private carService: CarService) {
  }

  ngOnInit(): void {
    this.loadCarData();
  }

  /*loadCarData() {
    const jsonFilePath = 'assets/cars.json';
    this.http.get<any[]>(jsonFilePath).subscribe(
      (data) => {
        this.cars = data;
        this.displayedCars = [...this.cars];
      },
      (error) => {
        console.error('Error loading car data:', error);
      }
    );
  }*/
  loadCarData() {
    this.carService.getCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  applyFilters(filters: any) {
    let filteredCars = this.cars;

    if (filters.manufacturer) {
      filteredCars = filteredCars.filter(car => car.manufacturer === filters.manufacturer);
    }

    if (filters.price) {
      filteredCars = filteredCars.filter(car => car.price <= filters.price);
    }

    if (filters.sortField) {
      filteredCars.sort((a, b) => {
        if (a[filters.sortField] < b[filters.sortField]) return -1;
        if (a[filters.sortField] > b[filters.sortField]) return 1;
        return 0;
      });
    }
    this.displayedCars = filteredCars;
  }

  /* openDialog(): void {
     const dialogRef = this.dialog.open(CarForComponent, {
       width: '400px',
       data: {}
     });*/
  openAddCarDialog(): void {
    const dialogRef = this.dialog.open(CarForComponent, {
      width: '400px',
      data: null
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carService.addCar(result).subscribe(newCar => {
          this.cars.push(newCar);
        });
      }
    });
  }

  openEditCarDialog(car: any): void {
    const dialogRef = this.dialog.open(EditCarComponent, {
      width: '400px',
      data: { car }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}


