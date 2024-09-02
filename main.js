// var socket = io.connect('http://' + document.domain + ':' + location.port);

// socket.on('connect', function() {
//     console.log('Connected');
// });

// socket.on('message', function(data) {
//     var li = document.createElement("li");
//     li.className = data.username === getUsername() ? 'my-message' : 'other-message';
//     li.appendChild(document.createTextNode(data.username + ": " + data.message));
//     document.getElementById("messages").appendChild(li);
//     document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
// });

// function sendMessage() {
//     var msg = document.getElementById("message").value;
//     if (msg.trim() !== '') {
//         socket.send({
//             message: msg,
//             username: getUsername()
//         });
//         document.getElementById("message").value = '';
//     }
// }

// function getUsername() {
//     return document.getElementById("username").value || "Anonymous";
// }

// // Send message on Enter key press
// document.getElementById("message").addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//         sendMessage();
//     }
// });
var socket = io.connect('http://' + document.domain + ':' + location.port);
var usernameSet = false;

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('message', function(data) {
    var li = document.createElement("li");
    li.className = data.username === getUsername() ? 'my-message' : 'other-message';
    li.appendChild(document.createTextNode(data.username + ": " + data.message));
    document.getElementById("messages").appendChild(li);
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
});

function sendMessage() {
    var msg = document.getElementById("message").value;
    var username = getUsername();

    if (!usernameSet && username.trim() !== '') {
        usernameSet = true;
        document.getElementById("username").style.display = 'none';
    }

    if (msg.trim() !== '' && usernameSet) {
        socket.send({
            message: msg,
            username: username
        });
        document.getElementById("message").value = '';
    }
}

function getUsername() {
    return document.getElementById("username").value || "Anonymous";
}

// Send message on Enter key press
document.getElementById("message").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
