import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Usuario } from './models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App implements OnInit {
  usuarioActual: Usuario | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.usuarioActual = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
