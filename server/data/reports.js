const mongoCollections = require('../config/mongoCollections');
const reports = mongoCollections.reports;
const restrooms = mongoCollections.restrooms;
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const restroomsData = require('./restrooms');

const createReport = async (
  restroomId,
  value,
  userId
) => {
  if (!restroomId || !value || !userId) {
    throw `All fields need to have valid values`;
  }
  checkString(restroomId);
  checkString(value);
  checkString(userId);
  if (!ObjectId.isValid(restroomId)) {
    throw `id is not a valid ObjectId`;
  }
  const restroomsCollection = await restrooms();
  const restroom = await restroomsCollection.findOne({ _id: ObjectId(restroomId) });
  if (restroom === null) {
    throw `No restroom with that id`;
  }

  const restroomThatReported = await restroomsData.getRestroomById(restroomId);
  const reportId = ObjectId();
  const newReport = {
    _id: reportId,
    restroomId: restroomId,
    value: value,
    userId: userId,
    reportedAt: new Date()
  };

  let updatedReports = [];
  for (let i = 0; i < restroomThatReported.reports.length; i++) {
    updatedReports[i] = restroomThatReported.reports[i];
  }
  updatedReports[restroomThatReported.reports.length] = newReport;
  await restroomsCollection.updateOne({ _id: ObjectId(restroomId) }, { $set: { reports: updatedReports } });
  const usersCollection = await users();
  await usersCollection.updateOne({ _id: ObjectId(userId) }, { $push: { reportIds: String(newReport._id) } });
  return await restroomsData.getRestroomById(restroomId);
};

const getAllReports = async (restroomId) => {
  if (!restroomId) {
    throw `You must provide an restroom id to search for`;
  }
  checkString(restroomId);
  if (!ObjectId.isValid(restroomId)) {
    throw `id is not a valid ObjectId`;
  }
  const restroomsCollection = await restrooms();
  const restroom = await restroomsCollection.findOne({ _id: ObjectId(restroomId) });
  if (restroom === null) {
    throw `No restroom with that id`;
  }
  const restroomData = await restroomsData.getRestroomById(restroomId);
  let reportList = [];
  for (let i = 0; i < restroomData.reports.length; i++) {
    reportList.push(restroomData.reports[i]);
  }
  return reportList;
};

const getReportById = async (reportId) => {
  if (!reportId) {
    throw `You must provide an report id to search for`;
  }
  checkString(reportId);
  if (!ObjectId.isValid(reportId)) {
    throw `id is not a valid ObjectId`;
  }
  const restroomsCollection = await restrooms();
  const restroomsList = await restroomsCollection.find({}).toArray();
  let found = false;
  let report = {};
  for (let i = 0; i < restroomsList.length; i++) {
    const currentRestroom = restroomsList[i];
    for (let j = 0; j < currentRestroom.reports.length; j++) {
      if (currentRestroom.reports[j]._id.toString() == reportId) {
        found = true;
        report = currentRestroom.reports[j];
        break;
      }
    }
  }
  if (!found) {
    throw `no report with that id`;
  }
  return report;
};

const removeReportById = async (reportId) => {
  if (!reportId) {
    throw `You must provide an report id to search for`;
  }
  checkString(reportId);
  if (!ObjectId.isValid(reportId)) {
    throw `id is not a valid ObjectId`;
  }
  const restroomsCollection = await restrooms();
  const restroomsList = await restroomsCollection.find({}).toArray();
  let found = false;
  let index = 0;
  let newReportsList = [];
  let currentRestroom = {};
  for (let i = 0; i < restroomsList.length; i++) {
    currentRestroom = restroomsList[i];
    for (let j = 0; j < currentRestroom.reports.length; j++) {
      if (currentRestroom.reports[j]._id.toString() == reportId) {
        found = true;
        for (let m = 0; m < currentRestroom.reports.length; m++) {
          if (currentRestroom.reports[m]._id.toString() == reportId) {
            index = m;
            continue;
          }
          newReportsList.push(currentRestroom.reports[m]);
        }
        break;
      }
    }
  }
  if (found == false) {
    throw `no report with that id (Could not remove)`;
  }

  await restroomsCollection.updateOne({ _id: ObjectId(currentRestroom._id) }, { $set: { reports: newReportsList } });
  const curReport = await this.getReport(reportId);
  const usersCollection = await users();
  await usersCollection.updateOne({ _id: ObjectId(curReport.userId) }, { $pull: { reportIds: reportId } });
  return await restroomsData.getRestroomById(currentRestroom._id.toString());
};

const updateReportById = async (reportId, updatedReport) => {
  if (!reportId) {
    throw `You must provide an report id to search for`;
  }
  checkString(reportId);
  if (!ObjectId.isValid(reportId)) {
    throw `id is not a valid ObjectId`;
  }
  const reportsCollection = await reports();
  const updatedReportData = {};
  if (updatedReport.value) {
    updatedReportData.value = updatedReport.value;
  }

  await reportsCollection.updateOne({ _id: ObjectId(reportId) }, { $set: updatedReportData });
  return await this.getReportById(reportId);
};


function checkString(input) {
  if (typeof input != 'string' || input.trim().length == 0) {
    throw `Not valid! ${input} should be a non-empty string`;
  }
}

module.exports = { createReport, getAllReports, getReportById, removeReportById, updateReportById };