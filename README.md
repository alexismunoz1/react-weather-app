# Weather App
Esta es una aplicación full client-side que permite visualizar el pronóstico climático actual de las coordenadas del usuario y de los próximos 5 días en la ubicación actual. Además, permite visualizar el pronóstico de otras 5 ciudades seleccionables. 

El proyecto se encuentra disponible en https://react-weather-app-beta-lilac.vercel.app/

Para obtener la información del clima se utilizó la API de openweathermap https://openweathermap.org/api. Para el manejo de las tecnologías, se utilizó Vite como empaquetador del proyecto, React, Typescript, Zustand para el manejo de estado, Axios y Tanstack/React-Query para fetchear y cachear la data, y Emotion para los componentes visuales.

La arquitectura del proyecto se basa en una arquitectura en capas, donde las capas son una separación arbitraria donde separamos nuestros componentes en grupos basados en cómo fluye la información.

## Cómo usar
Para utilizar el proyecto, es necesario seguir los siguientes pasos:

1. Instalar las dependencias del proyecto con `yarn` o `npm i`.
2. Ejecutar el proyecto con `yarn dev` o `npm run dev`.

## Características
* Muestra el pronóstico climático actual de las coordenadas del usuario y de los próximos 5 días en la ubicación actual.
* Permite visualizar el pronóstico de otras 5 ciudades seleccionables.
* Utiliza la API de openweathermap para obtener la información del clima.
* Cuenta con una arquitectura en capas que facilita la separación de componentes.