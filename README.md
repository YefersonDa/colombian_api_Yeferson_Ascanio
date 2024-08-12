
# Dashboard API Colombia - [Yeferson Ascanio]

## Resumen

Este proyecto es un desafío técnico que consiste en la creación de un tablero utilizando datos de la [API Colombia](https://api-colombia.com/). El tablero visualiza información sobre Presidentes, Aeropuertos y Atracciones Turísticas, proporcionando diversas vistas y funcionalidades según los requisitos del desafío.

## Estructura del Proyecto

- **Frontend:** ReactJS
- **CSS:** Estilos personalizados sin utilizar frameworks externos de CSS
- **API:** [API Colombia](https://api-colombia.com/)

## Funcionalidades

1. **Obtención de Datos:**
   - Recupera datos de Presidentes, Aeropuertos y Atracciones Turísticas desde la API Colombia.

2. **Procesamiento de Datos:**
   - Los Presidentes se agrupan por partido político, ordenados por la cantidad de presidentes por partido.
   - Las Atracciones Turísticas se agrupan por departamento y ciudad, con conteos para cada grupo.
   - Los Aeropuertos se agrupan por región, departamento, ciudad y tipo, con conteos para cada grupo.

3. **Visualización:**
   - Un componente tipo Tab permite seleccionar entre las vistas de Presidentes, Aeropuertos y Atracciones Turísticas.
   - Cada vista muestra la cantidad de registros, todos los registros disponibles, los resultados de los agrupamientos solicitados y el tiempo de respuesta de la API.

## Cómo Ejecutar el Proyecto

### Requisitos

- Node.js instalado
- Git instalado

### Pasos para Ejecutar

1. Clona este repositorio:
   ```bash
   git clone https://github.com/YefersonDa/colombian_api_Yeferson_Ascanio
   cd colombian_api_Yeferson_Ascanio
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación:
   ```bash
   npm start
   ```

4. Abre tu navegador y visita `http://localhost:5173/colombia_dash` para ver el dashboard.

## Dockerización (Opcional)

1. **Construir y Ejecutar con Docker Compose:**
   - Asegúrate de tener Docker y Docker Compose instalados.
   - Ejecuta:
     ```bash
     docker-compose up --build
     ```
   - La aplicación estará disponible en `http://localhost:3000/colombia_dash`.

## Notas

Este proyecto es un reto de aprendizaje, donde lo más importante es el enfoque y dedicación para resolver los desafíos presentados. ¡Muchas gracias por la oportunidad de participar en este reto!
