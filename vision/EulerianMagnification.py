import numpy as np
from matplotlib import pyplot as plt
import cv2
import io
import time
import dlib
from imutils import face_utils
from Temperature import Temperature
from signal_api import Signal
from Breathing import Breathing
from BloodPressure import BloodPressure
from supabase import create_client 


userID = "c9e39269-d55a-47ed-9a68-8fdfb7f87200"


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


fig = plt.figure()
ax = fig.add_subplot(111)
while True:
    ret, frame = cap.read()
    img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    x, y, w, h = 950, 300, 400, 400

    imagencortada = frame[y:y + h, x:x + w]

    rects = detector(img, 0)
    for (i, rect) in enumerate(rects):

        shape = predictor(img, rect)
        shape = face_utils.shape_to_np(shape)
    
        for (x, y) in shape:
            cv2.circle(frame, (x, y), 2, (0, 255, 0), -1)

            
    # Update the data
    heartbeat_values = heartbeat_values[1:] + [np.average(imagencortada)]
    heartbeat_times = heartbeat_times[1:] + [time.time()]
    # Draw matplotlib graph to numpy array
    ax.plot(heartbeat_times, heartbeat_values)
    preaverage = heartbeat_values.copy()
    preaverage = [i for i in preaverage if i != 0]
    preaverage = sum(preaverage) / len(preaverage)
    fig.canvas.draw()
    plotgraph = np.fromstring(fig.canvas.tostring_rgb(), dtype=np.uint8, sep='')
    plotgraph = plotgraph.reshape(fig.canvas.get_width_height()[::-1] + (3,))

    plt.cla()
    cv2.imshow('Corte', imagencortada)
    cv2.imshow('Grafica', plotgraph)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
print(preaverage)

temp = Temperature().getTemperature()
print("temperature ", temp)

breaths = Breathing().getBreathsPerMinute()
print("breathes per minute", breaths)

bloodpressre = BloodPressure().getBloodPressure()
print("mmHg", bloodpressre[0],"/",bloodpressre[1], " mmHg")

url = "https://oqymqfvmhnwgmuofdfnw.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xeW1xZnZtaG53Z211b2ZkZm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQwNzI5MjQsImV4cCI6MTk3OTY0ODkyNH0.ycRqYCaM9D49uWy-bli_R3Y9KwOMNaZ5Wxh7kdqxUBc"
supabase_client = create_client(url, key)

Signal("bpm", preaverage, userID, supabase_client).post()
Signal("brpm", breaths, userID, supabase_client).post()
Signal("temp", temp, userID, supabase_client).post()
Signal("systolic", bloodpressre[0], userID, supabase_client).post()
Signal("diastolic", bloodpressre[1], userID, supabase_client).post()

