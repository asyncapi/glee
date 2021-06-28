
package glee.models.runtime;
import java.util.Map;
public class RegisterLifecycleHookResponse {
  private Object error;
  private String errorMessage;
  private Map<String, Object> additionalProperties;

  public Object getError() { return this.error; }
  public void setError(Object error) { this.error = error; }

  public String getErrorMessage() { return this.errorMessage; }
  public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }

  public Map<String, Object> getAdditionalProperties() { return this.additionalProperties; }
  public void setAdditionalProperties(Map<String, Object> additionalProperties) { this.additionalProperties = additionalProperties; }
}
  