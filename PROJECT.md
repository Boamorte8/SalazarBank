# Salazar Bank

Como en el documento de la prueba no se especificaba ningún nombre e tomé el derecho de nombrar la app como Salazar Bank.

El proyecto se construyó sobre las bases de Nodejs 12.X.X, Angular CLI 8.3.5 y Angular Material 8.X.X

## Angular Material y CSS

Se escogió angular material como framework CSS por la facilidad para integrarlo con Angular, ademas de la ventaja que tiene es que es modularizado. Entonces al compilar el proyecto este carga al bundle final solo los módulos utilizados y no toda la librería completa.

Se creó una carpeta styles donde van algunos de los archivos de la arquitectura CSS llamada ITCSS. Aunque en este caso solo se utilizó 2 archivos, en proyectos mas grandes se puede necesitar la estructura completa. Estos archivos se configuran en el angular.json para que angular los tome en el momento de compilar.

## Environments

Aqui se colocaron algunas variables que en un proyecto real dependen del ambiente.

En un proyecto real faltaría agregar y configurar el proyecto para soportar ambiente de pruebas u otros ambientes si existieran, por solo sería agregar otro environment.ts por cada ambiente nuevo y agregar la configuración en el archivo angular.json

## Modules y lazy loading

El proyecto se dividió en 2 módulos con 2 propósitos. El primero es organización, aunque este proyecto solo tiene una HU, en un proyecto mas grande se hace muy importante una forma de organizar el proyecto, esto hace mas facil que escale y además el mantenimiento.

El segundo propósito es para poder utilizar la estrategía de lazy loading - preload que se trata de que el contenido solo se va a cargar cuando se necesite, pero cuando haya recursos disponible va a precargar el contenido para que cuando sea necesito la carga sea mas rápida.

### Shared

En este módulo se encuentra todo lo que se reutiliza entre módulos como providers, operators, interfaces, servicios y componentes.

#### Interfaces

En este proyecto tenemos 3 interfaces aunque se utilizan para el tipado

#### Operadores

En este proyecto se utiliza un custom operator y es para poder agregar la opción de retry a las peticiones HTTP. Esto significa que cuando la petición falle, esta se vuelva a hacer la petición hasta que responda o se acaben las veces de repetición que se configuren

#### Providers

En este caso son servicios de cosas que se utilizan dentro de la app. En este caso utilizamos un servicio para mostrar el loading, otro para los modales básicos como errores o de información básica. Y tambien tenemos para hacer peticiones HTTP aunque se utiliza HTTP Client de Angular, se le agregan algunas cosas por defecto como el manejo de errores, tambien se le agrega un timeout por defecto, pero que es editable.

#### Components

En esta carpeta se encuentran algunos componentes básicos y generales como el loading, los modales básicos

### Register

En esta parte están todas las partes que son únicas de este módulo y de la HU de Registro de usuario. Aqui encontramos la página, el nombramiento de estos archivos se copió de Ionic para que fuera mas explicativo. En la página normalmente se llena con los componentes, en este caso como era un componente simple se dejó todo en la misma página. Aqui encontramos un componente de este módulo y es para el modal de confirmación de registro.
