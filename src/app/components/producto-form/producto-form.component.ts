import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss']
})
export class ProductoFormComponent implements OnChanges {
  @Input() productoEdicion: Producto | null = null;
  @Input() codigosExistentes: string[] = [];
  @Output() onSubmitProducto = new EventEmitter<Producto>();
  @Output() onCancel = new EventEmitter<void>();

  productoForm: FormGroup;
  categorias = ['Alimentos', 'Bebidas', 'Tecnología', 'Librería', 'Limpieza', 'Otros'];

  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(4)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', Validators.required],
      precioCompra: [null, [Validators.required, Validators.min(0.01)]],
      precioVenta: [null, [Validators.required]],
      existencias: [null, [Validators.required, Validators.min(0)]],
      stockMinimo: [null, [Validators.required, Validators.min(1)]],
      proveedor: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      descripcion: ['', Validators.maxLength(250)],
      activo: [true]
    }, { validators: this.precioVentaMayorCompraValidator });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productoEdicion'] && this.productoEdicion) {
      this.productoForm.patchValue(this.productoEdicion);
      this.productoForm.get('codigo')?.disable(); // Disable code on edit
    } else if (changes['productoEdicion'] && !this.productoEdicion) {
      this.productoForm.reset({ activo: true });
      this.productoForm.get('codigo')?.enable();
    }
  }

  precioVentaMayorCompraValidator(group: AbstractControl): ValidationErrors | null {
    const compra = group.get('precioCompra')?.value;
    const venta = group.get('precioVenta')?.value;
    if (compra !== null && venta !== null && venta <= compra) {
      return { precioVentaInvalido: true };
    }
    return null;
  }

  get f() { return this.productoForm.controls; }

  get descripcionLength() {
    return this.productoForm.get('descripcion')?.value?.length || 0;
  }

  guardar() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const producto: Producto = this.productoForm.getRawValue();
    
    // Check duplicate code if not editing
    if (!this.productoEdicion && this.codigosExistentes.includes(producto.codigo)) {
      this.productoForm.get('codigo')?.setErrors({ duplicado: true });
      return;
    }

    this.onSubmitProducto.emit(producto);
    this.productoForm.reset({ activo: true });
    this.productoForm.get('codigo')?.enable();
  }

  cancelar() {
    this.productoForm.reset({ activo: true });
    this.productoForm.get('codigo')?.enable();
    this.onCancel.emit();
  }
}
