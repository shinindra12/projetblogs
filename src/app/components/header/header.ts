import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <h1 class="logo">
            <a routerLink="/">ProjetBlogs</a>
          </h1>
          <nav class="nav">
            <a routerLink="/" class="nav-link">Accueil</a>
            <a routerLink="/articles" class="nav-link">Articles</a>
            <a routerLink="/admin" class="nav-link">Admin</a>
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
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo a {
      color: white;
      text-decoration: none;
      font-size: 2rem;
      font-weight: bold;
    }
    .nav {
      display: flex;
      gap: 2rem;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .nav-link:hover {
      background-color: rgba(255,255,255,0.2);
    }
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
      }
      .nav {
        gap: 1rem;
      }
    }
  `]
})
export class Header { }
