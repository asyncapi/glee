package glee;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.InputStreamReader;
import java.io.BufferedReader;

import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.lang.reflect.Method;
import java.lang.reflect.InvocationTargetException;
import java.lang.ClassNotFoundException;
import java.lang.NoSuchMethodException;
import java.lang.IllegalAccessException;

import java.util.concurrent.CompletableFuture;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import glee.models.SocketMessage;
import glee.models.FunctionResponse;
import glee.messages.*;

public class RuntimeServer {
  private final ServerSocket serverSocket;

  public RuntimeServer(ServerSocket serverSocket) {
    this.serverSocket = serverSocket;
  }

  public void run() throws IOException, SocketException {
    while (true) {
      Socket clientSocket;
      
      try {
        clientSocket = serverSocket.accept();
      } catch (IOException e) {
        throw new SocketException();
      }

      CompletableFuture.supplyAsync(
          () -> {
            try {
              PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
              BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
              ObjectMapper objectMapper = new ObjectMapper();
              String line;
              do {
                line = in.readLine();
                if (line != null) {
                  try {
                      SocketMessage req = objectMapper.readValue(line, SocketMessage.class);
                      JsonNode data = objectMapper.readValue(req.getData().asText(), JsonNode.class);
                      System.out.println("messageId = " + data.get("messageId").asText());
                      if (!data.has("messageId")) {
                        System.out.println("Unknown event type " + req.getType());
                        continue;
                      }
                      
                      Class<?> functionClass = Class.forName("glee.functions." + req.getType());
                      Class MessageClass = Class.forName("glee.messages." + data.get("messageId").asText());
                      Method m = functionClass.getMethod("onEvent", MessageClass);
                      FunctionResponse res = (FunctionResponse) m.invoke(
                        null,
                        objectMapper.treeToValue(data, MessageClass)
                      );
                      res.setCorrelationId(data.get("correlationId").asText());
                      SocketMessage sm = new SocketMessage("response", res);
                      out.print(sm.toJsonString());
                  } catch (ClassNotFoundException e) {
                      e.printStackTrace();
                  } catch (NoSuchMethodException e) {
                      e.printStackTrace();
                  } catch (IllegalAccessException e) {
                      e.printStackTrace();
                  } catch (InvocationTargetException e) {
                      e.printStackTrace();
                  } catch (IOException e) {
                      e.printStackTrace();
                  } catch (Exception e) {
                      e.printStackTrace();
                  }

                  out.flush();
                }
              } while (true);
            } catch (IOException e) {
            }
            return true;
          });
    }
  }
}
