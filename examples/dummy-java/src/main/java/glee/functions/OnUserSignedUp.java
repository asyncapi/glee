package glee.functions;

import glee.models.application.UserSignedUpPayload;
import glee.models.runtime.Message;
import glee.models.runtime.TriggerFunctionRequest;
import glee.models.runtime.TriggerFunctionResponse;

public class OnUserSignedUp {
  public TriggerFunctionResponse onEvent(TriggerFunctionRequest event){
    UserSignedUpPayload user = (UserSignedUpPayload)event.getEvent();
    System.out.format("%s has recently signed up. Sending an email to %s", user.getDisplayName(), user.getEmail());
    TriggerFunctionResponse reply = new TriggerFunctionResponse();
    Message m = new Message();
    m.setServer("websockets");
    m.setPayload(event.getEvent());
    return reply;
  }
}
