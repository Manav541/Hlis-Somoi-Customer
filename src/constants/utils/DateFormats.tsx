import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

export const DateFormatsManager = {
  // Params
  DateFormats: {
    YYYYMMDD: 'YYYY-MM-DD', // 2025-04-15
    DDMMYYYY: 'DD-MM-YYYY', // 15-04-2025
    DDMMYYYY_SLASH: 'DD/MM/YYYY', // 15/04/2025
    MMDDYYYY: 'MM-DD-YYYY', // 04-15-2025
    MMDDYYYY_SLASH: 'MM/DD/YYYY', // 04/15/2025
    DoMMYYYY: 'D MMM YYYY', // 15 Apr 2025 (ordinal suffix like '15th' not supported)
    ddddMMMMDoYYYY: 'dddd, MMMM D YYYY', // Tuesday, April 15 2025
    DMMM_COMMA_YYYY: 'D MMM, YYYY', // 10 Mar, 2025
  },

  TimeFormats: {
    HHmm: 'HH:mm', // 14:30 (24-hour)
    hhmmA: 'hh:mm A', // 02:30 PM
    HHmmss: 'HH:mm:ss', // 14:30:45
    hhmmssA: 'hh:mm:ss A', // 02:30:45 PM
  },

  DateTimeFormatsWithTimezone: {
    YYYYMMDDTHHmmssZ: 'YYYY-MM-DDTHH:mm:ss[Z]', // 2025-04-15T14:30:00Z
    YYYYMMDDTHHmmssSSSZ: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]', // 2025-04-15T14:30:00.000Z
    dddhAinz: 'ddd, hA', // Tue, 2PM (timezone abbrev like 'IST' not supported natively)
  },

  DateTimeFormatWithoutTimezone: {
    YYYYMMDDHHmmss: 'YYYY-MM-DD HH:mm:ss', // 2025-04-15 14:30:59
    MMMDoYYYYhmmA: 'MMM D YYYY, h:mm A', // Apr 15 2025, 2:30 PM
    ddddMMMMDoYYYYhmmssA: 'dddd, MMMM D YYYY, h:mm:ss A', // Tuesday, April 15 2025, 2:30:59 PM
    MMDDYYYYhmmssA: 'MM/DD/YYYY, h:mm:ss A', // 04/15/2025, 2:30:59 PM
  },

  // Functions
  formatDate: (
    date: string | number | Date,
    outputFormat: string,
    inputFormat?: string,
  ): string => {
    let dayjsObj;

    if (typeof date === 'string' && inputFormat) {
      dayjsObj = dayjs(date, inputFormat, true); // strict parsing
    } else {
      dayjsObj = dayjs(date);
    }

    return dayjsObj.isValid() ? dayjsObj.format(outputFormat) : 'Invalid Date';
  },

  convertLocalToUTC: (
    date: string | number | Date,
    outputFormat?: string,
  ): string => {
    const d = dayjs(date);
    return d.isValid()
      ? d.utc().format(outputFormat ?? 'YYYY-MM-DDTHH:mm:ss[Z]')
      : 'Invalid Date';
  },

  convertUTCToLocal: (
    date: string | number | Date,
    outputFormat?: string,
  ): string => {
    const d = dayjs.utc(date);
    return d.isValid()
      ? d.local().format(outputFormat ?? 'YYYY-MM-DDTHH:mm:ssZ')
      : 'Invalid Date';
  },
};
