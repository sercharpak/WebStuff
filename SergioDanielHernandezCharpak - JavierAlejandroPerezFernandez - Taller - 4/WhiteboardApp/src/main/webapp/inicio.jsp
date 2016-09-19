<%-- 
    Document   : inicio.jsp
    Created on : 18/09/2016, 09:14:10 PM
    Author     : Sergio Hernandez
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Esta pagina preambula el awesome whiteboard.</h1>
        <h5>Ingrese su nombre de usuario:</h5>
        <form action="loginServlet" method="post">
            <input type="text" name="username"/>
            <input type="submit" value="Ingresar" />
        </form>
    </body>
</html>
