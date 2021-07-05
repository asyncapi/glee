package glee.models;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.annotation.*;

public class SocketMessage {
  @JsonProperty("type")
  private String type;

  @JsonProperty("data")
  private JsonNode data;

  public SocketMessage(String type, FunctionResponse res) {
    ObjectMapper objectMapper = new ObjectMapper();
    this.setType(type);
    this.setData(objectMapper.valueToTree(res));
  }
  
  public SocketMessage() {
    // Dummy constructor for Jackson
  }

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

  public String toJsonString() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    return objectMapper.writeValueAsString(this) + '\n';
  }
}