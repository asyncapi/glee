package glee.functions;

import glee.models.FunctionResponse;
import glee.models.GleeMessage;
import glee.messages.UserSignedUp;
import glee.messages.UserSignedUpPayload;
import glee.messages.EmailSentPayload;

public class OnUserSignedUpFunction {
  public static FunctionResponse onEvent(UserSignedUp event) {
    UserSignedUpPayload user = event.getPayload();
    System.out.println("display name = " + user.getDisplayName());
    System.out.println("email = " + user.getEmail());
    FunctionResponse response = new FunctionResponse();
    
    EmailSentPayload sendPayload = new EmailSentPayload();
    sendPayload.setEmail("fmvilas@gmail.com");
    
    GleeMessage message = new GleeMessage();
    message.setPayload(sendPayload);
    
    response.setSend(new GleeMessage[]{message});
    return response;
  }
} 