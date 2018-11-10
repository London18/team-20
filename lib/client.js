// The Realtime client connection
var ortcClient;

// The Realtime channel
var chatChannel = "default";

// The current user id (random between 1 and 1000)
var myId = "ID_" + Math.floor((Math.random() * 1000) + 1);
var myName = "John Doe";

// Connect to the Realtime cluster
function connectToRealtime() {
  ortcClient = RealtimeMessaging.createClient();
  ortcClient.setClusterUrl('https://ortc-developers.realtime.co/server/ssl/2.1/');

  Log("Connecting to Realtime ...");
  ortcClient.connect('GRKM84', 'anonymousToken');

  // we need to wait for the connection to complete
  // before we subscribe the channel
  ortcClient.onConnected = function(ortc) {
    $("#log").html("You and " + document.getElementById("identity").innerHTML+" are now connected");

    // subscribe the chat channel
    // the onChatMessage callback function will handle new messages
    ortcClient.subscribe(chatChannel, true, onChatMessage);
  }
}

// Handle a received chat message
function onChatMessage(ortc, channel, message) {
	var receivedMessage = JSON.parse(message);
  var msgAlign = (receivedMessage.id == myId ? "right" : "left");
  
  // format message to show on log
	var msgLog = "<div class='blockquote-" + msgAlign + "'>"
  msgLog += receivedMessage.text + "<br>";
	msgLog += "<span class='time'>" + receivedMessage.sentAt + "</span>"
  msgLog += "<span class='from'> from " + receivedMessage.from + "</span></div>"
  
  // add the message to the chat log
  Log(msgLog);
}

// Send a new chat message
function sendMessage() {
	var message = {
  	id: myId,
  	text: $("#msgInput").val(),
    sentAt: new Date().toLocaleTimeString(),
    from: myName
  };
  
  ortcClient.send(chatChannel, JSON.stringify(message));
  
  // clear the input field
  $('#msgInput').val("");
}

// Adds text to the chat log
function Log(text) {
	$("#log").html(text + $("#log").html());
}

