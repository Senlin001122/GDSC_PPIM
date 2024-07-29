function doGet(e) {
  var page = e.parameter.page;
  if (page == "News_event") {
    return HtmlService.createHtmlOutputFromFile('News_event');
  } else if (page == "Open_recruitment") {
    return HtmlService.createHtmlOutputFromFile('Open_recruitment');
  } else {
    return HtmlService.createHtmlOutputFromFile('main_page');
  }
}

function loadPage(page) {
  if (page == "News_event") {
    return HtmlService.createHtmlOutputFromFile('News_event').getContent();
  } else if (page == "Open_recruitment") {
    return HtmlService.createHtmlOutputFromFile('Open_recruitment').getContent();
  }
}
