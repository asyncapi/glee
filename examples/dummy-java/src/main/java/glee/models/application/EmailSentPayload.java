
package glee.models.application;

public class EmailSentPayload {
  private Object email;
  private java.time.OffsetDateTime timestamp;

  public Object getEmail() { return this.email; }
  public void setEmail(Object email) { this.email = email; }

  public java.time.OffsetDateTime getTimestamp() { return this.timestamp; }
  public void setTimestamp(java.time.OffsetDateTime timestamp) { this.timestamp = timestamp; }
}
  