import { promisifyAll, Wxp } from 'miniprogram-api-promise';

const promisifyWx = {} as Wxp;
promisifyAll(wx, promisifyWx);

export const wxp = promisifyWx;
