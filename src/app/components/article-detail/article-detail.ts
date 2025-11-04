import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="article-detail" *ngIf="article">
      <div class="container">
        <a routerLink="/articles" class="back-link">← Retour aux articles</a>

        <article class="article-full">
          <h1 class="article-title">{{ article.titre }}</h1>

          <div class="article-meta">
            <span class="author">Par {{ article.auteur }}</span>
            <span class="date">Publié le {{ article.dateCreation | date:'dd/MM/yyyy à HH:mm' }}</span>
          </div>

          <div class="article-media" *ngIf="article.media">
            <img *ngIf="article.typeMedia === 'image'"
                 [src]="'http://localhost:3000' + article.media"
                 [alt]="article.titre"
                 class="media-full">
            <video *ngIf="article.typeMedia === 'video'"
                   controls
                   class="media-full">
              <source [src]="'http://localhost:3000' + article.media" type="video/mp4">
            </video>
          </div>

          <div class="article-content">
            <p>{{ article.contenu }}</p>
          </div>
        </article>
      </div>
    </div>

    <div *ngIf="!article" class="loading">
      <p>Chargement...</p>
    </div>
  `,
  styles: [`
    .article-detail {
      padding: 2rem 0;
    }
    .back-link {
      color: #007bff;
      text-decoration: none;
      margin-bottom: 2rem;
      display: inline-block;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    .article-full {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    .article-title {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #333;
      line-height: 1.2;
    }
    .article-meta {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
      color: #666;
    }
    .article-media {
      margin-bottom: 2rem;
      border-radius: 10px;
      overflow: hidden;
    }
    .media-full {
      width: 100%;
      max-height: 500px;
      object-fit: cover;
    }
    .article-content {
      line-height: 1.8;
      font-size: 1.1rem;
      color: #444;
    }
    .article-content p {
      margin-bottom: 1.5rem;
    }
    .loading {
      text-align: center;
      padding: 4rem;
      font-size: 1.2rem;
      color: #666;
    }
  `]
})
export class ArticleDetail implements OnInit {
  article?: Article;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getArticle(id).subscribe(article => {
        this.article = article;
      });
    }
  }
}
