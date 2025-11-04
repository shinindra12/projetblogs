import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <h1 class="logo">
            <a routerLink="/">ProjetBlogs</a>
          </h1>
          <nav class="nav">
            <a routerLink="/" class="nav-link" [class.active]="isActive('/')">Accueil</a>
            <a routerLink="/articles" class="nav-link" [class.active]="isActive('/articles')">Articles</a>
            <a routerLink="/admin" class="nav-link" [class.active]="isActive('/admin')">Admin</a>
            <button *ngIf="isLoggedIn()" (click)="logout()" class="nav-link logout-btn">
              <span class="logout-icon">🚪</span>
              Déconnexion
            </button>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo a {
      color: white;
      text-decoration: none;
      font-size: 1.8rem;
      font-weight: 800;
      background: linear-gradient(135deg, #fff, #f0f4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transition: all 0.3s ease;
    }
    .logo a:hover {
      transform: scale(1.05);
    }
    .nav {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      font-weight: 500;
      position: relative;
      overflow: hidden;
    }
    .nav-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    .nav-link:hover::before {
      left: 100%;
    }
    .nav-link:hover {
      background-color: rgba(255,255,255,0.15);
      transform: translateY(-2px);
    }
    .nav-link.active {
      background-color: rgba(255,255,255,0.2);
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .logout-btn {
      background: rgba(255, 255, 255, 0.15);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      font-weight: 500;
    }
    .logout-btn:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .logout-icon {
      font-size: 1rem;
    }
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
      }
      .nav {
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .nav-link {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
      }
      .logo a {
        font-size: 1.5rem;
      }
    }
    @media (max-width: 480px) {
      .nav {
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
      }
      .nav-link {
        width: 100%;
        text-align: center;
        padding: 0.75rem;
      }
      .logout-btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class Header {
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isActive(path: string): boolean {
    return window.location.pathname === path;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('rememberMe');
    // Rediriger vers la page de login
    window.location.href = '/login';
  }
}
