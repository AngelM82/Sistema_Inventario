import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private STORAGE_KEY = 'inventario_productos';
  private productos: Producto[] = [];
  private productosSubject = new BehaviorSubject<Producto[]>([]);

  productos$ = this.productosSubject.asObservable();

  constructor() {
    this.cargarLocalStorage();
  }

  private cargarLocalStorage() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.productos = JSON.parse(data);
      this.productosSubject.next([...this.productos]);
    }
  }

  private guardarLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.productos));
    this.productosSubject.next([...this.productos]);
  }

  agregarProducto(producto: Producto) {
    this.productos.push(producto);
    this.guardarLocalStorage();
  }

  actualizarProducto(codigoOriginal: string, productoActualizado: Producto) {
    const index = this.productos.findIndex(p => p.codigo === codigoOriginal);
    if (index !== -1) {
      this.productos[index] = productoActualizado;
      this.guardarLocalStorage();
    }
  }

  eliminarProducto(codigo: string) {
    this.productos = this.productos.filter(p => p.codigo !== codigo);
    this.guardarLocalStorage();
  }

  codigoExiste(codigo: string): boolean {
    return this.productos.some(p => p.codigo === codigo);
  }

  getProductos(): Producto[] {
    return [...this.productos];
  }
}
