import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appMayusculas]',
  standalone: true,
})
export class MayusculasDirective {
  constructor(private control: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const upper = value.toUpperCase();
    this.control.control?.setValue(upper, { emitEvent: false });
  }
}
