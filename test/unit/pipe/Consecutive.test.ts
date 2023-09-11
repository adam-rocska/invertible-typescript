import {Proverse} from '@21gram-consulting/invertible';
import {Consecutive} from '@21gram-consulting/invertible/pipe';

describe('Consecutive', () => {
  it(`should return the given value unaltered, same reference and all, since it's just a utility runtime type.`, async () => {
    const tasks: Consecutive<[Proverse]> = [Proverse(async (x) => x)];
    expect(Consecutive(...tasks)).toStrictEqual(tasks);
  });
});