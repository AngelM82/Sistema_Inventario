import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoFormComponent } from '../producto-form/producto-form.component';
import { ProductoListComponent } from '../producto-list/producto-list.component';
import { Producto } from '../../models/producto.model';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ProductoFormComponent, ProductoListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
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
