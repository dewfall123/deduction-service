export const ArrowColor = 'rgba(0,0,0,0.3)';

export const isDirty = { value: true };

export function setDirty(v: boolean) {
  isDirty.value = v;
}
