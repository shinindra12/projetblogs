import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles`).pipe(
      catchError(this.handleError)
    );
  }

  getArticle(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/articles/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createArticle(article: FormData): Observable<Article> {
    console.log('Envoi de la requête POST vers:', `${this.apiUrl}/articles`);
    return this.http.post<Article>(`${this.apiUrl}/articles`, article).pipe(
      catchError(this.handleError)
    );
  }

  updateArticle(id: string, article: FormData): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/articles/${id}`, article).pipe(
      catchError(this.handleError)
    );
  }

  deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/articles/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erreur API:', error);

    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Erreur ${error.status}: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage += ` - ${error.error.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
