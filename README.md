# Registro de Productos e Inventario

Actividad de Coworking: Versión 3 (Formularios Reactivos en Angular).

## Integrantes del Equipo
- Integrante 1
- Integrante 2
- Integrante 3
- Integrante 4 (Opcional)

## Descripción del Problema
Una tienda necesita registrar sus productos y controlar las existencias disponibles. Esta aplicación permite validar los datos ingresados, calcular valores del inventario (como la ganancia por unidad y el valor total) e identificar de forma visual los productos con pocas existencias (stock bajo).

## Instalación y Ejecución
1. Clonar el repositorio.
2. Ejecutar `pnpm install` o `npm install` para instalar las dependencias.
3. Ejecutar `pnpm start` o `npm start` para iniciar el servidor de desarrollo.
4. Navegar a `http://localhost:4200/`.

## Distribución del Trabajo
- **Coordinador/a:** Encargado de la distribución de tareas, administrar la rama `develop` y verificar los requisitos.
- **Formulario:** Construcción del `FormGroup`, campos, mensajes y validaciones.
- **Listado:** Implementación de la visualización, búsqueda, edición y eliminación de productos.
- **Diseño y Pruebas:** Estilos, casos de prueba, README y evidencias.

## Ramas Utilizadas (Git Flow)
- `main`
- `develop`
- `feature/formulario`
- `feature/listado`
- `feature/estilos-pruebas`

## Casos de Prueba Ejecutados
- Enviar el formulario vacío (muestra errores de campos obligatorios).
- Registrar precios negativos (valida que deben ser > 0).
- Registrar precio de venta menor al precio de compra (valida la regla de negocio).
- Ingresar existencias negativas (valida >= 0).
- Repetir un código (muestra error de código duplicado).
- Comprobar la alerta de stock mínimo (cambia color de fila o texto si existencias <= stock mínimo).
- Verificar ganancia unitaria y valor total del inventario.
- Buscar, filtrar, editar y eliminar productos exitosamente.

## Dificultades Encontradas
(A completar por el equipo durante la presentación).
