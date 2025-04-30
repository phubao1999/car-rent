import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AdminAuthService } from './admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule],
  providers: [AdminAuthService],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form with validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email is required and must be a valid email
      password: ['', Validators.required], // Password is required
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      this.adminAuthService.login(this.loginForm.value).subscribe((res) => {
        localStorage.setItem('token', res.token);
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        });
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
