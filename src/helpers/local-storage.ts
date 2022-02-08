import moment from 'moment';
import { DATE_FORMAT } from './format-date';

export function saveBoolean(value: boolean, key: string) {
  window.localStorage.setItem(key, value ? 'true' : 'false');
}

export function getBoolean(key: string): boolean {
  return window.localStorage.getItem(key) === 'true';
}

export function saveString(value: string, key: string) {
  window.localStorage.setItem(key, value);
}

export function getString(key: string): string | null {
  return window.localStorage.getItem(key);
}

export function saveNumber(value: number, key: string) {
  window.localStorage.setItem(key, value.toString());
}

export function getNumber(key: string): number | null {
  return window.localStorage.getItem(key) !== null
    ? Number(window.localStorage.getItem(key))
    : null;
}

export function saveMomentDate(value: string | null, key: string, format: string = DATE_FORMAT) {
  if (moment.isMoment(value)) {
    window.localStorage.setItem(key, value.format(format));
  } else if (typeof value === 'string') {
    window.localStorage.setItem(key, value);
  } else {
    window.localStorage.removeItem(key);
  }
}

export function getMomentDate(key: string, format: string = DATE_FORMAT) {
  return window.localStorage.getItem(key) !== null
    ? moment(window.localStorage.getItem(key)).format(format)
    : null;
}

export function removeItem(key: string) {
  window.localStorage.removeItem(key);
}

export default {
  saveBoolean,
  getBoolean,
  saveString,
  getString,
  saveNumber,
  getNumber,
  saveMomentDate,
  getMomentDate,
  removeItem,
};
