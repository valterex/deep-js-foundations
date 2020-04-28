function findAll(match, arr) {
  var ret = [];

  for (let v of arr) {
    if (Object.is(match, v)) {
      ret.push(v);
    } else if (match == null && v == null) {
      ret.push(v);
    } else if (typeof match == "boolean") {
      if (match === v) {
        ret.push(v);
      }
    } else if (
      typeof match == "string" &&
      match.trim() != "" &&
      typeof v == "number" &&
      !Object.is(-0, v)
    ) {
      if (match == v) {
        ret.push(v);
      }
    } else if (
      typeof match == "number" &&
      !Object.is(match, -0) &&
      !Object.is(match, NaN) &&
      !Object.is(match, Infinity) &&
      !Object.is(match, -Infinity) &&
      typeof v == "string" &&
      v.trim() != ""
    ) {
      if (match == v) {
        ret.push(v);
      }
    }
  }
  return ret;
}
