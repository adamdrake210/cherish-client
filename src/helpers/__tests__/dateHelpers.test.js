import { getAge } from '../dateHelpers';

test('Should return the age in years', () => {
  expect(getAge('25', 'May', '1980')).toBe('41 yrs');
  expect(getAge('22', 'July', '2019')).toBe('2 yrs');
  expect(getAge('20', 'August', '1982')).toBe('39 yrs');
  expect(getAge('05', 'March', '1981')).toBe('41 yrs');
  expect(getAge('05', 'March')).toBe('Unknown Age');
});
