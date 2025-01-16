import logo from './logo.svg';
import './App.css';
import { MetricsContextProvider } from './context/MetricsContext';
import MetricsDashboard from './components/MetricsDashboard';

function App() {
  return (
    <MetricsContextProvider>
    <MetricsDashboard/>
    </MetricsContextProvider>
  );
}

export default App;
