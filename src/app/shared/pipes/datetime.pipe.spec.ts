import { DatetimePipe } from './datetime.pipe';

describe('DatetimePipe', () => {
  let pipe: DatetimePipe;

  beforeEach(() => {
    pipe = new DatetimePipe();
  });

  it('parses string, number and date object inputs', () => {
    const expectedResult = '2000-01-01T01:01:01+00:00';

    const unixInput = 946688461000;
    const stringInput = '2000-01-01T01:01:01';
    const dateInput = new Date(unixInput);

    expect(pipe.transform(unixInput)).toBe(expectedResult);
    expect(pipe.transform(stringInput)).toBe(expectedResult);
    expect(pipe.transform(dateInput)).toBe(expectedResult);
  });

  it('uses ISO-formatted string as a default output', () => {
    const defaultResult = '2000-01-01T01:01:01+00:00';

    expect(pipe.transform(946688461000)).toBe(defaultResult);
  });

  it('accepts custom output formatters based on date-fns library', () => {
    const unixInput = 946688461000;

    expect(pipe.transform(unixInput, 'YYYY MMM DD')).toBe('2000 Jan 01');
    expect(pipe.transform(unixInput, 'ddd DD MMM YYYY')).toBe('Sat 01 Jan 2000');
  });
});
