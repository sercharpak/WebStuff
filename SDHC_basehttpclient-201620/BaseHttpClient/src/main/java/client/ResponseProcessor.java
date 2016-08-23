package client;

import java.io.*;

public class ResponseProcessor{

	private static ResponseProcessor instance = null;

	protected ResponseProcessor() {

	}

	public static ResponseProcessor getInstance(){
		if (instance==null){
			instance = new ResponseProcessor();
		}
		return instance;

	}

	public File processResponse(InputStream input, String fileName) throws IOException{
		byte[] buffer= new byte[1024];
		File file = new File("descarga/"+fileName);
		BufferedOutputStream bOutput = new BufferedOutputStream(new FileOutputStream(file));
		int tReaded= 0;
		int tArchivo= 0;
		int tReadedi= 0;
		int tPatterns= 0;
		int tWaitedChar= '\r';
		boolean inContent = false;
		//En cada paso del ciclo lee la entrada y lo guarda en el array buffer,
		//el ciclo sigue si el numero de bytes es mayor que 0
		while((tReadedi = input.read(buffer))>0){
			//Casos particulares
			if(inContent){
				//Entra si encuentra el inicio del mensaje
				bOutput.write(buffer,0,tReadedi);
				tArchivo+= tReadedi;
			}
			else{
				//Busca el final del mensaje
				//'\r\n\r\n'
				for(int i=0; i<tReadedi; i++){
					int chari = buffer[i];
					System.out.println((int)chari);
					if(chari==tWaitedChar){
						if(chari=='\r'){
							tWaitedChar='\n';
						}
						else if(chari=='\n'){
							tPatterns++;
							tWaitedChar='\r';
						}
						inContent = tPatterns==2;
						if(inContent){
							//Encontro el final del mensaje
							bOutput.write(buffer,i+1,tReadedi-(i+1));
							bOutput.flush();
							tArchivo+=tReadedi-(i+1);
							//Se sale del ciclo
							break;
						}
					}
					else{
						tPatterns = 0;
						tWaitedChar = '\r';
					}
			}
		}
			//Caso general
			tReaded += tReadedi;
			buffer = new byte[1024];
			if(input.available()<=0) break;
			try{
				Thread.sleep(10);
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
		}
		bOutput.close();
		return file;
	}
}
