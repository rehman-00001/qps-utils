import add from '../src/add';

describe('function add():', () => {
  test('Should expose the methods "add" & "construct"', () => {
    const object = add('key-1', 'value-1').add('key-2', 2434);
    expect(object).toHaveProperty('add');
    expect(object).toHaveProperty('construct');
  });

  test('Add a single key & value', () => {
    const url = add('key-1', 'value-1').construct();
    const expectedUrl = 'key-1=value-1';
    expect(url).toBe(expectedUrl);
  });

  test('Add multiple keys & values', () => {
    const expectedUrl = 'key-1=value-1&key-2=2434&key-3=true';
    const url = add('key-1', 'value-1')
      .add('key-2', 2434)
      .add('key-3', true)
      .construct();
    expect(url).toBe(expectedUrl);
  });
});
