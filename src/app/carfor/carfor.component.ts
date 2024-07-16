import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarService } from '../car.service';
@Component({
  selector: 'app-carfor',
  templateUrl: './carfor.component.html',
  styleUrls: ['./carfor.component.css']
})
export class CarForComponent {
  car: any = {
    brand: '',
    model: '',
    manufacturer: '',
    color: '',
    transmission: '',
    drivetrain: '',
    engine: '',
    year: 0,
    price: 0
  };

  constructor(
    public dialogRef: MatDialogRef<CarForComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carService: CarService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // Ваш код для обробки даних форми
    // Додаємо новий автомобіль через сервіс
    this.carService.addCar(this.car);
    this.dialogRef.close(this.car);
  }
}
