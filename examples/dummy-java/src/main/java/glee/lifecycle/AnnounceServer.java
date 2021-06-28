package glee.lifecycle;

import glee.models.runtime.*;
import glee.models.application.*;

public class AnnounceServer {
  public static String lifecycleEvent = "onConnect";
  public static String[] servers = new String[]{"mosquitto"};
  public static TriggerLifecycleHookResponse onEvent(TriggerLifecycleHookRequest request){
    TriggerLifecycleHookResponse response = new TriggerLifecycleHookResponse();
    Message s = new Message();
    s.setServer("mosquitto");
    s.setChannel("server/announce");
    ServerAnnouncePayload p = new ServerAnnouncePayload();
    p.setId("test");
    s.setPayload(p);
    response.setSend(new Message[]{s});
    return response;
  }
}