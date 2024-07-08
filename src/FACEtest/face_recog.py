from flask import Flask, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp

app = Flask(__name__)
CORS(app)

# MediaPipe setup
mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils

def detect_face():
    if quit == True:
        quit()
    # Initialize the camera
    video_capture = cv2.VideoCapture(0)

    # Initialize MediaPipe Face Detection
    with mp_face_detection.FaceDetection(min_detection_confidence=0.5) as face_detection:
        # Grab a single frame of video
        ret, frame = video_capture.read()

        # Release the handle to the webcam
        video_capture.release()

        if not ret:
            print("Failed to grab frame")
            return False

        # Convert the BGR image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process the image and detect faces
        results = face_detection.process(image)

        # Check if faces are detected
        if results.detections:
            return True
        else:
            return False

@app.route('/check_face')
def check_face():
    face_found = detect_face()
    if face_found == True:
        global quit
        quit = True
        return jsonify({'face_present': face_found})

if __name__ == '__main__':
    app.run(debug=True, port=4000)
