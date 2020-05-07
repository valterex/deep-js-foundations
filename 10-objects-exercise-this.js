var deepJS = {
  currentEnrollment: [],
  studentRecords: [],

  addStudent(id, name, paid) {
    this.studentRecords.push({ id, name, paid });
  },

  enrollStudent(id) {
    if (!this.currentEnrollment.includes(id)) {
      this.currentEnrollment.push(id);
    }
  },

  printCurrentEnrollment() {
    this.printRecords(this.currentEnrollment);
  },

  enrollPaidStudents() {
    this.currentEnrollment = this.paidStudentsToEnroll();
    this.printCurrentEnrollment();
  },

  remindUnpaidStudents() {
    this.remindUnpaid(this.currentEnrollment);
  },

  getStudentFromId(studentId) {
    return this.studentRecords.find(matchId);

    // actual function which does not need this
    function matchId(record) {
      return record.id == studentId;
    }
  },

  printRecords(recordIds) {
    // bind is used for callback methods
    var records = recordIds.map(this.getStudentFromId.bind(this));
    records.sort(this.sortByNameAsc);
    records.forEach(this.printRecord);
  },

  sortByNameAsc(record1, record2) {
    if (record1.name < record2.name) return -1;
    else if (record1.name > record2.name) return 1;
    else return 0;
  },

  printRecord(record) {
    console.log(
      `${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`
    );
  },

  paidStudentsToEnroll() {
    var recordsToEnroll = this.studentRecords.filter(
      this.needToEnroll.bind(this)
    );

    var idsToEnroll = recordsToEnroll.map(this.getStudentId);
    return [...this.currentEnrollment, ...idsToEnroll];
  },

  needToEnroll(record) {
    return record.paid && !this.currentEnrollment.includes(record.id);
  },

  getStudentId(record) {
    return record.id;
  },

  remindUnpaid(recordIds) {
    var unpaidIds = recordIds.filter(this.notYetPaid.bind(this));
    this.printRecords(unpaidIds);
  },

  notYetPaid(studentId) {
    var record = this.getStudentFromId(studentId);
    return !record.paid;
  },
};
