var STUDENTS_SHEET_ID = '1dQmcchkBIlaXCEpJIu4rDEyeWBpacVhjruuHK2jOwP8';
var FRIENDS_SHEET_ID = '1ozlKXgZQp0xaKbBwrSaGZEdSkctmjhT1';

function doGet(e) {
  var page = e.parameter.page || 'Index'; // Default to 'index' if no page parameter
  return HtmlService.createHtmlOutputFromFile(page);
}

function registerUser(username, password, email) {
  var sheet = SpreadsheetApp.openById(STUDENTS_SHEET_ID).getSheetByName('Students');
  sheet.appendRow([username, password, email]);
  return 'Registration successful';
}

function loginUser(username, password) {
  var sheet = SpreadsheetApp.openById('1dQmcchkBIlaXCEpJIu4rDEyeWBpacVhjruuHK2jOwP8').getSheetByName('Students');
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === username && data[i][1] === password) {
      return 'Login successful';
    }
  }
  return 'Invalid username or password';
}

function searchUsers(query) {
  var sheet = SpreadsheetApp.openById(STUDENTS_SHEET_ID).getSheetByName('Students');
  var data = sheet.getDataRange().getValues();
  var results = [];

  for (var i = 1; i < data.length; i++) {
    if (data[i][0].toLowerCase().includes(query.toLowerCase())) {
      results.push({ name: data[i][0], email: data[i][2] });
    }
  }
  return results;
}

function addFriend(email) {
  var sheet = SpreadsheetApp.openById(FRIENDS_SHEET_ID).getSheetByName('Friends');
  var userEmail = Session.getActiveUser().getEmail();
  sheet.appendRow([userEmail, email]);
}

function getFriends() {
  var sheet = SpreadsheetApp.openById(FRIENDS_SHEET_ID).getSheetByName('Friends');
  var data = sheet.getDataRange().getValues();
  var userEmail = Session.getActiveUser().getEmail();
  var friends = [];

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === userEmail) {
      var friendEmail = data[i][1];
      var studentSheet = SpreadsheetApp.openById(STUDENTS_SHEET_ID).getSheetByName('Students');
      var studentData = studentSheet.getDataRange().getValues();

      for (var j = 1; j < studentData.length; j++) {
        if (studentData[j][2] === friendEmail) {
          friends.push({ name: studentData[j][0], email: friendEmail });
          break;
        }
      }
    }
  }
  return friends;
}

function removeFriend(email) {
  var sheet = SpreadsheetApp.openById(FRIENDS_SHEET_ID).getSheetByName('Friends');
  var data = sheet.getDataRange().getValues();
  var userEmail = Session.getActiveUser().getEmail();

  for (var i = data.length - 1; i >= 1; i--) {
    if (data[i][0] === userEmail && data[i][1] === email) {
      sheet.deleteRow(i + 1);
    }
  }
}

function getPage(page) {
  return HtmlService.createHtmlOutputFromFile(page).getContent();
}

function loadPage(page) {
  return HtmlService.createHtmlOutputFromFile(page).getContent();
}
