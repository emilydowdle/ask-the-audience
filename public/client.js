var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

var voteCount = document.getElementById('vote-count');

socket.on('voteCount', function (message) {
  if (localStorage["voteCount"] != undefined) {
    totalVotes = JSON.parse(localStorage["voteCount"])
    for (var key in totalVotes){
      totalVotes[key] = totalVotes[key] + message[key];
    }
  } else {
    totalVotes = message
  };

  voteCount.innerText = 'Total Votes: ';
  for (var key in totalVotes){
    voteCount.innerText = voteCount.innerText + ' ' + key + ": " + totalVotes[key];
  }
  localStorage["voteCount"] = JSON.stringify(totalVotes)
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}
