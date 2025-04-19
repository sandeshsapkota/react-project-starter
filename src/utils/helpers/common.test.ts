import { describe, it, expect } from 'vitest';
import { searchFilter } from '@/utils/helpers/common.utils';

describe('search array of objects', () => {
  const people = [
    { name: 'John', lastName: 'Doe' },
    { name: 'Emma', lastName: 'Smith' },
    { name: 'Liam', lastName: 'Johnson' },
    { name: 'Olivia', lastName: 'Brown' },
    { name: 'Noah', lastName: 'Williams' },
  ];

  it('search based on single key', () => {
    const input = searchFilter('John', people, 'name');
    const output = [{ name: 'John', lastName: 'Doe' }];

    expect(input).toEqual(output);
  });

  it('in case of small case', () => {
    const input = searchFilter('john', people, 'name');
    const output = [{ name: 'John', lastName: 'Doe' }];

    expect(input).toEqual(output);
  });

  it('search based on multiple key', () => {
    const input = searchFilter('John', people, ['name', 'lastName']);
    const output = [
      { name: 'John', lastName: 'Doe' },
      { name: 'Liam', lastName: 'Johnson' },
    ];
    expect(input).toEqual(output);
  });

  it('in case of empty key', () => {
    const input = searchFilter('', people, ['name', 'lastName']);
    expect(input).toEqual([]);
  });

  it('in case of not matching', () => {
    const input = searchFilter('zz', people, ['name', 'lastName']);
    expect(input).toEqual([]);
  });
});
