from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import queue
import threading
import json

app = Flask(__name__)
CORS(app)

message_queue = queue.Queue()

@app.route("/api/newmessage", methods=["POST"])
def new_message():
    data = request.json
    print("New message:", data)
    message_queue.put(data)
    return "", 204

@app.route("/api/stream")
def stream():
    def event_stream():
        while True:
            msg = message_queue.get()
            yield f"data: {json.dumps(msg)}\n\n"

    return Response(event_stream(), content_type="text/event-stream")

if __name__ == "__main__":
    app.run(debug=True, port=5000, threaded=True)
