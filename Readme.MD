# TP de Diseño de Aplicaciones Multiplataforma
Autor: Martin N. Menendez.

# Introduccion
El proyecto consiste en un sistema de riego automatizado. Es el trabajo final de la asignatura "Desarrollo de Aplicaciones Multiplataforma" de la Especialización en Internet de las Cosas (CEIoT) de la Facultad de Ingeniería de la Universidad de Buenos Aires (FIUBA)

# Correr la aplicación sin docker-compose

## Base de datos

Se utilizo la "estructuraTPDAM.sql" como base y luego con "DAM.sql" se poblo la tabla de datos iniciales.

## Para levantar el back-end

Moverse hasta la carpeta Back_end/database para correr los scripts.
```sh
cd Back_end
cd database
./mysql.sh
./phpmyadmin.sh
```
Si ya se tiene un proceso de MySQL ocupando el puerto por defecto (3306) se debe dar de baja MySQL previamente con

```sh
 sudo systemctl stop mysql-server
```
o
```sh
sudo service mysql stop
```
Con ambos scripts funcionando volver a la carpeta Back_end y correr

```sh
node index.js
```

Y se debera ver el mensaje "Api funcionando".

## Para levantar el Front-End

Moverse hasta la carpeta Front_end y ejecutar

```sh
ionic serve -o
```

Lo cual abrira una pestaña del navegador en "http://localhost:8100/home" y se debera ver lo siguiente:

![Home](Home.png)

Eligiendo cualquiera de los dispositivos se puede acceder a los datos del sensor.

## Sensor del dispositivo

Al ingresar se visualizara el sensor con el valor por defecto (ultimo cargado en la base de datos)
![valor por defecto](Disp_defecto.png)

Al presionar "cerrar electrovalvula" el boton cambiara a "abrir electrovalvula", se impondra un valor de 25 en el sensor y se guardaran los datos en el log de mediciones y riego.

![dispositivo abierto](Dsip_abrir.png)

Al presionar "abrir electrovalvula" el boton cambiara a "cerrar electrovalvula", se impondra un valor de 75 en el sensor y se guardaran los datos en el log de mediciones y riego.

![dispositivo cerrado](Disp_cerrar.png)

Los valores de 25 y 75 son solo constantes arbitrarias.

## Medicion

Al presionar "ver todas las mediciones" se puede acceder al historial de mediciones, donde figura el ID de las mismas, la fecha en que ocurrieron y el valor del sensor (en este caso 25 y 75).

![Log de medicion](Medicion.png)

## Riego

Al presionar "Ver los riegos" se accedera al historial de riegos, donde la fecha tiene otro formato (pipe custom) y el nivel de apertura sera un porcentaje siempre que sea un valor mayor a 0% o la palabra "Cerrado" en rojo (directiva custom) si el nivel de apertura es 0%.

![Log de riego](Riego.png)


# Contribuir
Para contribuir realizar un pull request con las sugerencias.

Al ser un proyecto autoconclusivo, solo con fines académicos, no tendrá mantenimiento futuro.
# Licencia
GLP
