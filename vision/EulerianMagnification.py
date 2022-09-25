import numpy as np
from matplotlib import pyplot as plt
import cv2
import io
import time
import dlib
from imutils import face_utils
from signal_api import Signal

# Camera stream
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1280)
cap.set(cv2.CAP_PROP_FPS, 30)
# Video stream (optional, not tested)
# cap = cv2.VideoCapture("video.mp4")
# Image crop
x, y, w, h = 950, 300, 400, 400
heartbeat_count = 128
heartbeat_values = [0]*heartbeat_count
heartbeat_times = [time.time()]*heartbeat_count




 
p = "D:\programacion\\ajolote\\vision\shape_predictor_68_face_landmarks.dat"
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(p)

sumoflecture = 0
countoflectures = 0

fig = plt.figure()
ax = fig.add_subplot(111)
while True:
    ret, frame = cap.read()
    img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    x, y, w, h = 950, 300, 400, 400

    crop_img = frame[y:y + h, x:x + w]

    rects = detector(img, 0)
    for (i, rect) in enumerate(rects):

        shape = predictor(img, rect)
        shape = face_utils.shape_to_np(shape)
    
        for (x, y) in shape:
            cv2.circle(frame, (x, y), 2, (0, 255, 0), -1)

            
    # Update the data
    heartbeat_values = heartbeat_values[1:] + [np.average(crop_img)]
    heartbeat_times = heartbeat_times[1:] + [time.time()]
    # Draw matplotlib graph to numpy array
    ax.plot(heartbeat_times, heartbeat_values)
    #print(heartbeat_times)
    sumoflecture += heartbeat_times[0]
    countoflectures += 1
    fig.canvas.draw()
    plot_img_np = np.fromstring(fig.canvas.tostring_rgb(),
                                dtype=np.uint8, sep='')
    plot_img_np = plot_img_np.reshape(fig.canvas.get_width_height()[::-1] + (3,))
    countoflectures += 1
    plt.cla()
    # Display the frames
    cv2.imshow('Crop', crop_img)
    cv2.imshow('Graph', plot_img_np)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
res = sumoflecture / countoflectures / 10000000
print(res)

signal = Signal("BPM", res, "b38375c8-1a43-42b9-b711-53df7d4434d5")
# print(signal.get_signal(""))
signal.post()
