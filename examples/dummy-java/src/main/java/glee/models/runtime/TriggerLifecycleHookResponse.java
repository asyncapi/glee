
package glee.models.runtime;
import java.util.Map;
public class TriggerLifecycleHookResponse {
  private Object error;
  private String errorMessage;
  private Message[] send;
  private Message[] reply;
  private Message[] broadcast;
  private Map<String, Object> additionalProperties;

  public Object getError() { return this.error; }
  public void setError(Object error) { this.error = error; }

  public String getErrorMessage() { return this.errorMessage; }
  public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }

  public Message[] getSend() { return this.send; }
  public void setSend(Message[] send) { this.send = send; }

  public Message[] getReply() { return this.reply; }
  public void setReply(Message[] reply) { this.reply = reply; }

  public Message[] getBroadcast() { return this.broadcast; }
  public void setBroadcast(Message[] broadcast) { this.broadcast = broadcast; }

  public Map<String, Object> getAdditionalProperties() { return this.additionalProperties; }
  public void setAdditionalProperties(Map<String, Object> additionalProperties) { this.additionalProperties = additionalProperties; }
}
  