import constructUrl from './constructUrl';

export default function add(key, value) {
  let context = {
    qMap: {
      [key]: value
    }
  };

  const handles = {
    add: (key, value) => {
      context.qMap[key] = value;
      return handles;
    },
    construct: constructUrl.bind(context)
  };

  return handles;
}
