import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-client-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-shop.component.html',
  styleUrls: ['./client-shop.component.scss']
})
export class ClientShopComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventarioService.productos$.subscribe(prods => {
      // Clientes solo ven productos activos
      this.productos = prods.filter(p => p.activo);
    });
  }

  comprar(producto: Producto) {
    if (producto.existencias > 0) {
      const productoActualizado = { ...producto, existencias: producto.existencias - 1 };
      this.inventarioService.actualizarProducto(producto.codigo, productoActualizado);
      alert(`¡Compra exitosa! Has comprado: ${producto.nombre}`);
    } else {
      alert(`Lo sentimos, no hay existencias de ${producto.nombre}`);
    }
  }
}
