package glee.models;

import com.fasterxml.jackson.annotation.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class GleeMessage {
  @JsonProperty("payload")
  protected Object payload;
  
  @JsonProperty("headers")
  protected Object headers;

  @JsonProperty("channel")
  protected String channel;

  @JsonProperty("server")
  protected String server;
  
  @JsonProperty("messageId")
  protected String messageId;

  public Object getPayload() { return this.payload; }
  public void setPayload(Object payload) { this.payload = payload; }

  public Object getHeaders() { return this.headers; }
  public void setHeaders(Object headers) { this.headers = headers; }

  public String getChannel() { return this.channel; }
  public void setChannel(String channel) { this.channel = channel; }

  public String getServer() { return this.server; }
  public void setServer(String server) { this.server = server; }

  public String getMessageId() { return this.messageId; }
  public void setMessageId(String messageId) { this.messageId = messageId; }
}