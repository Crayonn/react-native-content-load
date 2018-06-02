export function hasParams(param) {
  return !!param;
}

export function isArray(param){
  return param instanceof Array;
}

export function isNumber(param){
  return typeof param === 'number';
}

export function isFunction(param){
  return typeof param === 'function';
}