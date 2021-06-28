
package glee.models.runtime;
import java.util.Map;
public class GleeConnection {
  private Object server;
  private Object parsedAsyncapi;
  private String[] channels;
  private String serverName;
  private Map<String, Object> additionalProperties;

  public Object getServer() { return this.server; }
  public void setServer(Object server) { this.server = server; }

  public Object getParsedAsyncapi() { return this.parsedAsyncapi; }
  public void setParsedAsyncapi(Object parsedAsyncapi) { this.parsedAsyncapi = parsedAsyncapi; }

  public String[] getChannels() { return this.channels; }
  public void setChannels(String[] channels) { this.channels = channels; }

  public String getServerName() { return this.serverName; }
  public void setServerName(String serverName) { this.serverName = serverName; }

  public Map<String, Object> getAdditionalProperties() { return this.additionalProperties; }
  public void setAdditionalProperties(Map<String, Object> additionalProperties) { this.additionalProperties = additionalProperties; }
}
  