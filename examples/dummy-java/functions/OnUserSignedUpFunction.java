package glee.functions;

import glee.models.*;

public class OnUserSignedUpFunction {
  public static FunctionResponse onEvent(GleeMessage event) {
    UserSignedUp user = (UserSignedUp) event.getPayload();
    System.out.println("display name = " + user.getDisplayName());
    System.out.println("email = " + user.getEmail());
    FunctionResponse response = new FunctionResponse();
    
    // UserSignedUp payload = new UserSignedUp();
    // payload.setDisplayName("Fran Mendez");
    // payload.setEmail("fmvilas@gmail.com");
    
    // GleeMessage message = new GleeMessage();
    // message.setServer("mosquitto");
    // message.setPayload(payload);
    
    // response.setSend(new GleeMessage[]{message});
    return response;
  }
} 