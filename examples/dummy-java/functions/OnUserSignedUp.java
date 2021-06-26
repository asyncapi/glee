package functions;

public class OnUserSignedUp {
  public FunctionReply onEvent(FunctionRequest event){
    Object user = event.payload;
    System.out.format("%s has recently signed up. Sending an email to %s", user.displayName, user.email);
    FunctionReply reply = new FunctionReply();
    reply.broadcast = new BroadCastObject[]{new BroadCastObject('websockets', event.payload)};
    return reply;
  }
}