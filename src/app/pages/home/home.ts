import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { Article } from '../../interfaces/article';
import { ArticleList } from '../../components/article-list/article-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ArticleList],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">Bienvenue sur ProjetBlogs</h1>
            <p class="hero-subtitle">Découvrez les dernières actualités et informations</p>
            <a routerLink="/articles" class="btn btn-primary hero-cta">
              Voir tous les articles
            </a>
          </div>
        </div>
      </section>

      <!-- Derniers articles -->
      <section class="latest-articles">
        <div class="container">
          <h2>Derniers articles</h2>
          <app-article-list [articles]="latestArticles"></app-article-list>

          <div class="view-all" *ngIf="articles.length > 3">
            <a routerLink="/articles" class="btn btn-primary">
              Voir tous les articles ({{ articles.length }})
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6rem 0;
      text-align: center;
    }
    .hero-title {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      font-weight: bold;
    }
    .hero-subtitle {
      font-size: 1.3rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    .hero-cta {
      font-size: 1.1rem;
      padding: 12px 30px;
    }
    .latest-articles {
      padding: 4rem 0;
    }
    .latest-articles h2 {
      text-align: center;
      margin-bottom: 3rem;
      font-size: 2.5rem;
      color: #333;
    }
    .view-all {
      text-align: center;
      margin-top: 3rem;
    }
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      .hero-subtitle {
        font-size: 1.1rem;
      }
    }
  `]
})
export class Home implements OnInit {
  articles: Article[] = [];

  get latestArticles(): Article[] {
    return this.articles.slice(0, 3);
  }

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }
}
