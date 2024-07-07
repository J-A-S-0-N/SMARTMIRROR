import cv2
import mediapipe as mp
import numpy as np
import pyautogui

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.0000001)

frame_width = 640
frame_height = 480

cap = cv2.VideoCapture(0)

cap.set(cv2.CAP_PROP_FRAME_WIDTH, frame_width)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, frame_height)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    flipped_frame = cv2.flip(frame, 1)  

    rgb_frame = cv2.cvtColor(flipped_frame, cv2.COLOR_BGR2RGB)

    results = hands.process(rgb_frame)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            #mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            palm_center = hand_landmarks.landmark[0]
            palm_center_x = int(palm_center.x * frame.shape[1])
            palm_center_y = int(palm_center.y * frame.shape[0])

            screen_width, screen_height = pyautogui.size()

            target_x = int(palm_center_x * (screen_width / frame.shape[1]))
            target_y = int(palm_center_y * (screen_height / frame.shape[0]))

            pyautogui.moveTo(target_x, target_y)

    # Display frame
    cv2.imshow('Hand Tracking', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release video capture
cap.release()
cv2.destroyAllWindows()
