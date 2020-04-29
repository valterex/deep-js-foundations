var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
  { id: 313, name: "Frank", paid: true },
  { id: 410, name: "Suzy", paid: true },
  { id: 709, name: "Brian", paid: false },
  { id: 105, name: "Henry", paid: false },
  { id: 502, name: "Mary", paid: true },
  { id: 664, name: "Bob", paid: false },
  { id: 250, name: "Peter", paid: true },
  { id: 375, name: "Sarah", paid: true },
  { id: 867, name: "Greg", paid: false },
];

/**
 *
 * Part 1
 *
 */

function getStudentFromId(studentId) {
  return studentRecords.find(function matchId(record) {
    return record.id == studentId;
  });
}

function printRecords(recordIds) {
  var records = recordIds.map(getStudentFromId);

  records.sort(function sortByNameAsc(record1, record2) {
    if (record1.name < record2.name) return -1;
    else if (record1.name > record2.name) return 1;
    else return 0;
  });

  records.forEach(function printRecord(record) {
    console.log(
      `${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`
    );
  });
}

function paidStudentsToEnroll() {
  var recordsToEnroll = studentRecords.filter(function needToEnroll(record) {
    return record.paid && !currentEnrollment.includes(record.id);
  });

  var idsToEnroll = recordsToEnroll.map(function getStudentId(record) {
    return record.id;
  });

  return [...currentEnrollment, ...idsToEnroll];
}

function remindUnpaid(recordIds) {
  var unpaidIds = recordIds.filter(function notYetPaid(studentId) {
    var record = getStudentFromId(studentId);
    return !record.paid;
  });

  printRecords(unpaidIds);
}

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/**
 *
 * Part 2
 *
 */

// Get student by ID
var getStudentFromId = (studentId) =>
  studentRecords.find((record) => record.id == studentId);

var printRecords = (recordIds) =>
  recordIds
    .map(getStudentFromId) // Is this basically the same as mapping over studentRecords?
    .sort((record1, record2) =>
      record1.name < record2.name ? -1 : record1.name > record2.name ? 1 : 0
    )
    .forEach((record) =>
      console.log(
        `${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`
      )
    );

var paidStudentsToEnroll = () => [
  ...currentEnrollment,
  ...studentRecords
    .filter((record) => record.paid && !currentEnrollment.includes(record.id))
    .map((record) => record.id),
];

var remindUnpaid = (recordIds) =>
  printRecords(
    recordIds.filter((studentId) => !getStudentFromId(studentId).paid)
  );

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);
