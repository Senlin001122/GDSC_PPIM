function doGet(e) {
  var page = e.parameter.page || 'Index'; // Default to 'index' if no page parameter
  return HtmlService.createHtmlOutputFromFile(page);
}

function registerUser(username, password, email) {
  var sheet = SpreadsheetApp.openById('1dQmcchkBIlaXCEpJIu4rDEyeWBpacVhjruuHK2jOwP8').getSheetByName('Students');
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === username) {
      return 'Username already exists';
    }
  }

  sheet.appendRow([username, password, email]);
  return 'User registered successfully';
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

function getPage(page) {
  return HtmlService.createHtmlOutputFromFile(page).getContent();
}

function loadPage(page) {
  return HtmlService.createHtmlOutputFromFile(page).getContent();
}
