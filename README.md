# Metrics Monitoring Dashboard

This React application provides a real-time metrics dashboard to visualize API performance. It includes two key features:

1. **Last 10 Minutes Graph**: Displays API response times for the last 10 minutes, loaded from a REST API.

2. **Real-Time Graph**: Updates in real-time using data received over a WebSocket connection. (Work In Progress)

<video width="640" height="360" controls>
  <source src="public/video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

## Features

- **Dynamic Visualizations**:

  - Graphs for each route.
  - Logarithmic y-axis to visualize response times in milliseconds.
  - Color-coded statuses for quick status identification.

- **Context-Based State Management**:

  - The app uses React Context to manage metrics data globally.

- **WebSocket Integration (Work In Progress)** :
  - Live updates from the server ensure that data stays current while monitoring real-time performance.

---

## Getting Started

### Prerequisites

- Node.js (>= 16.x)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the development server:

   ```bash
   npm run start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

---

## Configuration

### REST API

- The app fetches the last 10 minutes of metrics from `http://localhost:8085/metrics`.
- Ensure that your backend is running and accessible at the specified endpoint.

### WebSocket

- Real-time updates are received from the WebSocket endpoint at `ws://localhost:8085/ws`.
- Make sure the WebSocket server is running and reachable.

---

## How It Works

### Metrics Context (`MetricsContext`)

- Loads the last 10 minutes of data when the app starts.
- Stores metrics in the following format:
  ```json
  {
    "timestamps": ["2025-01-15T12:00:00Z", "2025-01-15T12:01:00Z"],
    "metrics": [
      {
        "route": "GET - /health",
        "responseTime": [150.2, 120.5],
        "responseStatus": [200, 400]
      }
    ]
  }
  ```

### Live Metrics Context (`LiveMetricsContextProvider`)

- Establishes a WebSocket connection when loaded.
- Appends live data to the `MetricsContext`. The live data format is:
  ```json
  {
    "route": "POST - /api/products",
    "timestamp": "2025-01-15T17:32:56+05:30",
    "time": 48.888,
    "status": 200
  }
  ```

### Graphs

1. **Last 10 Minutes Graph**
   - Displays historical data fetched from the REST API.
2. **Real-Time Graph (Work In Progress)**
   - Dynamically updates based on WebSocket messages.

---
