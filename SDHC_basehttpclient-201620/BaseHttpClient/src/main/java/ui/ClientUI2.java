package ui;

import java.awt.Desktop;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;

import javax.swing.*;

import client.HttpClient;


public class ClientUI2 extends JFrame{

	private JTextField urlText;
	private JTextField fileNameText;


	public ClientUI2(){
		setTitle("Cliente HTTP - Nueva Version");
        setSize(1400, 400);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        JPanel panel = new JPanel();

        JLabel urlLabel = new JLabel("URL Completa: ");
				JLabel fileLabel = new JLabel("File: ");

        urlText = new JTextField(100);
				fileNameText = new JTextField(25);

        // Ejemplo de request para el dominio google.com:
        // GET search?q=Java HTTP/1.1




        JButton requestButton = new JButton("Request");

        requestButton.addActionListener(new ActionListener() {
           public void actionPerformed(ActionEvent e) {
						 //Una URL completa es de la forma
						 //http://host:port/requestMessage
						 //ej: http://uniandes.edu.co:80/GET /institucional/informacion - general/la - universidad HTTP/1.1
				int posicion = 0;
			  String url = urlText.getText();
				String[] url_array = url.split("/");
				String scheme = url_array[0];
				int scheme_length = scheme.length();
				String host_port = url_array[2];
				int host_port_length = host_port.length();
				posicion += scheme_length;
				posicion += host_port_length;
				posicion += 3;
				String requestMessage = url.substring(posicion);
				System.out.println(requestMessage);
				String[] host_port_array = host_port.split(":");
				String host = host_port_array[0];
				int port = Integer.parseInt(host_port_array[1]);

				/*
				for(String w:url_array){
					System.out.println(w);
				}
				for(String w:host_port_array){
					System.out.println(w);
				}
				*/
			  String fileName = fileNameText.getText();

              try {

				HttpClient client = new HttpClient(host, port);
				File file = client.processRequest(requestMessage, host, fileName);
				Desktop.getDesktop().open(file.getAbsoluteFile());
              } catch (Exception e1) {
					e1.printStackTrace();
              }
           }
        });

        panel.add(urlLabel);
        panel.add(urlText);
        panel.add(fileLabel);
        panel.add(fileNameText);
        panel.add(requestButton);

        this.add(panel);


	}

	public static void main(String[] args) {
		ClientUI2 client = new ClientUI2();
		client.setVisible(true);
	}

}
