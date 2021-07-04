package glee.models;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.annotation.*;

public class SocketMessage {
  @JsonProperty("type")
  private String type;

  @JsonProperty("data")
  private JsonNode data;

  public String getType() {
    return this.type;
  }
  public void setType(String type) {
    this.type = type;
  }
  
  public JsonNode getData() {
    return this.data;
  }
  public void setData(JsonNode data) {
    this.data = data;
  }
}