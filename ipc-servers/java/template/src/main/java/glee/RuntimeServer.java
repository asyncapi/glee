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
                      
                      if (req.getType().equals("OnUserSignedUpFunction")) {
                        UserSignedUp event = objectMapper.readValue(req.getData().asText(), UserSignedUp.class);
                        FunctionResponse res = glee.functions.OnUserSignedUpFunction.onEvent(event);
                        SocketMessage sm = new SocketMessage();
                        sm.setType("response");
                        sm.setData(objectMapper.valueToTree(res));
                        out.print(objectMapper.writeValueAsString(sm));
                        out.print('\n');
                      } else {
                        System.out.println("Unknown event type " + req.getType());
                      }
                  } catch (IOException e) {
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
