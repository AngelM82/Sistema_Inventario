# Registro de Productos e Inventario

Actividad de Coworking: Versión 3 (Formularios Reactivos en Angular) + Roles y Autenticación.

## Integrantes del Equipo
- Integrante 1
- Integrante 2
- Integrante 3
- Integrante 4 (Opcional)

## Descripción del Problema
Una tienda necesita registrar sus productos y controlar las existencias disponibles. Esta aplicación permite validar los datos ingresados, calcular valores del inventario e identificar de forma visual los productos con pocas existencias (stock bajo). Adicionalmente, cuenta con un sistema de **Roles (Encargado y Cliente)** donde el encargado gestiona el inventario completo y el cliente tiene acceso a una tienda en línea para realizar simulaciones de compra (disminuyendo stock).

## Instalación y Ejecución
1. Clonar el repositorio.
2. Ejecutar `pnpm install` o `npm install` para instalar las dependencias.
3. Ejecutar `pnpm start` o `npm start` para iniciar el servidor de desarrollo.
4. Navegar a `http://localhost:4200/`. Serás redirigido al login.

> **Nota:** Puedes iniciar sesión como administrador con `admin@tienda.com` (contraseña: `admin`) o crear una nueva cuenta.

## Distribución del Trabajo
- **Coordinador/a:** Encargado de la distribución de tareas, administrar la rama `develop` y verificar los requisitos.
- **Autenticación y Roles:** Configuración del Router de Angular, login y registro.
- **Formulario (Admin):** Construcción del `FormGroup`, campos, mensajes y validaciones.
- **Listado y Tienda (Cliente):** Implementación de la visualización, filtros, compras ficticias, y operaciones CRUD.
- **Diseño y Pruebas:** Estilos, casos de prueba, README y evidencias.

## Ramas Utilizadas (Git Flow)
- `main`
- `develop`
- `feature/autenticacion`
- `feature/formulario`
- `feature/listado`
- `feature/estilos-pruebas`

## Casos de Prueba Ejecutados
- Enviar el formulario vacío (muestra errores de campos obligatorios).
- Registrar un usuario exitosamente.
- Iniciar sesión como administrador (acceso a `/admin` y bloqueo a `/shop`).
- Iniciar sesión como cliente (acceso a `/shop` y bloqueo a `/admin`).
- Como administrador: registrar precios negativos, verificar alertas de stock mínimo.
- Como cliente: Realizar una compra ficticia (resta existencias) y comprobar que el botón se desactiva al llegar a 0.

## Dificultades Encontradas
(A completar por el equipo durante la presentación).
