import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-background">
        <div class="login-card">
          <div class="login-header">
            <h1 class="login-title">Connexion Admin</h1>
            <p class="login-subtitle">Accédez à l'administration du blog</p>
          </div>

          <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="login-form">
            <div class="form-group">
              <label for="username" class="form-label">
                <i class="icon">👤</i>
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                [(ngModel)]="credentials.username"
                name="username"
                class="form-control"
                placeholder="Entrez votre nom d'utilisateur"
                required
                #username="ngModel"
                [class.error]="username.invalid && username.touched">
              <div *ngIf="username.invalid && username.touched" class="error-message">
                Le nom d'utilisateur est requis
              </div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label">
                <i class="icon">🔒</i>
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                [(ngModel)]="credentials.password"
                name="password"
                class="form-control"
                placeholder="Entrez votre mot de passe"
                required
                #password="ngModel"
                [class.error]="password.invalid && password.touched">
              <div *ngIf="password.invalid && password.touched" class="error-message">
                Le mot de passe est requis
              </div>
            </div>

            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe">
                <span class="checkmark"></span>
                Se souvenir de moi
              </label>
              <a href="#" class="forgot-password">Mot de passe oublié ?</a>
            </div>

            <button
              type="submit"
              class="login-btn"
              [disabled]="!loginForm.form.valid || isLoading">
              <span *ngIf="!isLoading">Se connecter</span>
              <div *ngIf="isLoading" class="loading-spinner"></div>
            </button>

            <div *ngIf="errorMessage" class="error-banner">
              <i class="error-icon">⚠️</i>
              {{ errorMessage }}
            </div>
          </form>

          <div class="login-footer">
            <p>Application sécurisée • ProjetBlogs</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }

    .login-container::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background:
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    .login-background {
      width: 100%;
      max-width: 440px;
      position: relative;
      z-index: 2;
    }

    .login-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 3rem 2rem;
      box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      animation: slideUp 0.6s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .login-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .login-title {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }

    .login-subtitle {
      color: #6b7280;
      font-size: 1rem;
      margin: 0;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .icon {
      font-size: 1rem;
    }

    .form-control {
      padding: 1rem 1.25rem;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #ffffff;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      transform: translateY(-1px);
    }

    .form-control.error {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #6b7280;
      cursor: pointer;
    }

    .checkbox-label input[type="checkbox"] {
      display: none;
    }

    .checkmark {
      width: 18px;
      height: 18px;
      border: 2px solid #d1d5db;
      border-radius: 4px;
      position: relative;
      transition: all 0.3s ease;
    }

    .checkbox-label input[type="checkbox"]:checked + .checkmark {
      background: #667eea;
      border-color: #667eea;
    }

    .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
      content: '✓';
      position: absolute;
      color: white;
      font-size: 12px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .forgot-password {
      color: #667eea;
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.3s ease;
    }

    .forgot-password:hover {
      color: #5a6fd8;
      text-decoration: underline;
    }

    .login-btn {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .login-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .login-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid transparent;
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-banner {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 1rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    .error-icon {
      font-size: 1rem;
    }

    .login-footer {
      text-align: center;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .login-footer p {
      color: #9ca3af;
      font-size: 0.875rem;
      margin: 0;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .login-container {
        padding: 1rem;
      }

      .login-card {
        padding: 2rem 1.5rem;
        margin: 1rem;
      }

      .login-title {
        font-size: 1.75rem;
      }

      .form-options {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }

      .forgot-password {
        align-self: flex-end;
      }
    }

    @media (max-width: 480px) {
      .login-card {
        padding: 1.5rem 1rem;
      }

      .login-title {
        font-size: 1.5rem;
      }

      .form-control {
        padding: 0.875rem 1rem;
      }

      .login-btn {
        padding: 0.875rem 1.5rem;
      }
    }

    @media (max-width: 360px) {
      .login-container {
        padding: 0.5rem;
      }

      .login-card {
        padding: 1.5rem 1rem;
        border-radius: 16px;
      }
    }
  `]
})
export class Login {
  credentials = {
    username: '',
    password: ''
  };
  rememberMe = false;
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    // Simulation de vérification (à remplacer par une vraie API)
    setTimeout(() => {
      if (this.credentials.username === 'admin' && this.credentials.password === 'admin123') {
        // Connexion réussie
        localStorage.setItem('isLoggedIn', 'true');
        if (this.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        this.router.navigate(['/admin']);
      } else {
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
      }
      this.isLoading = false;
    }, 1500);
  }
}
