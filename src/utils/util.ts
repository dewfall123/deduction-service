import dayjs from 'dayjs';

export function formatDate(date: string, format = 'YYYY-MM-DD HH:ss') {
  return dayjs(date).format(format);
}

export function enumToMap(e: Record<string, string>) {
  return Object.entries(e).reduce((map, [key, value]) => {
    map[value] = key;
    return map;
  }, {} as Record<string, string>);
}
