from flask import Flask, request, Response, jsonify
import os
import uuid
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp3', 'wav', 'ogg', 'flac'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file and allowed_file(file.filename):
        filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]  # UUID with original extension
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'url': f"{request.url_root}{UPLOAD_FOLDER}/{filename}"})
    return jsonify({'error': 'File type not allowed'})

def generate_audio(filepath):
    CHUNK = 1024
    with open(filepath, 'rb') as f:
        while True:
            data = f.read(CHUNK)
            if not data:
                break
            yield data

@app.route('/uploads/<filename>')
def audio_stream(filename):
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    return Response(generate_audio(filepath), mimetype="audio/*")

if __name__ == '__main__':
    app.run(debug=True)