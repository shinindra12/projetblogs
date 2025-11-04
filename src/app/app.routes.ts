import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Articles } from './pages/articles/articles';
import { ArticleDetail } from './components/article-detail/article-detail';
import { Admin } from './components/admin/admin';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'articles', component: Articles },
  { path: 'article/:id', component: ArticleDetail },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: '' }
];
