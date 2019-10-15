import constructUrl from './constructUrl';
import baseUrl from './baseUrl';
import parse from './parse';
import add from './add';

const qpsUtils = { add, parse, baseUrl, construct:constructUrl };

export { add, parse, baseUrl, constructUrl as construct };

export default qpsUtils;