import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // IMPORTANT
import { ApiService } from '../../services/api';
import { Article } from '../../interfaces/article';
import { ArticleList } from '../../components/article-list/article-list';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, ArticleList], // AJOUTER CommonModule
  template: `
    <div class="articles-page">
      <div class="container">
        <div class="page-header">
          <h1>Tous les articles</h1>
          <p>Découvrez notre collection complète d'articles informatifs</p>
        </div>

        <app-article-list [articles]="articles"></app-article-list>

        <div class="no-articles" *ngIf="articles.length === 0">
          <p>Aucun article disponible pour le moment.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .articles-page {
      padding: 2rem 0;
    }
    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .page-header h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1rem;
    }
    .page-header p {
      font-size: 1.2rem;
      color: #666;
    }
    .no-articles {
      text-align: center;
      padding: 4rem;
      color: #666;
      font-size: 1.1rem;
    }
  `]
})
export class Articles implements OnInit {
  articles: Article[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }
}
