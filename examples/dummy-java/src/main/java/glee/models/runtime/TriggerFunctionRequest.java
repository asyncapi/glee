
package glee.models.runtime;
import java.util.Map;
public class TriggerFunctionRequest {
  private Object event;
  private Map<String, Object> additionalProperties;

  public Object getEvent() { return this.event; }
  public void setEvent(Object event) { this.event = event; }

  public Map<String, Object> getAdditionalProperties() { return this.additionalProperties; }
  public void setAdditionalProperties(Map<String, Object> additionalProperties) { this.additionalProperties = additionalProperties; }
}
  