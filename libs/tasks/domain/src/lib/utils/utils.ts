export class IdGenerator {
  static generateId() {
    return new Array(24)
      .fill(0)
      .map(() => {
        const r = (Math.random() * 16) | 0;
        return r.toString(16);
      })
      .join('');
  }
}

export function toDateTimeInputString(date: Date): string {
  return `${date.toISOString().split('T')[0]}T${date
    .toTimeString()
    .substr(0, 5)}`;
}
