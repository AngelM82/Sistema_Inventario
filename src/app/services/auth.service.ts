import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'tienda_usuarios';
  private readonly CURRENT_USER_KEY = 'tienda_current_user';
  
  private usuarios: Usuario[] = [];
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.cargarDatos();
  }

  private cargarDatos() {
    const usersData = localStorage.getItem(this.USERS_KEY);
    if (usersData) {
      this.usuarios = JSON.parse(usersData);
    } else {
      // Default admin user for convenience
      this.usuarios = [{
        email: 'admin@tienda.com',
        password: 'admin',
        rol: 'admin',
        nombre: 'Administrador Principal'
      }];
      this.guardarUsuarios();
    }

    const currentData = localStorage.getItem(this.CURRENT_USER_KEY);
    if (currentData) {
      this.currentUserSubject.next(JSON.parse(currentData));
    }
  }

  private guardarUsuarios() {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(this.usuarios));
  }

  get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  registrar(usuario: Usuario): boolean {
    const existe = this.usuarios.find(u => u.email === usuario.email);
    if (existe) {
      return false; // Usuario ya existe
    }
    
    this.usuarios.push(usuario);
    this.guardarUsuarios();
    return true;
  }

  login(email: string, password?: string): boolean {
    const usuario = this.usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
      // Don't store password in session
      const userSession: Usuario = { ...usuario };
      delete userSession.password;
      
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userSession));
      this.currentUserSubject.next(userSession);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  hasRole(rol: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.rol === rol : false;
  }
}
