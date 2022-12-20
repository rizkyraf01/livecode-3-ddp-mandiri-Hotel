import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiResponse } from 'src/app/shared/models/api-response.modul';
import Swal from 'sweetalert2';
import { LoginResponse } from '../../model/auth.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private storage: Storage = sessionStorage;
  showPassword: boolean = false;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void { }
  onShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
  onSubmit(): void {
    const payload = this.loginForm.value;
    this.authService.login(payload).subscribe({
      next: (token: LoginResponse | null) => {
        if (token) {
          this.route.queryParams.subscribe({
            next: (params: Params) => {
              const { next } = params;
              this.router.navigateByUrl('hotel/dashboard');
            },
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email atau Password salah!',
          });
        }
      },
    });
  }
  onLoggedIn(): boolean {
    return (sessionStorage.getItem('token') !== null)
  }
  private onSuccessLoggedIn(response: ApiResponse<LoginResponse>): void {
    const { accessToken } = response.data;
    this.storage.setItem('token', accessToken)
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        const { next } = params;
        this.router.navigateByUrl(next).finally();
      },
    });
  }
  private onErrorLoggedIn(errorResponse: HttpErrorResponse): void {
    if (errorResponse.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email atau Password salah!',
      });
    }
  }

  isFormValid(field: string): boolean {
    const control: AbstractControl = this.loginForm.get(
      field
    ) as AbstractControl;
    return control && control.invalid && (control.dirty || control.touched);
  }

}
