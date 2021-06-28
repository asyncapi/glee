
package glee.models.runtime;
import java.util.Map;
public class RegisterFunctionRequest {
  private String content;
  private String filename;
  private Map<String, Object> additionalProperties;

  public String getContent() { return this.content; }
  public void setContent(String content) { this.content = content; }

  public String getFilename() { return this.filename; }
  public void setFilename(String filename) { this.filename = filename; }

  public Map<String, Object> getAdditionalProperties() { return this.additionalProperties; }
  public void setAdditionalProperties(Map<String, Object> additionalProperties) { this.additionalProperties = additionalProperties; }
}
    