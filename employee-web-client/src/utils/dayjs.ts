import dayjs, { extend } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

extend(weekday);
extend(weekOfYear);

export { dayjs };
