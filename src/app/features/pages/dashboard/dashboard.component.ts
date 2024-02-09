import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatChipSelectionChange, MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import {
  MatDialog
} from '@angular/material/dialog';
import { ModalDialogComponent } from '../../../shared/components/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  formTools!: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }

  public SUBTILE: string = "Seleccione la referencia que desea validar";

  public TWO_THREE_EIGHTHS: boolean = false;
  public TWO_SEVENT_EIGHTHS: boolean = false;
  public THREE_A_HALFT: boolean = false;
  public SHOW_FORM: boolean = false;

  ngOnInit(): void {
    this.formTools = this.formBuilder.group({
      fishingNeck: ['', [Validators.required, this.rangeDecimalsValidator(1.375, 1.378)]],
      noGo: ['', [Validators.required, this.rangeDecimalsValidator(1.852, 1.855)]],
      lockRingSegment: ['', [Validators.required, this.exactvalueValidator('014')]],
      equalizingMandrel: ['', [Validators.required, this.exactvalueValidator('011')]],
      ringPlug: ['', [Validators.required, this.exactvalueValidator('110')]]
    });
  }

  public rangeDecimalsValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (isNaN(value) || value < min || value > max) {
        return { 'rangeDecimals': { value: value } };
      }
      return null;
    };
  }

  public exactvalueValidator(exactValue: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value !== exactValue) {
        return { 'exactValue': { value: value } };
      }
      return null;
    };
  }

  public submitForm(): void {
    if (this.formTools.valid) {
      this.dialog.open(ModalDialogComponent);
    }
  }

  public optionSelectedFamily(event: MatChipSelectionChange) {
    if (event.selected) {
      switch (event.source.value) {
        case "TWO_THREE_EIGHTHS":
          this.TWO_THREE_EIGHTHS = true;
          this.TWO_SEVENT_EIGHTHS = false;
          this.THREE_A_HALFT = false;
          break;
        case "TWO_SEVENT_EIGHTHS":
          this.TWO_SEVENT_EIGHTHS = true;
          this.TWO_THREE_EIGHTHS = false;
          this.THREE_A_HALFT = false;
          break;
        case "THREE_A_HALFT":
          this.THREE_A_HALFT = true;
          this.TWO_THREE_EIGHTHS = false;
          this.TWO_SEVENT_EIGHTHS = false;
          break;
        default:
          this.TWO_THREE_EIGHTHS = false;
          this.TWO_SEVENT_EIGHTHS = false;
          this.THREE_A_HALFT = false;
          break;
      }
    }
  }

  public optionSelectedReference(): void {
    this.SHOW_FORM = true;
  }

  public clearForm(): void {
    this.formTools.reset();
  }
}
