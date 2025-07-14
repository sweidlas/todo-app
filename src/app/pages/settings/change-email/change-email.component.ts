import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OverlayComponent } from 'src/app/shared/components/overlay/overlay.component';

@Component({
  selector: 'app-change-email',
  imports: [CommonModule, FormsModule, OverlayComponent],
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
})
export class ChangeEmailComponent {
  @Output() close = new EventEmitter<void>();
  @Output() emailChanged = new EventEmitter<{ email: string }>();

  email = '';

  isEmailValid(): boolean {
    return this.email !== '' && this.email.includes('@');
  }

  cancel() {
    this.email = '';
    this.close.emit();
  }

  submit() {
    if (this.isEmailValid()) {
      this.emailChanged.emit({
        email: this.email,
      });
      this.cancel();
    }
  }
}
