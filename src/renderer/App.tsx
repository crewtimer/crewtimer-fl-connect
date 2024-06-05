import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.global.css';
import CenteredTabs from './CenteredTabs';
import InitProgress, { useInitProgress } from './InitProgress';
import Nav from './Nav';
import StatusMonitor from './StatusMonitor';
import { setInitializing, useLynxPort } from './util/UseSettings';

const { startLapStorage } = window.LapStorage;
const { stopLapStorage } = window.LapStorage;
export default function App() {
  const [initProgress, setInitProgress] = useInitProgress();
  const [lynxPort] = useLynxPort();
  useEffect(() => {
    setInitializing(true);
    const doInit = async () => {
      setInitProgress(10);

      window.Firebase.startFirebase();
      setInitProgress(25);

      await startLapStorage();
      setInitProgress(50);

      setInitProgress(75);

      setInitProgress(100);

      // Wait for stored data to be loaded
      setTimeout(() => setInitializing(false), 200);
    };
    doInit();
    return () => {
      window.FinishLynx.stopLynxServer();
      stopLapStorage();
      window.Firebase.stopFirebase();
    };
  }, [setInitProgress]);

  useEffect(() => {
    window.FinishLynx.startLynxServer();
  }, [initProgress >= 50, lynxPort]);

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
