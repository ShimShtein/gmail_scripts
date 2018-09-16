function processLastMonth() {
  startProcess("from:(bugzilla@redhat.com) newer_than:30d");
}

function processInbox() {
  startProcess("from:(bugzilla@redhat.com) newer_than:1d");
}

function startProcess(search) {
  // process all recent threads in the Inbox (see comment to this answer)
  var threads = GmailApp.search(search);
  GmailApp.createLabel('Bugzilla');
  GmailApp.createLabel('Bugzilla/Component');
  GmailApp.createLabel('Bugzilla/Status');
  var bzLabels = getBzLabels();
  Logger.log("Got threads: " + threads.length);
  for (var i = 0; i < threads.length; i++) {
    processThread(threads[i], bzLabels);
  }
}

function processThread(thread, bzLabels) {
  // get all messages in a given thread
  var messages = thread.getMessages();
  var latestStatus = null;
  var latestComponent = null;
  for (var j = 0; j < messages.length; j++) {
    var message = messages[j];
    Logger.log("Processing message: " + j);
    var messageInfo = processMessage(message);
    if (messageInfo.status != null) latestStatus = messageInfo.status;
    if (messageInfo.component != null) latestComponent = messageInfo.component;
  }
  if (latestStatus != null || latestComponent != null) {
    var statusLabel = getLabel("Status/" + latestStatus);
    var componentLabel = getLabel("Component/" + latestComponent);
    for (var i = 0; i < bzLabels.length; i++) {
      if (bzLabels[i] != statusLabel && bzLabels[i] != componentLabel) {
        thread.removeLabel(bzLabels[i]);
      }
    }
    if (statusLabel != null) thread.addLabel(statusLabel);
    if (componentLabel != null) thread.addLabel(componentLabel);
  }
}

function processMessage(message) {
  var body = message.getRawContent();
  var bzStatus = extractBZStatus(body);
  var bzComponent = extractBZComponent(body);
  if (bzStatus != null) {
    Logger.log("Got BZ status: " + bzStatus);
  }
  if (bzComponent != null) {
    Logger.log("Got BZ component: " + bzComponent);
  }
  return {status: bzStatus, component: bzComponent};
}

function extractBZStatus(messageBody) {
  var regex = new RegExp('X-Bugzilla-Status: (.*)$', 'm');
  var result = regex.exec(messageBody);
  if (result == null) return null;
  
  return result[1];
}

function extractBZComponent(messageBody) {
  var regex = new RegExp('X-Bugzilla-Component: (.*)$', 'm');
  var result = regex.exec(messageBody);
  if (result == null) return null;
  
  return result[1];
}

function getLabel(bzStatus) {
  if (bzStatus == null) return null;
  var labelName = "Bugzilla/" + bzStatus;
  var label = GmailApp.getUserLabelByName(labelName);
  if (label == undefined) {
    label = GmailApp.createLabel(labelName);
  }
  return label;
}

function getBzLabels(){
  var allLabels = GmailApp.getUserLabels();
  var bzLabels = [];
  for (var i = 0; i < allLabels.length; i++) {
    name = allLabels[i].getName();
    if (name.indexOf("Bugzilla/") == 0) {
      bzLabels.push(allLabels[i])
    }
  }
  return bzLabels;
}