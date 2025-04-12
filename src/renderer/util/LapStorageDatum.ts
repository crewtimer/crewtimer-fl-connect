import { Lap } from 'crewtimer-common';
import { UseMemDatum } from '../store/UseElectronDatum';
import { LapDatumName, LapListInitCount } from '../shared/Constants';
import { UseKeyedDatum } from './UseKeyedDatum';

export const [useLaps, setLaps, getLaps] = UseMemDatum<Lap[]>(LapDatumName, []);
export const [useLapListInitCount] = UseMemDatum(LapListInitCount, 0);

export const [
  useEntryResult,
  setEntryResult,
  getEntryResult,
  clearEntryResults,
  getEntryResultKeys,
  dumpEntryResults,
] = UseKeyedDatum<Lap | undefined>();

export const setEntryResultAndPublish = (key: string, lap: Lap) => {
  lap.SequenceNum =
    typeof lap.SequenceNum === 'number' ? lap.SequenceNum + 10 : 1;
  setEntryResult(key, lap, true);
  window.LapStorage.updateLap(lap);
};
