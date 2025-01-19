# Stati
An easy-to-use agent based status monitor. Several agents can be used, hence the project name.

## Architecture
```mermaid
flowchart TB
    subgraph SingleServer["Main Server"]
        Client["Client (Frontend)"]
        RestAPI["Server (REST API)"]
        WebSocket["WebSocket Endpoint"]
        Agent1["Agent 1"]
        Database[(Database)]
    end
    subgraph AgentNServer["Another Server"]
        AgentN["Agent N"]
    end

    Client --> RestAPI
    RestAPI --> Database
    RestAPI <--> WebSocket
    WebSocket <--> Agent1
    WebSocket <--> AgentN
```

## Data Structure
```mermaid
erDiagram
    Agent {
        STRING Id
        STRING Name
        STRING HashedAccessKey
        DATETIME CreatedAt
        DATETIME UpdatedAt
    }
    Monitor {
        STRING Id
        STRING Name
        ENUM Type
        JSON Configuration
        STRING AgentId
        DATETIME CreatedAt
        DATETIME UpdatedAt
        INT IntervalSeconds
    }
    Result {
        STRING Id
        STRING MonitorId
        ENUM Status
        JSON Metrics
        DATETIME CreatedAt
    }

    Agent ||--o{ Monitor : has
    Monitor ||--o{ Result : produces
```
