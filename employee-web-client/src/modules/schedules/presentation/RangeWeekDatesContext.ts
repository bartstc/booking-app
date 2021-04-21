import { createSharedData } from 'shared/Share';

const { useShareConsumer: useRangeWeekDatesConsumer, ShareProvider: RangeWeekDatesProvider } = createSharedData<{
  startTime: string;
  endTime: string;
}>();

export { useRangeWeekDatesConsumer, RangeWeekDatesProvider };
