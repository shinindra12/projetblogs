import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="articles-grid">
      <div *ngFor="let article of articles" class="article-card">
        <div class="article-media" *ngIf="article.media">
          <img *ngIf="article.typeMedia === 'image'"
               [src]="'http://localhost:3000' + article.media"
               [alt]="article.titre"
               class="media">
          <video *ngIf="article.typeMedia === 'video'"
                 controls
                 class="media">
            <source [src]="'http://localhost:3000' + article.media" type="video/mp4">
          </video>
        </div>
        <div class="article-content">
          <h3 class="article-title">{{ article.titre }}</h3>
          <p class="article-excerpt">{{ article.contenu | slice:0:150 }}...</p>
          <div class="article-meta">
            <span class="author">Par {{ article.auteur }}</span>
            <span class="date">{{ article.dateCreation | date:'dd/MM/yyyy' }}</span>
          </div>
          <a [routerLink]="['/article', article._id]" class="btn btn-primary read-more">
            Lire la suite
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
      padding: 2rem 0;
    }
    .article-card {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
    .article-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    }
    .article-media {
      height: 200px;
      overflow: hidden;
    }
    .media {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .article-content {
      padding: 1.5rem;
    }
    .article-title {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #333;
      line-height: 1.4;
    }
    .article-excerpt {
      color: #666;
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    .article-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      color: #888;
    }
    .read-more {
      width: 100%;
      text-align: center;
    }
  `]
})
export class ArticleList {
  @Input() articles: Article[] = [];
}
