import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

interface AuthResponse {
  success: boolean;
  error: ErrorCode;
  message?: string;
  token?: string;
}

enum ErrorCode {
  USER_EMAIL_EXISTS = 'USER_EMAIL_EXISTS',
  USER_NAME_EXISTS = 'USER_NAME_EXISTS',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
}

type AuthMode = 'login' | 'signup' | 'verify';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  // API base URL - update this to match your backend
  private readonly API_BASE_URL = `${environment.apiUrl}/auth`;

  currentMode: AuthMode = 'login';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  userEmail = ''; // Store email for verification step

  loginForm: FormGroup;
  signupForm: FormGroup;
  verifyForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.verifyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {
    // Check the current route path
    this.route.url.subscribe((segments) => {
      const fullPath = segments.map((s) => s.path).join('/');
      if (fullPath.includes('login')) this.setMode('login');
      if (fullPath.includes('signup')) this.setMode('signup');
      if (fullPath.includes('verify')) this.setMode('verify');
    });
  }

  setMode(mode: AuthMode) {
    this.currentMode = mode;
    this.clearMessages();

    // Pre-fill email in verify form if coming from signup
    if (mode === 'verify' && this.userEmail) {
      this.verifyForm.patchValue({ email: this.userEmail });
    }
  }

  switchMode(mode: AuthMode) {
    this.router.navigate(['auth', mode]);
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.http.post<any>(`${this.API_BASE_URL}/login`, loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.token) {
          this.authService.setToken(response.token);
          this.authService.login(response.user);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Login failed';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.error || 'Login failed. Please try again.';
      },
    });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      this.markFormGroupTouched(this.signupForm);
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    const signupData = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    this.http.post<AuthResponse>(`${this.API_BASE_URL}/signup`, signupData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('signup ', response);
        this.userEmail = signupData.email;
        this.successMessage = 'Account created! Please check your email for verification code.';
        setTimeout(() => {
          this.switchMode('verify');
        }, 1000);
      },
      error: (error) => {
        this.isLoading = false;
        console.log('response.error ', error.error);
        this.errorMessage = error.error?.error || 'Signup failed. Please try again.';
      },
    });
  }

  onVerify() {
    if (this.verifyForm.invalid) {
      this.markFormGroupTouched(this.verifyForm);
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    const verifyData = {
      email: this.verifyForm.value.email,
      verificationCode: this.verifyForm.value.verificationCode,
    };

    this.http.post<AuthResponse>(`${this.API_BASE_URL}/verify`, verifyData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Email verified successfully! You can now login.';
        setTimeout(() => {
          this.switchMode('login');
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.error || 'Verification failed. Please try again.';
      },
    });
  }

  onResendCode() {
    const email = this.verifyForm.value.email;
    if (!email) {
      this.errorMessage = 'Please enter your email address';
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    this.http.post<AuthResponse>(`${this.API_BASE_URL}/resend`, { email }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Verification code resent! Please check your email.';
        console.log('response', response);
      },
      error: (error) => {
        this.isLoading = false;
        console.log('error', error.error?.error);
        this.errorMessage = error.error?.error || 'Failed to resend code. Please try again.';
      },
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  private clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength'])
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }
}
