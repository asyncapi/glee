public class AnnounceServer {
  public static String lifecycleEvent = 'onConnect';
  public static String[] servers = new String[]{'mosquitto'};
  public EventResponse onEvent(EventRequest event){
    EventResponse response = new EventResponse();
    Send s = new Send();
    s.server = 'mosquitto';
    s.channel = 'server/announce';
    Paylodssss p = new Paylodssss();
    p.id = 'test'; // Date.now()
    s.payload = p;
    response.send = new SendEvent[]{
      s
    }
  }
}