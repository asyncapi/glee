
package glee.models.application;

public class UserSignedUpPayload {
  private String displayName;
  private Object email;

  public String getDisplayName() { return this.displayName; }
  public void setDisplayName(String displayName) { this.displayName = displayName; }

  public Object getEmail() { return this.email; }
  public void setEmail(Object email) { this.email = email; }
}
  