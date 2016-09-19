/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.sample.whiteboardapp;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author Sergio Hernandez (basado en el tutorial)
 */
@ServerEndpoint(value = "/whiteboardendpoint",
        encoders = {FigureEncoder.class},
        decoders = {FigureDecoder.class})
public class MyWhiteboard {

    private static Set<Session> users = Collections.synchronizedSet(new HashSet<Session>());

    @OnOpen
    public void onOpen(Session user) {
        users.add(user);
    }
    
    @OnClose
    public void onClose(Session user) {
        users.remove(user);
    }

    @OnMessage
    public void broadcastFigure(Figure figure, Session session) throws IOException, EncodeException {
        System.out.println("broadcastFigure: " + figure);
        for (Session user : users) {
            if (!user.equals(session)) {
                user.getBasicRemote().sendObject(figure);
            }
        }
    }

    @OnMessage
    public void broadcastSnapshot(ByteBuffer data, Session session) throws IOException {
        System.out.println("broadcastBinary: " + data);
        for (Session user : users) {
            if (!user.equals(session)) {
                user.getBasicRemote().sendBinary(data);
            }
        }
    }

    
}
