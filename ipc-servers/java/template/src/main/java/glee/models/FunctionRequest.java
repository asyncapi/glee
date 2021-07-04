package glee.models;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.annotation.*;

public class FunctionRequest {
  @JsonProperty("type")
  private String type;

  @JsonProperty("data")
  private JsonNode data;

  public String getType() {
    return this.type;
  }
  
  public JsonNode getData() {
    return this.data;
  }
}