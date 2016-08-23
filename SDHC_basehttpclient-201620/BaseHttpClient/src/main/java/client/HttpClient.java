package client;

import java.io.*;
import java.net.Socket;
import java.net.UnknownHostException;

public class HttpClient {

	private Socket socket;

	public HttpClient(String host, int port) throws UnknownHostException, IOException{
		socket = new Socket(host,port);
	}

	public File processRequest(String requestMessage, String host, String fileName) throws IOException{

		//Toca obtener los Output e Input desde el socket, crear los objetos envar la peticion y recibir la respuesta.
		OutputStream outputsito = socket.getOutputStream();
		InputStream inputsito = socket.getInputStream();
		RequestProcessor requestsito = RequestProcessor.getInstance();
		ResponseProcessor respondsito = ResponseProcessor.getInstance();
		requestsito.sendRequestMessage(outputsito, requestMessage, host);
		File archivoRespuesta = respondsito.processResponse(inputsito, fileName);
		System.out.println("Finalizo das peticion");
		return archivoRespuesta;
	}


}
