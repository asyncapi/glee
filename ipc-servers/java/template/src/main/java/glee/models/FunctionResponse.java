package glee.models;

public class FunctionResponse {
  private GleeMessage[] send;
  private GleeMessage[] reply;
  private GleeMessage[] broadcast;

  public GleeMessage[] getSend() { return this.send; }
  public void setSend(GleeMessage[] send) { this.send = send; }

  public GleeMessage[] getReply() { return this.reply; }
  public void setReply(GleeMessage[] reply) { this.reply = reply; }

  public GleeMessage[] getBroadcast() { return this.broadcast; }
  public void setBroadcast(GleeMessage[] broadcast) { this.broadcast = broadcast; }
}