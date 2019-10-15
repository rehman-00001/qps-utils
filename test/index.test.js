import qpsUtils from '../src/index';

describe("Tests for qpsUtils with single-valued key", () => {

  test('Should construct url for a single-valued key', () => {
    const url = qpsUtils.construct({
      'color': 'yellow'
    });
    const expectedUrl = 'color=yellow';
    expect(url).toBe(expectedUrl);
  });

  test('Should construct url with keys not having values', () => {
    const url = qpsUtils.construct({
      'color': 'yellow',
      'rejected': ''
    });
    const expectedUrl = 'color=yellow&rejected=true';
    expect(url).toBe(expectedUrl);
  });

  test('Should parse urls with single valued keys', () => {
    const url = 'color=yellow&rejected=true';
    const object = {
      'color': 'yellow',
      'rejected': true
    };
    const result = qpsUtils.parse(url).params().map();
    expect(result).toEqual(object);
  })

  test('Should parse urls with implicit booleans', () => {
    const url = 'color=yellow&rejected';
    const object = {
      'color': 'yellow',
      'rejected': true
    };
    const result = qpsUtils.parse(url).params().map();
    expect(result).toEqual(object);
  });

  test('Should parse urls with null valued keys', () => {
    const url = 'color=yellow&rejected=null';
    const object = {
      'color': 'yellow',
      'rejected': null
    };
    const result = qpsUtils.parse(url).params().map();
    expect(result).toEqual(object);
  });
})

describe("Tests for qpsUtils with multi-valued key", () => {
  test('Should construct url for multi-valued key', () => {
    const url = qpsUtils.construct({
      'color': ['orange', 'blue', 34, true]
    });
    const expectedUrl = 'color=orange&color=blue&color=34&color=true';
    expect(url).toBe(expectedUrl);
  });

  test('Should construct url with keys not having values', () => {
    const url = qpsUtils.construct({
      'color': ['orange', 'blue', 'green'],
      passed: true,
      success: ''
    });
    const expectedUrl = 'color=orange&color=blue&color=green&passed=true&success=true';
    expect(url).toBe(expectedUrl);
  });

  test('Should add multiple values for existing keys', () => {
    const url = 'color=orange&color=blue&color=green&passed=true&success=true';
    const newUrl = qpsUtils.parse(url).params().add('color', 'red').construct();
    const expectedUrl = 'color=orange&color=blue&color=green&passed=true&success=true&color=red';
    expect(newUrl).toBe(expectedUrl);
  });
});

