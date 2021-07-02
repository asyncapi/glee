package ipcserver;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.InputStreamReader;
import java.io.BufferedReader;

import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;

import java.util.concurrent.CompletableFuture;

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
              BufferedReader in =
                  new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
              String line;
              do {
                line = in.readLine();
                if (line != null) {
                  System.out.println("server: " + line);
                  out.print(line + "\n");
                  out.flush();
                }
              } while (!line.trim().equals("bye"));
            } catch (IOException e) {
            }
            return true;
          });
    }
  }
}
