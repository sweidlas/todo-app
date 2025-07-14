import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OverlayComponent } from 'src/app/shared/components/overlay/overlay.component';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, FormsModule, OverlayComponent],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  @Output() close = new EventEmitter<void>();
  @Output() passwordChanged = new EventEmitter<{ oldPassword: string; newPassword: string }>();

  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  isPasswordValid(): boolean {
    return (
      this.oldPassword !== '' &&
      this.newPassword !== '' &&
      this.confirmPassword !== '' &&
      this.newPassword === this.confirmPassword
    );
  }

  cancel() {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.close.emit();
  }

  submit() {
    if (this.isPasswordValid()) {
      this.passwordChanged.emit({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      });
      this.cancel();
    }
  }
}
