import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <div class="container">
        <h2>Administration des articles</h2>

        <!-- Formulaire de création/modification -->
        <div class="admin-form">
          

          <form (ngSubmit)="onSubmit()" #articleForm="ngForm">
            <div class="form-group">
              <label>Titre *</label>
              <input type="text"
                     [(ngModel)]="currentArticle.titre"
                     name="titre"
                     class="form-control"
                     required
                     #titre="ngModel">
              <div *ngIf="titre.invalid && titre.touched" class="error">
                Le titre est requis
              </div>
            </div>

            <div class="form-group">
              <label>Contenu *</label>
              <textarea [(ngModel)]="currentArticle.contenu"
                        name="contenu"
                        class="form-control"
                        required
                        rows="6"
                        #contenu="ngModel"></textarea>
              <div *ngIf="contenu.invalid && contenu.touched" class="error">
                Le contenu est requis
              </div>
            </div>

            <div class="form-group">
              <label>Média (Image ou Vidéo)</label>
              <input type="file"
                     (change)="onFileSelected($event)"
                     accept="image/*,video/*"
                     class="form-control"
                     #fileInput>
              <small class="text-muted">Formats acceptés: JPG, PNG, GIF, MP4, AVI</small>
              <div *ngIf="selectedFile" class="file-info">
                Fichier sélectionné: {{ selectedFile.name }}
              </div>
            </div>

            <div class="form-actions">
              <button type="submit"
                      class="btn btn-primary"
                      [disabled]="!articleForm.form.valid">
                {{ editingArticle ? 'Modifier' : 'Créer' }}
              </button>
              <button type="button"
                      class="btn btn-secondary"
                      *ngIf="editingArticle"
                      (click)="cancelEdit()">
                Annuler
              </button>
            </div>
          </form>
        </div>

        <!-- Liste des articles existants -->
        <div class="articles-list">
          <h3>Articles existants</h3>

          <div *ngFor="let article of articles" class="admin-article-card">
            <div class="article-info">
              <h4>{{ article.titre }}</h4>
              <p class="article-excerpt">{{ article.contenu | slice:0:100 }}...</p>
              <p class="article-date">{{ article.dateCreation | date:'dd/MM/yyyy HH:mm' }}</p>
            </div>
            <div class="article-actions">
              <button class="btn btn-primary btn-sm" (click)="editArticle(article)">
                Modifier
              </button>
              <button class="btn btn-danger btn-sm" (click)="deleteArticle(article._id!)">
                Supprimer
              </button>
            </div>
          </div>

          <div *ngIf="articles.length === 0" class="no-articles">
            <p>Aucun article créé pour le moment.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      padding: 2rem 0;
      min-height: 80vh;
    }
    .admin-form {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
    }
    .form-control:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }
    textarea.form-control {
      min-height: 120px;
      resize: vertical;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }
    .btn-primary:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }
    .btn-secondary:hover {
      background-color: #545b62;
    }
    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
    .btn-danger:hover {
      background-color: #c82333;
    }
    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .text-muted {
      color: #6c757d;
      font-size: 0.875rem;
    }
    .file-info {
      background: #f8f9fa;
      padding: 0.5rem;
      border-radius: 4px;
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }
    .articles-list {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .admin-article-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      margin-bottom: 1rem;
      background: #f8f9fa;
    }
    .article-info h4 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }
    .article-excerpt {
      color: #666;
      margin: 0 0 0.5rem 0;
    }
    .article-date {
      color: #888;
      font-size: 0.875rem;
      margin: 0;
    }
    .article-actions {
      display: flex;
      gap: 0.5rem;
    }
    .no-articles {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
  `]
})
export class Admin implements OnInit {
  articles: Article[] = [];
  currentArticle: { titre: string; contenu: string; auteur: string } = {
    titre: '',
    contenu: '',
    auteur: 'Administrateur'
  };
  editingArticle: Article | null = null;
  selectedFile: File | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.apiService.getArticles().subscribe({
      next: (articles) => {
        this.articles = articles;
        console.log('Articles chargés:', articles);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des articles:', error);
        alert('Erreur lors du chargement des articles');
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Vérifier la taille du fichier (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. Taille maximum: 10MB');
        event.target.value = '';
        return;
      }

      // Vérifier le type de fichier
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi'];
      if (!allowedTypes.includes(file.type)) {
        alert('Type de fichier non supporté. Formats acceptés: JPG, PNG, GIF, MP4, AVI');
        event.target.value = '';
        return;
      }

      this.selectedFile = file;
      console.log('Fichier sélectionné:', file);
    }
  }

  onSubmit() {
    console.log('Soumission du formulaire...');

    if (!this.currentArticle.titre || !this.currentArticle.contenu) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const formData = new FormData();
    formData.append('titre', this.currentArticle.titre);
    formData.append('contenu', this.currentArticle.contenu);
    formData.append('auteur', this.currentArticle.auteur);

    if (this.selectedFile) {
      formData.append('media', this.selectedFile);
      console.log('Fichier ajouté au FormData:', this.selectedFile.name);
    }

    console.log('Données à envoyer:', {
      titre: this.currentArticle.titre,
      contenu: this.currentArticle.contenu,
      fichier: this.selectedFile?.name
    });

    if (this.editingArticle) {
      // Modification
      this.apiService.updateArticle(this.editingArticle._id!, formData).subscribe({
        next: (article) => {
          console.log('Article modifié:', article);
          this.loadArticles();
          this.resetForm();
          alert('Article modifié avec succès!');
        },
        error: (error) => {
          console.error('Erreur lors de la modification:', error);
          alert('Erreur lors de la modification de l\'article');
        }
      });
    } else {
      // Création
      this.apiService.createArticle(formData).subscribe({
        next: (article) => {
          console.log('Article créé:', article);
          this.loadArticles();
          this.resetForm();
          alert('Article créé avec succès!');
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          alert('Erreur lors de la création de l\'article: ' + error.message);
        }
      });
    }
  }

  editArticle(article: Article) {
    this.editingArticle = article;
    this.currentArticle = {
      titre: article.titre,
      contenu: article.contenu,
      auteur: article.auteur
    };
    this.selectedFile = null;
    console.log('Édition de l\'article:', article);
  }

  deleteArticle(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.apiService.deleteArticle(id).subscribe({
        next: () => {
          console.log('Article supprimé');
          this.loadArticles();
          alert('Article supprimé avec succès!');
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression de l\'article');
        }
      });
    }
  }

  cancelEdit() {
    this.editingArticle = null;
    this.resetForm();
  }

  resetForm() {
    this.currentArticle = {
      titre: '',
      contenu: '',
      auteur: 'Administrateur'
    };
    this.selectedFile = null;
    this.editingArticle = null;

    // Réinitialiser le champ fichier
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    console.log('Formulaire réinitialisé');
  }
}
