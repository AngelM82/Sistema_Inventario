import { Component, OnInit } from '@angular/core';
import { Producto } from './models/producto.model';
import { InventarioService } from './services/inventario.service';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App implements OnInit {
  productos: Producto[] = [];
  productoEnEdicion: Producto | null = null;
  codigosExistentes: string[] = [];

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventarioService.productos$.subscribe(prods => {
      this.productos = prods;
      this.codigosExistentes = prods.map(p => p.codigo);
    });
  }

  manejarSubmit(producto: Producto) {
    if (this.productoEnEdicion) {
      this.inventarioService.actualizarProducto(this.productoEnEdicion.codigo, producto);
      this.productoEnEdicion = null;
    } else {
      this.inventarioService.agregarProducto(producto);
    }
  }

  iniciarEdicion(producto: Producto) {
    this.productoEnEdicion = { ...producto };
  }

  cancelarEdicion() {
    this.productoEnEdicion = null;
  }

  eliminarProducto(codigo: string) {
    this.inventarioService.eliminarProducto(codigo);
  }
}
