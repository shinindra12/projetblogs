import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 ProjetBlogs. Tous droits réservés.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #343a40;
      color: white;
      text-align: center;
      padding: 2rem 0;
      margin-top: auto;
    }
  `]
})
export class Footer { }
