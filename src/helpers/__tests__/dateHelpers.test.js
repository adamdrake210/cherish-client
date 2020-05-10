import { getAge } from '../dateHelpers';

test('Should return the age in years', () => {
  expect(getAge('25', 'May', '1980')).toBe(39);
  expect(getAge('22', 'July', '2019')).toBe(0);
  expect(getAge('20', 'August', '1982')).toBe(37);
  expect(getAge('05', 'March', '1981')).toBe(39);
  expect(getAge('05', 'March')).toBe(
    'no year was selected. Unable to provide age.',
  );
});
