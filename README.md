# Slack Clone - Frontend

Este proyecto es el Frontend para una aplicación clon de Slack, desarrollado con React y Vite. Ofrece una interfaz moderna, dinámica y responsiva para la mensajería, permitiendo a los usuarios interactuar con espacios de trabajo, canales y otros miembros de manera eficiente.

## ¿Qué hace?
La interfaz de usuario permite:
- **Autenticación Completa:** Registro de usuarios, inicio de sesión, verificación de email y recuperación de contraseña.
- **Gestión de Workspaces:** Visualización de espacios de trabajo a los que pertenece el usuario y creación de nuevos espacios.
- **Navegación Dinámica:** Cambio fluido entre canales y espacios de trabajo.
- **Chat:** Envío y recepción de mensajes dentro de canales específicos con scroll automático a los últimos mensajes.
- **Administración de Miembros:** Los dueños y administradores pueden invitar a nuevos miembros, modificar roles o eliminarlos.
- **Diseño Responsivo:** Adaptado para una visualización óptima tanto en dispositivos de escritorio como en móviles (320px a 2000px).

## Tecnologías Utilizadas
- **React:** Biblioteca principal para la interfaz.
- **Vite:** Herramienta de construcción y servidor de desarrollo rápido.
- **React Router DOM:** Gestión de la navegación y rutas.
- **Context API:** Manejo del estado global (Autenticación y Workspaces).
- **CSS Vanilla & Variables:** Diseño estético con un sistema de tokens consistente y soporte para micro-animaciones.
- **JWT (JSON Web Tokens):** Manejo de sesiones seguras.

---

## Estructura del Proyecto

El código fuente se organiza de la siguiente manera dentro de `src/`:

- **`Screens/`**: Contiene los componentes de página principal (ej: `WorkspaceScreen`, `LogInScreen`, `RegisterScreen`).
- **`components/`**: Componentes reutilizables de la interfaz (botones, inputs, modales, etc.).
- **`context/`**: Proveedores de estado global para autenticación y datos del espacio de trabajo.
- **`services/`**: Funciones encargadas de las peticiones a la API del Backend.
- **`hooks/`**: Lógica de React personalizada para simplificar componentes.
- **`constants/`**: Valores constantes como rutas de API o roles de usuario.
- **`validations/`**: Lógica para la validación de formularios.

---

## Pantallas Principales

1. **LogIn / Register:** Acceso y creación de cuentas.
2. **HomePage:** Vista inicial con la lista de espacios de trabajo activos del usuario.
3. **CreateWorkspace:** Formulario para configurar un nuevo entorno de trabajo.
4. **WorkspaceScreen:** El centro de la aplicación, donde se listan los canales y miembros.
5. **ChannelScreen:** Vista del chat específico de un canal con el historial de mensajes.
6. **ResponseToInvitation:** Pantalla dedicada para que los nuevos usuarios acepten o rechacen invitaciones.

---

## Instalación y Ejecución

Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/nunezjorgepy/slack_UTN_frontend.git
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz con la URL de tu API:
   ```env
   VITE_API_URL=http://localhost:8080
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

---

## Características de Diseño
El proyecto prioriza una **estética premium**:
- **Micro-animaciones:** Transiciones suaves en hovers y cambios de estado.
- **Sistema de Colores:** Uso de variables CSS para mantener la consistencia visual.
- **Responsividad:** Implementación de media queries para asegurar que la experiencia sea fluida en cualquier tamaño de pantalla, especialmente en el manejo de barras laterales y modales.
