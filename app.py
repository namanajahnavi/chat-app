# from flask import Flask, render_template
# from flask_socketio import SocketIO, send

# app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'
# socketio = SocketIO(app)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @socketio.on('message')
# def handle_message(msg):
#     print(f'Message: {msg}')
#     send(msg, broadcast=True)

# if __name__ == '__main__':
#     socketio.run(app, debug=True)

# from flask import Flask, render_template, request, jsonify
# from flask_socketio import SocketIO, emit

# app = Flask(__name__)
# socketio = SocketIO(app)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @socketio.on('sendMessage')
# def handle_message(message):
#     # Broadcast the message with a flag indicating whether it's from the current user
#     emit('message', {'message': message, 'isCurrentUser': True}, broadcast=True)

# @socketio.on('connect')
# def handle_connect():
#     # When a user connects, send a welcome message
#     emit('message', {'message': 'A new user has joined the chat', 'isCurrentUser': False}, broadcast=True)

# @socketio.on('disconnect')
# def handle_disconnect():
#     # When a user disconnects, send a message
#     emit('message', {'message': 'A user has left the chat', 'isCurrentUser': False}, broadcast=True)

# if __name__ == '__main__':
#     socketio.run(app, debug=True)

from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('message')
def handle_message(msg):
    emit('message', msg, broadcast=True)

@socketio.on('connect')
def handle_connect():
    emit('message', {'message': 'A new user has joined the chat', 'username': 'System'}, broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    emit('message', {'message': 'A user has left the chat', 'username': 'System'}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)

