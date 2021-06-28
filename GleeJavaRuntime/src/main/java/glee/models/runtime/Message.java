
package glee.models.runtime;
import java.util.Map;

public class Message {
  private Object payload;
  private Object headers;
  private String channel;
  private String server;
  private Map<String, Object> additionalProperties;

  public Object getPayload() { return this.payload; }
  public void setPayload(Object payload) { this.payload = payload; }

  public Object getHeaders() { return this.headers; }
  public void setHeaders(Object headers) { this.headers = headers; }

  public String getChannel() { return this.channel; }
  public void setChannel(String channel) { this.channel = channel; }

  public String getServer() { return this.server; }
  public void setServer(String server) { this.server = server; }

  public Map<String, Object> getAdditionalProperties() { return this.additionalProperties; }
  public void setAdditionalProperties(Map<String, Object> additionalProperties) { this.additionalProperties = additionalProperties; }
}
