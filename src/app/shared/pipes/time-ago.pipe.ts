import { Pipe, PipeTransform } from '@angular/core';

interface TimeAgoTranslations {
  justNow: string;
  minutes: (count: number) => string;
  hours: (count: number) => string;
  days: (count: number) => string;
  weeks: (count: number) => string;
  months: (count: number) => string;
  years: (count: number) => string;
}

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  private translations: { [locale: string]: TimeAgoTranslations } = {
    en: {
      justNow: 'just now',
      minutes: (count: number) => `${count} minute${count === 1 ? '' : 's'} ago`,
      hours: (count: number) => `${count} hour${count === 1 ? '' : 's'} ago`,
      days: (count: number) => `${count} day${count === 1 ? '' : 's'} ago`,
      weeks: (count: number) => `${count} week${count === 1 ? '' : 's'} ago`,
      months: (count: number) => `${count} month${count === 1 ? '' : 's'} ago`,
      years: (count: number) => `${count} year${count === 1 ? '' : 's'} ago`,
    },
    de: {
      justNow: 'gerade eben',
      minutes: (count: number) => `vor ${count} Minute${count === 1 ? '' : 'n'}`,
      hours: (count: number) => `vor ${count} Stunde${count === 1 ? '' : 'n'}`,
      days: (count: number) => `vor ${count} Tag${count === 1 ? '' : 'e'}`,
      weeks: (count: number) => `vor ${count} Woche${count === 1 ? '' : 'n'}`,
      months: (count: number) => `vor ${count} Monat${count === 1 ? '' : 'e'}`,
      years: (count: number) => `vor ${count} Jahr${count === 1 ? '' : 'e'}`,
    },
    'de-DE': {
      justNow: 'gerade eben',
      minutes: (count: number) => `vor ${count} Minute${count === 1 ? '' : 'n'}`,
      hours: (count: number) => `vor ${count} Stunde${count === 1 ? '' : 'n'}`,
      days: (count: number) => `vor ${count} Tag${count === 1 ? '' : 'e'}`,
      weeks: (count: number) => `vor ${count} Woche${count === 1 ? '' : 'n'}`,
      months: (count: number) => `vor ${count} Monat${count === 1 ? '' : 'e'}`,
      years: (count: number) => `vor ${count} Jahr${count === 1 ? '' : 'e'}`,
    },
  };

  transform(value: string | Date | null | undefined, locale: string = 'en'): string {
    if (!value) return '';

    const now = new Date();
    const then = new Date(value);
    const diffInMs = now.getTime() - then.getTime();

    // Get translations for the specified locale, fallback to English
    const trans = this.translations[locale] || this.translations['en'];

    // If the date is in the future, return "just now"
    if (diffInMs < 0) return trans.justNow;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return trans.justNow;
    } else if (minutes < 60) {
      return trans.minutes(minutes);
    } else if (hours < 24) {
      return trans.hours(hours);
    } else if (days < 7) {
      return trans.days(days);
    } else if (weeks < 4) {
      return trans.weeks(weeks);
    } else if (months < 12) {
      return trans.months(months);
    } else {
      return trans.years(years);
    }
  }
}
