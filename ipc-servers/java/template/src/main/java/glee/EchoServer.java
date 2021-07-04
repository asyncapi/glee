package glee;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.InputStreamReader;
import java.io.BufferedReader;

import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;

import java.util.concurrent.CompletableFuture;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import glee.models.*;

public class EchoServer {
  private final ServerSocket serverSocket;

  public EchoServer(ServerSocket serverSocket) {
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
                  System.out.println("server: " + line);

                  try {
                      FunctionRequest req = objectMapper.readValue(line, FunctionRequest.class);

                      System.out.println("type = " + req.getType());
                      UserSignedUp event = objectMapper.readValue(req.getData().asText(), UserSignedUp.class);
                      if (req.getType().equals("OnUserSignedUp")) {
                        glee.functions.OnUserSignedUpFunction.onEvent(new GleeMessage(
                          event,
                          null,
                          null,
                          null
                        ));
                      } else {
                        System.out.println("Unknown event type " + req.getType());
                      }
                  } catch (IOException e) {
                      e.printStackTrace();
                  }

                  out.print(line + "\n");
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
