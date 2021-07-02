package ipcserver;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;
import org.scalasbt.ipcsocket.*;

public class App 
{
    static final boolean isWin = System.getProperty("os.name", "").toLowerCase().startsWith("win");

    static ServerSocket newServerSocket(String socketName) throws IOException {
        return isWin
            ? new Win32NamedPipeServerSocket(socketName, false, Win32SecurityLevel.LOGON_DACL)
            : new UnixDomainServerSocket(socketName, false);
    }

    static Socket newClientSocket(String socketName) throws IOException {
        return isWin
            ? new Win32NamedPipeSocket(socketName, false)
            : new UnixDomainSocket(socketName, false);
    }

    public static void main( String[] args )
    {
        final String socketName = isWin ? "\\\\.\\pipe\\ipcsockettest" : "/tmp/socket-loc.sock";
        final Path socketPath = Paths.get(socketName);
        
        try {
            ServerSocket serverSocket = newServerSocket(socketName);

            Runtime.getRuntime().addShutdownHook(new Thread() { public void run() {
                try {
                    serverSocket.close();
                    try {
                        Files.deleteIfExists(socketPath);
                    } catch (IOException exception) {
                        exception.printStackTrace();
                    }
                } catch (IOException e) {}
            }});

            EchoServer echo = new EchoServer(serverSocket);
            echo.run();
        } catch (SocketException e) {
            // Ignore. This exception happens when the server is stopped abruptly.
            // For instance, when we press Ctrl+C to stop the process.
        } catch (IOException exception) {
            exception.printStackTrace();
        } finally {
            try {
                Files.deleteIfExists(socketPath);
            } catch (IOException exception) {
                exception.printStackTrace();
            }
        }
    }
}
