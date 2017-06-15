function processInbox() {
  // process all recent threads in the Inbox (see comment to this answer)
  var threads = GmailApp.search("from:(bugzilla@redhat.com) newer_than:1d");
  GmailApp.createLabel('Bugzilla');
  Logger.log("Got threads: " + threads.length);
  for (var i = 0; i < threads.length; i++) {
    processThread(threads[i]);
  }
}

function processThread(thread) {
  // get all messages in a given thread
  var messages = thread.getMessages();
  var latestStatus = null;
  for (var j = 0; j < messages.length; j++) {
    var message = messages[j];
    Logger.log("Processing message: " + j);
    var messageStatus = processMessage(message);
    if (messageStatus != null) latestStatus = messageStatus;
  }
  if (latestStatus != null) {
    var label = getLabel(latestStatus);
    thread.addLabel(label);
  }
}

function processMessage(message) {
  var body = message.getRawContent();
  var bzStatus = extractBZStatus(body);
  if (bzStatus != null) {
    Logger.log("Got BZ status: " + bzStatus);
  }
  return bzStatus;
}

function extractBZStatus(messageBody) {
  var regex = new RegExp('X-Bugzilla-Status: (.*)$', 'm');
  var result = regex.exec(messageBody);
  if (result == null) return null;
  
  return result[1];
}

function getLabel(bzStatus) {
  var labelName = "Bugzilla/" + bzStatus;
  var label = GmailApp.getUserLabelByName(labelName);
  if (label == undefined) {
    label = GmailApp.createLabel(labelName);
  }
  return label;
}