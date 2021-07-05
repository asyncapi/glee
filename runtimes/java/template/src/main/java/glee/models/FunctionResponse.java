package glee.models;

import com.fasterxml.jackson.annotation.*;

public class FunctionResponse {
  private String correlationId;
  private GleeMessage[] send;
  private GleeMessage[] reply;
  private GleeMessage[] broadcast;

  @JsonProperty("correlationId")
  public String getCorrelationId() { return this.correlationId; }
  public void setCorrelationId(String correlationId) { this.correlationId = correlationId; }
  
  @JsonProperty("send")
  public GleeMessage[] getSend() { return this.send; }
  public void setSend(GleeMessage[] send) { this.send = send; }

  @JsonProperty("reply")
  public GleeMessage[] getReply() { return this.reply; }
  public void setReply(GleeMessage[] reply) { this.reply = reply; }

  @JsonProperty("broadcast")
  public GleeMessage[] getBroadcast() { return this.broadcast; }
  public void setBroadcast(GleeMessage[] broadcast) { this.broadcast = broadcast; }
}