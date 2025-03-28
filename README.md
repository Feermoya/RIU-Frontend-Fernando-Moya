# RIU-Frontend-FernandoMoya

### Challenge: Mantenimiento de Superhéroes

Esta aplicación SPA permite gestionar un listado de superhéroes con funcionalidades de alta, edición, búsqueda, borrado y paginación. Desarrollada en **Angular 17** siguiendo buenas prácticas, arquitectura limpia, uso de `signals`, `rxjs` y cobertura de tests del **85%+**.

---

### 🚀 Tecnologías
- Angular 17
- Angular Material
- RxJS / Signals
- Docker + Nginx
- GitHub Actions (pruebas + build)

---

### 📅 Requisitos
- Node.js v20+
- Angular CLI 17
- Docker (opcional, para correr en contenedor)

---

### 🔧 Instalación y Ejecución Local
```bash
npm install
ng serve
```

---

### 👀 Acceso Rápido
**GitHub:** [https://github.com/fmoya-laboral/RIU-Frontend-FernandoMoya](https://github.com/fmoya-laboral/RIU-Frontend-FernandoMoya)

---

### ⚙️ Comandos Disponibles
```bash
# Servidor local
ng serve

# Build productivo
ng build --configuration production

# Ejecutar tests unitarios
ng test --code-coverage

# Ver reporte de coverage
npx http-server coverage/ -o
```

---

### 🚧 Docker
```bash
# Build del contenedor
docker build -t riu-frontend .

# Levantar la app en localhost:4200
docker run -p 4200:80 riu-frontend
```

O bien con Docker Compose:
```bash
docker compose up --build
```

---

### 🌟 Autor
**Fernando Moya**

---

### 🔗 Recursos Relevantes
- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)
- [Docker](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)

---
