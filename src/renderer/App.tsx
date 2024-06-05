import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.global.css';
import CenteredTabs from './CenteredTabs';
import InitProgress, { useInitProgress } from './InitProgress';
import Nav from './Nav';
import StatusMonitor from './StatusMonitor';
import { setInitializing } from './util/UseSettings';

const { startLapStorage } = window.LapStorage;
const { stopLapStorage } = window.LapStorage;
export default function App() {
  const [, setInitProgress] = useInitProgress();
  useEffect(() => {
    setInitializing(true);
    const doInit = async () => {
      setInitProgress(10);

      window.Firebase.startFirebase();
      setInitProgress(25);

      await startLapStorage();
      setInitProgress(50);

      window.FinishLynx.startLynxServer();
      setInitProgress(75);

      // refreshAuthStatus();
      setInitProgress(100);

      setInitializing(false);
    };
    doInit();
    return () => {
      window.FinishLynx.stopLynxServer();
      stopLapStorage();
      window.Firebase.stopFirebase();
    };
  }, [setInitProgress]);

  return (
    <Router>
      <div style={{ height: '100vh', display: 'flex', flexFlow: 'column' }}>
        <Nav />
        <InitProgress />
        <CenteredTabs />
      </div>
      <StatusMonitor />
    </Router>
  );
}
