function isValidName(name) {
  if (typeof name === "string" && name.trim().length >= 3) {
    return true;
  } else {
    return false;
  }
}

function hoursAttended(attended, length) {
  if (typeof attended == "string" && attended.trim() != "") {
    attended = Number(attended);
  }

  if (typeof length == "string" && length.trim() != "") {
    length = Number(length);
  }

  if (
    typeof attended == "number" &&
    typeof length == "number" &&
    attended <= length &&
    attended >= 0 &&
    length >= 0 &&
    Number.isInteger(attended) &&
    Number.isInteger(length)
  ) {
    return true;
  }

  return false;
}
