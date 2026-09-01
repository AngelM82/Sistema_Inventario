import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss']
})
export class ProductoListComponent implements OnChanges {
  @Input() productos: Producto[] = [];
  @Output() onEdit = new EventEmitter<Producto>();
  @Output() onDelete = new EventEmitter<string>();

  productosFiltrados: Producto[] = [];
  categorias = ['Alimentos', 'Bebidas', 'Tecnología', 'Librería', 'Limpieza', 'Otros'];
  
  filtroTexto: string = '';
  filtroCategoria: string = '';

  // Sorting state
  sortColumn: keyof Producto | '' = '';
  sortAscending: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productos']) {
      this.aplicarFiltros();
    }
  }

  aplicarFiltros() {
    this.productosFiltrados = this.productos.filter(p => {
      const matchCategoria = this.filtroCategoria ? p.categoria === this.filtroCategoria : true;
      const term = this.filtroTexto.toLowerCase();
      const matchTexto = term ? p.codigo.toLowerCase().includes(term) || p.nombre.toLowerCase().includes(term) : true;
      return matchCategoria && matchTexto;
    });
    this.ordenarDatos();
  }

  ordenarPor(columna: keyof Producto) {
    if (this.sortColumn === columna) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = columna;
      this.sortAscending = true;
    }
    this.ordenarDatos();
  }

  ordenarDatos() {
    if (!this.sortColumn) return;

    this.productosFiltrados.sort((a, b) => {
      const valA = a[this.sortColumn as keyof Producto];
      const valB = b[this.sortColumn as keyof Producto];
      
      let comparacion = 0;
      if (valA! < valB!) comparacion = -1;
      if (valA! > valB!) comparacion = 1;

      return this.sortAscending ? comparacion : -comparacion;
    });
  }

  editar(producto: Producto) {
    this.onEdit.emit(producto);
  }

  eliminar(codigo: string) {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      this.onDelete.emit(codigo);
    }
  }

  get valorTotalInventario(): number {
    return this.productosFiltrados.reduce((total, p) => total + (p.precioCompra * p.existencias), 0);
  }

  calcularGanancia(producto: Producto): number {
    return producto.precioVenta - producto.precioCompra;
  }
}
