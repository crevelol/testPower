import { Component, EventEmitter, forwardRef, Input, output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-styled-input',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './styled-input.component.html',
  styleUrl: './styled-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StyledInputComponent),
      multi: true,
    },
  ],
})
export class StyledInputComponent implements ControlValueAccessor{
  @Input() tipo: string = 'text'; 
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() name: string = 'default';
  @Input() disabled: boolean = false; 
  @Input() required: boolean = false;
  @Input() formControlName: string = "";
  @Input() dynamicClasses!: { [key: string]: boolean };

  searchChange = output<string>();

  updateValue(newValue: string) {
    this.searchChange.emit(newValue); // Enviar cambios al padre
  }

  value: any = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.updateValue(this.value);
    this.onTouched();
  }
}
