
package glee.models.runtime;
import java.util.Map;
public class StandardLifecycle {
  private String lifecycle;
  private String serverName;
  private Object server;
  private Object connection;
  private Object glee;
  private Map<String, Object> additionalProperties;

  public String getLifecycle() { return this.lifecycle; }
  public void setLifecycle(String lifecycle) { this.lifecycle = lifecycle; }

  public String getServerName() { return this.serverName; }
  public void setServerName(String serverName) { this.serverName = serverName; }

  public Object getServer() { return this.server; }
  public void setServer(Object server) { this.server = server; }

  public Object getConnection() { return this.connection; }
  public void setConnection(Object connection) { this.connection = connection; }

  public Object getGlee() { return this.glee; }
  public void setGlee(Object glee) { this.glee = glee; }

  public Map<String, Object> getAdditionalProperties() { return this.additionalProperties; }
  public void setAdditionalProperties(Map<String, Object> additionalProperties) { this.additionalProperties = additionalProperties; }
}
  