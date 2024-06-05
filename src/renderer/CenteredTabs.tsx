import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Setup from './Setup';
import Status from './Status';
import { useInitializing, useTabPosition } from './util/UseSettings';
import { Toast } from './Toast';
import FinishLynxHelp from './FinishLynxHelp';
import FLSetup from './FLSetup';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    flexFlow: 'column',
    display: 'flex',
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [tabPosition, setTabPosition] = useTabPosition();
  const [initializing] = useInitializing();

  const handleChange = (_event: unknown, newValue: string) => {
    setTabPosition(newValue);
  };

  if (initializing) {
    return <></>;
  }

  let Page = Setup;
  switch (tabPosition) {
    case 'CrewTimer':
      Page = Setup;
      break;
    case 'Status':
      Page = Status;
      break;
    case 'Finish Lynx':
      Page = FLSetup;
      break;
    case 'Help':
      Page = FinishLynxHelp;
      break;
  }
  return (
    <Paper className={classes.root} square>
      {/* Keeep Tabs from scrolling by surround with fixed */}
      <div>
        <Tabs
          value={tabPosition}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          style={{
            width: '100%',
            position: 'fixed',
            zIndex: 1000,
            backgroundColor: '#fff',
            marginBottom: '1em',
          }}
        >
          <Tab label="Status" value="Status" />
          <Tab label="CrewTimer" value="CrewTimer" />
          <Tab label="Finish Lynx" value="Finish Lynx" />
          <Tab label="Help" value="Help" />
        </Tabs>
      </div>
      <Tabs style={{ zIndex: 0 }} />
      <Page />
      <Toast />
    </Paper>
    // </div>
  );
}
