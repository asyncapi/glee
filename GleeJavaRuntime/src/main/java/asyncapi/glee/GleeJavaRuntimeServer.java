/*
 * Copyright 2015 The gRPC Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package asyncapi.glee;

import com.google.protobuf.Any;
import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.stub.StreamObserver;

import javax.tools.*;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

/**
 * Server that manages startup/shutdown of a {@code Greeter} server.
 */
public class GleeJavaRuntimeServer {
    private static final Logger logger = Logger.getLogger(GleeJavaRuntimeServer.class.getName());

    private Server server;

    private void start() throws IOException {
        /* The port on which the server should run */
        int port = 50051;
        server = ServerBuilder.forPort(port)
                .addService(new GreeterImpl())
                .build()
                .start();
        logger.info("Server started, listening on " + port);
        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                // Use stderr here since the logger may have been reset by its JVM shutdown hook.
                System.err.println("*** shutting down gRPC server since JVM is shutting down");
                try {
                    GleeJavaRuntimeServer.this.stop();
                } catch (InterruptedException e) {
                    e.printStackTrace(System.err);
                }
                System.err.println("*** server shut down");
            }
        });
    }

    private void stop() throws InterruptedException {
        if (server != null) {
            server.shutdown().awaitTermination(30, TimeUnit.SECONDS);
        }
    }

    /**
     * Await termination on the main thread since the grpc library uses daemon threads.
     */
    private void blockUntilShutdown() throws InterruptedException {
        if (server != null) {
            server.awaitTermination();
        }
    }

    /**
     * Main launches the server from the command line.
     */
    public static void main(String[] args) throws IOException, InterruptedException {
        final GleeJavaRuntimeServer server = new GleeJavaRuntimeServer();
        server.start();
        server.blockUntilShutdown();
    }

    static class GreeterImpl extends GleeGrpc.GleeImplBase {
      private Map<String, List<String>> lifeCycleMap = new HashMap();
      public void sayGleeRegisterLifecycle(RegisterLifecycleHookRequest request, StreamObserver<RegisterLifecycleHookResponse> responseObserver) {
        System.out.format("Got request: %s", request.toString());
        RegisterLifecycleHookResponse reply;
        String lifecycleFileName = request.getFilename();
        try {
          Path javaSourceFile = Paths.get(lifecycleFileName);
          System.out.println("The java source file is located at "+javaSourceFile);

          // Definition of the files to compile
          File[] files1 = {javaSourceFile.toFile()};
          // Get the compiler
          JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
          // Get the file system manager of the compiler
          StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);
          // Create a compilation unit (files)
          Iterable<? extends JavaFileObject> compilationUnits =
            fileManager.getJavaFileObjectsFromFiles(Arrays.asList(files1));
          // A feedback object (diagnostic) to get errors
          DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<JavaFileObject>();

          //TODO: Hardcoded for now, we need to provide the classpath to the project, otherwise we cant compile the lifecycle class
          //TODO: What do we do with external libraries?...
          String[] compileOptions = new String[]{"-cp", "/Users/lagoni/Documents/AsyncAPI/glee.git/examples/dummy-java/src/main/java"} ;
          Iterable<String> compilationOptions = Arrays.asList(compileOptions);

          // Compilation unit can be created and called only once
          JavaCompiler.CompilationTask task = compiler.getTask(
            null,
            fileManager,
            diagnostics,
            compilationOptions,
            null,
            compilationUnits
          );
          // The compile task is called
          task.call();
          // Printing of any compile problems
          if(diagnostics.getDiagnostics().size() > 0 ){
            StringBuffer errorMessage = new StringBuffer();
            for (Diagnostic diagnostic : diagnostics.getDiagnostics()) {
              errorMessage.append(String.format("Error while compiling %s %s",
                lifecycleFileName,
                diagnostic.toString())).append('\n');
            }
            reply = RegisterLifecycleHookResponse.newBuilder().setErrorMessage(errorMessage.toString()).build();
          } else {
            reply = RegisterLifecycleHookResponse.newBuilder().build();
          }
          // Close the compile resources
          fileManager.close();
          ClassLoader classLoader = GleeJavaRuntimeServer.class.getClassLoader();
          //TODO: MUST BE SAME PACKAGE + CLASS NAME TO WORK
          Path forClassLoader = Paths.get("/Users/lagoni/Documents/AsyncAPI/glee.git/examples/dummy-java/src/main/java/");
          URLClassLoader urlClassLoader = new URLClassLoader(
            new URL[] { forClassLoader.toUri().toURL() },
            classLoader);
          //TODO: Hardcoded for now, must be full path to function
          Class javaDemoClass = urlClassLoader.loadClass("glee.lifecycle.AnnounceServer");
          Field lifecycleEvent = javaDemoClass.getDeclaredField("lifecycleEvent");
          String ls = String.valueOf(lifecycleEvent.get(null));
          //TODO: Hardcoded for now, must be full path to function
          lifeCycleMap.put(ls, new ArrayList(){{add("glee.lifecycle.AnnounceServer");}});
        } catch (Exception e) {
          e.printStackTrace();
          String errorMessage = e.getMessage();
          reply = RegisterLifecycleHookResponse.newBuilder().setErrorMessage(errorMessage).build();
        }
        System.out.format("Returning reply: %s", reply.toString());
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
      }

      public void sayGleeRegisterLifecycleOLD(RegisterLifecycleHookRequest request, StreamObserver<RegisterLifecycleHookResponse> responseObserver) {
        System.out.format("Got request: %s", request.toString());
        RegisterLifecycleHookResponse reply;
        String lifecycleJavaCode = request.getContent();
        String lifecycleFileName = request.getFilename();
        Path temp = Paths.get(System.getProperty("java.io.tmpdir"), "lifecycles");
        try {
          Files.createDirectories(temp);
          Path javaSourceFile = Paths.get(temp.normalize().toAbsolutePath().toString(), lifecycleFileName);
          System.out.println("The java source file is located at "+javaSourceFile);
          Files.write(javaSourceFile, lifecycleJavaCode.getBytes());


          // Definition of the files to compile
          File[] files1 = {javaSourceFile.toFile()};
          // Get the compiler
          JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
          // Get the file system manager of the compiler
          StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);
          // Create a compilation unit (files)
          Iterable<? extends JavaFileObject> compilationUnits =
            fileManager.getJavaFileObjectsFromFiles(Arrays.asList(files1));
          // A feedback object (diagnostic) to get errors
          DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<JavaFileObject>();

          String[] compileOptions = new String[]{"-cp", "/Users/lagoni/Documents/AsyncAPI/glee.git/examples/dummy-java/src/main/java"} ;
          Iterable<String> compilationOptions = Arrays.asList(compileOptions);

          // Compilation unit can be created and called only once
          JavaCompiler.CompilationTask task = compiler.getTask(
            null,
            fileManager,
            diagnostics,
            compilationOptions,
            null,
            compilationUnits
          );
          // The compile task is called
          task.call();
          // Printing of any compile problems
          if(diagnostics.getDiagnostics().size() > 0 ){
            StringBuffer errorMessage = new StringBuffer();
            for (Diagnostic diagnostic : diagnostics.getDiagnostics()) {
              errorMessage.append(String.format("Error while compiling %s %s",
                lifecycleFileName,
                diagnostic.toString())).append('\n');
            }
            reply = RegisterLifecycleHookResponse.newBuilder().setErrorMessage(errorMessage.toString()).build();
          } else {
            reply = RegisterLifecycleHookResponse.newBuilder().build();
          }
          // Close the compile resources
          fileManager.close();
        } catch (Exception e) {
          String errorMessage = e.getMessage();
          reply = RegisterLifecycleHookResponse.newBuilder().setErrorMessage(errorMessage).build();
        }
        System.out.format("Returning reply: %s", reply.toString());
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
      }

      public void sayGleeTriggerLifecycle(TriggerLifecycleHookRequest request,
                                          StreamObserver<TriggerLifecycleHookResponse> responseObserver) {
        System.out.println(request.toString());
        TriggerLifecycleHookResponse reply = TriggerLifecycleHookResponse.newBuilder().build();
        try{
          String lifecycleToTrigger = request.getLifecycle();
          if(lifeCycleMap.containsKey(lifecycleToTrigger)){
            List<String> lifecycles = lifeCycleMap.get(lifecycleToTrigger);
            for (String lifecycleClass : lifecycles) {

              ClassLoader classLoader = GleeJavaRuntimeServer.class.getClassLoader();
              //TODO: Hardcoded path for now, should find this path automatically
              Path forClassLoader = Paths.get("/Users/lagoni/Documents/AsyncAPI/glee.git/examples/dummy-java/src/main/java/");
              URLClassLoader urlClassLoader = new URLClassLoader(
                new URL[] { forClassLoader.toUri().toURL() },
                classLoader);
              Class javaDemoClass = urlClassLoader.loadClass(lifecycleClass);
              //TODO: MUST BE SAME PACKAGE + CLASS NAME TO WORK
              //Problem with different package names which makes it hard to return stuff
              Method lifecycleEventMethod = javaDemoClass.getDeclaredMethod("onEvent", glee.models.runtime.TriggerLifecycleHookRequest.class);
              glee.models.runtime.TriggerLifecycleHookResponse value = (glee.models.runtime.TriggerLifecycleHookResponse)lifecycleEventMethod.invoke(null, new glee.models.runtime.TriggerLifecycleHookRequest());
              //STUFF to convert between objects
              glee.models.runtime.Message valueM = value.getSend()[0];
              //TODO: The return value hardcoded for now
              Message m = Message.newBuilder().setChannel(valueM.getChannel()).setServer(valueM.getServer()).setPayloadStringValue("test").build();
              reply = TriggerLifecycleHookResponse.newBuilder().addSend(m).build();
            }
          }
        } catch (Exception e) {
          e.printStackTrace();
          String errorMessage = e.getMessage();
          reply = TriggerLifecycleHookResponse.newBuilder().setErrorMessage(errorMessage).build();
        }
        System.out.format("Returning reply: %s", reply.toString());
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
      }
      @Override
      public void sayGleeRegisterFunction(RegisterFunctionRequest request, StreamObserver<RegisterFunctionResponse> responseObserver) {
        RegisterFunctionResponse reply = RegisterFunctionResponse.newBuilder().build();
        System.out.println(request.toString());
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
      }
    }
}
