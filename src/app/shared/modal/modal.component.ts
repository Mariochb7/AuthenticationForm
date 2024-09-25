import {
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Output() dismiss = new EventEmitter();

  constructor(private el: ElementRef) {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.el.nativeElement.remove();
  }

  onDismissClick() {
    this.dismiss.emit();
  }
}
