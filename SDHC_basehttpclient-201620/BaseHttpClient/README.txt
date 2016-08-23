#Escrito por Sergio Daniel Hernandez Charpak
#Cod: 200922618
#------------
#------------
#------------
#Desarrollado en Linux
#Instrucciones para compilar y ejecutar con Maven y Java
#Tomadas de: http://maven.apache.org/guides/getting-started/maven-in-five-minutes.html
#Para compilar:
#Ir a la carpeta del proyecto
cd SDHC_basehttpclient-201620/BaseHttpClient
#Ejecutar el comando de Maven
mvn package
#Luego para ejecutar el programa:
#Con la interfaz antigua:
java -cp target/BaseHttpClient-1.0-SNAPSHOT.jar ui.ClientUI
#Con la nueva interfaz:
java -cp target/BaseHttpClient-1.0-SNAPSHOT.jar ui.ClientUI2
#Ejemplo de URL completa
http://uniandes.edu.co:80/GET /institucional/informacion - general/la - universidad HTTP/1.1
