package glee.models;

public class GleeMessage {
  private Object payload;
  private Object headers;
  private String channel;
  private String server;

  public GleeMessage(Object payload, Object headers, String channel, String server) {
    this.payload = payload;
    this.headers = headers;
    this.channel = channel;
    this.server = server;
  }

  public Object getPayload() { return this.payload; }
  public void setPayload(Object payload) { this.payload = payload; }

  public Object getHeaders() { return this.headers; }
  public void setHeaders(Object headers) { this.headers = headers; }

  public String getChannel() { return this.channel; }
  public void setChannel(String channel) { this.channel = channel; }

  public String getServer() { return this.server; }
  public void setServer(String server) { this.server = server; }
}