import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Output() dismiss = new EventEmitter<void>();

  constructor(private el: ElementRef) { }

  public ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  public ngOnDestroy(): void {
    this.el.nativeElement.remove();
  }

  onDismiss() {
    this.dismiss.emit();
  }
}
