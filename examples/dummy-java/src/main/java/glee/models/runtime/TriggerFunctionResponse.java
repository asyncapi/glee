
package glee.models.runtime;
import java.util.Map;
public class TriggerFunctionResponse {
  private Message[] send;
  private Message[] reply;
  private Message[] broadcast;
  private Map<String, Object> additionalProperties;

  public Message[] getSend() { return this.send; }
  public void setSend(Message[] send) { this.send = send; }

  public Message[] getReply() { return this.reply; }
  public void setReply(Message[] reply) { this.reply = reply; }

  public Message[] getBroadcast() { return this.broadcast; }
  public void setBroadcast(Message[] broadcast) { this.broadcast = broadcast; }

  public Map<String, Object> getAdditionalProperties() { return this.additionalProperties; }
  public void setAdditionalProperties(Map<String, Object> additionalProperties) { this.additionalProperties = additionalProperties; }
}
    