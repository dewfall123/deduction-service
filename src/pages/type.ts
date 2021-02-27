import { enumToMap } from '../utils/util';

export enum SERICE_STATUS {
  '生效中' = 'on',
  '已停用' = 'off',
}

export const SERVICE_STATUS_MAP = enumToMap(SERICE_STATUS);

export enum PAY_WAY {
  '零钱' = 'change',
}

export const PAY_WAY_MAP = enumToMap(PAY_WAY);

export interface Service {
  avatar: string;
  id: string;
  name: string;
  company: string;
  status: SERICE_STATUS;
  signTime: string;
  account: string;
  payWay: PAY_WAY;
  detail: string;
}

export interface CloudResult {
  code: number;
  msg?: string;
  data?: unknown;
}
