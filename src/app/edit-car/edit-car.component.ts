import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarService } from '../car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent {

  // @ts-ignore
  carForm: FormGroup;
  // @ts-ignore
  model: string;

  constructor(
    public dialogRef: MatDialogRef<EditCarComponent>,
    private fb: FormBuilder,
    private carService: CarService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm(): void {
    this.carForm = this.fb.group({
      brand: [this.data.car.brand, Validators.required],
      model: [this.data.car.model, Validators.required],
      year: [this.data.car.year, Validators.required],
      transmission: [this.data.car.transmission],
      drivetrain: [this.data.car.drivetrain],
      engine: [this.data.car.engine],
      color: [this.data.car.color],
      price: [this.data.car.price]
    });
  }

  /*onEditClick(): void {
    const updatedCar = this.carForm.value;
    this.carService.updateCar(this.data.car.id, updatedCar).subscribe(
      () => {
        console.log('Car updated successfully');
        this.dialogRef.close();
      },
      (error) => {
        console.error('Failed to update car', error);
      }
    );
  }*/

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onEditClick(): void {
    const updatedCar = this.carForm.value;
    const model = updatedCar.model;
    this.carService.updateCar(model, updatedCar).subscribe(
      () => {
        this.dialogRef.close();
      },
      error => {
        console.error('Failed to update car:', error);
      }
    );
  }

  onSaveClick(): void {

  }

  onDeleteClick(model: string) {
    this.carService.deleteCar(model).subscribe(
      (response) => {
      },
      (error) => {
        console.error('Failed to delete car', error);
      }
    );
  }
}
