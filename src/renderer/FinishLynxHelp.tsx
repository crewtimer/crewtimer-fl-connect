import { Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import setup from '../assets/LynxSetup.png';
import { getLynxPort } from './util/UseSettings';

const txt = `
# Integration with FinishLynx
Using the CrewTimer FinishLynx Connect utility with FinishLynx requires both
CrewTimer and FinishLynx to be in agreement about the configuration.

* For a quick overview see the [CrewTimer FinishLynx Connect video](https://www.youtube.com/watch?v=633Bw2ub20Q).
* For more detailed instructions and tips, see the [CrewTimer FinishLynx Connect Documentation](https://crewtimer.com/help/FinishLynx).

**You must be running FinishLynx 12.10 or later for full functionality**  In addition the FinishLynx Network Comm Port option (or alternative) must be present and activated.

## Configuration Steps
1. Run CrewTimer FinishLynx Connect and enter your race credentials
2. Specify the FinishLynx Folder to match your FinishLynx Database Input Directory setting.  Usually c:\\Lynx.
This will place a CrewTimer.lss scoreboard file into the specified folder.
3. Start or Restart FinishLynx (v12.10 or later)
4. Set up Scoreboard
   - Create New Scoreboard
      - Script: CrewTimer.lss
      - Serial Port: Network(connect)
      - Port: ${getLynxPort()} (do not use 5000 on a mac)
      - IP Address: 127.0.0.1 if CrewTimer FinishLynx Connect running on same machine
      - Running Time: Off
      - Results:
          - Auto
          - Uncheck Paging
          - Options - checkmark 'Always send place'.  Needed for DNS, DNF support.
          - Time Precison: thousandths
5. Restart FinishLynx to start scoreboard

If you are not using start sensors, set Camera Settings -> Input -> Wired Sensor to "Open"

Your Scoreboard configuration should look like this:
![insert images](LynxSetup.png)

# Other Tips

- Ensure the PC is synchronized using something other than windows default.  For example use [Use Meinberg NTP](https://www.meinbergglobal.com/english/sw/ntp.htm) or [Speedsoft Time Sync](https://www.speed-soft.de/software/time_sync/index.php).

`;
const FinishLynxHelp = () => {
  const uriHandler = (/* uri: string */) => {
    return setup;
  };
  return (
    <Container
      maxWidth="sm"
      style={{
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column',
        flex: 1,
        paddingBottom: '2em',
      }}
    >
      {/* use components options to ensure links open in a new tab with target="_blank" */}
      <ReactMarkdown transformImageUri={uriHandler}  components={{
      a: ({ href, children, ...props }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      ),
    }}>{txt}</ReactMarkdown>
    </Container>
  );
};
export default FinishLynxHelp;
