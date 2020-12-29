/**
 * 用于合并两个对象，以source为副本
 * @param source 副本
 * @param form 数据
 */
export function mergeForm(source:object, form:object) {
  const _obj = Object.assign(source);
  for (const key in form) {
    if (key in _obj) {
      _obj[key] = form[key];
    }
  }

  return _obj;
}
