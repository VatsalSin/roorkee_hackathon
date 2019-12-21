import numpy as np
import cv2
import sys
import os
from keras.models import Sequential
from keras.models import load_model
model = Sequential()
model = load_model('model.h5')
model.load_weights('weights.h5')
X = []
for x in os.listdir('./'+str(sys.argv[1])):
    img = cv2.imread('./'+str(sys.argv[1])+'/'+x)
    img = cv2.blur(img, (5, 5))
    img = cv2.resize(img,(128,128))
    X.append(img/255.0)
X = np.array(X)
y = model.predict(X)
damaged = 0
not_damaged = 0
for x in y:
    if x[0]>x[1]:
        not_damaged = not_damaged + 1
    else:
        damaged = damaged + 1
print("Damaged: "+str(damaged))
print("Not Damaged: "+str(not_damaged))
