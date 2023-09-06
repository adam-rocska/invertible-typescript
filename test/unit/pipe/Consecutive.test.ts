import {Consecutive, Proverse} from '@21gram-consulting/invertible';

describe('Consecutive', () => {
  it(`should return the given value unaltered, same reference and all, since it's just a utility runtime type.`, async () => {
    const tasks: Consecutive<[Proverse]> = [Proverse(async (x) => x)];
    expect(Consecutive(...tasks)).toStrictEqual(tasks);
  });
});