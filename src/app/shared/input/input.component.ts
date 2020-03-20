import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() inputType: string;
  @Input() controlType = 'input';
  @Input() required: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  public get isInvalid(): boolean {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && !!errors;
  }
}
