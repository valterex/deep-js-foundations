function getStudentFromId(studentId) {
  return studentRecords.find(matchId);

  // Must be nested because of the reference to studentId
  function matchId(record) {
    return record.id == studentId;
  }
}

function printRecords(recordIds) {
  var records = recordIds.map(getStudentFromId);

  records.sort(sortByNameAsc);
  records.forEach(printRecord);
}

function sortByNameAsc(record1, record2) {
  if (record1.name < record2.name) return -1;
  else if (record1.name > record2.name) return 1;
  else return 0;
}

function printRecord(record) {
  console.log(
    `${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`
  );
}

function paidStudentsToEnroll() {
  var recordsToEnroll = studentRecords.filter(needToEnroll);
  var idsToEnroll = recordsToEnroll.map(getStudentId);

  return [...currentEnrollment, ...idsToEnroll];
}

function needToEnroll(record) {
  return record.paid && !currentEnrollment.includes(record.id);
}

function getStudentId(record) {
  return record.id;
}

function remindUnpaid(recordIds) {
  var unpaidIds = recordIds.filter(notYetPaid);

  printRecords(unpaidIds);
}

function notYetPaid(studentId) {
  var record = getStudentFromId(studentId);

  return !record.paid;
}
