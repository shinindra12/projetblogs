import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Articles } from './pages/articles/articles';
import { ArticleDetail } from './components/article-detail/article-detail';
import { Admin } from './components/admin/admin';
import { Login } from './components/login/login';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'articles', component: Articles },
  { path: 'article/:id', component: ArticleDetail },
  { path: 'login', component: Login },
  {
    path: 'admin',
    component: Admin,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];
