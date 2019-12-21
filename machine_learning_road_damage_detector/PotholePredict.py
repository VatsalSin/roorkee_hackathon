import numpy as np
import cv2
import sys
from keras.models import Sequential
from keras.models import load_model
model = Sequential()
model = load_model('model.h5')
model.load_weights('weights.h5')
img = cv2.imread('./'+str(sys.argv[1]))
img = cv2.blur(img, (5, 5))
img = cv2.resize(img,(128,128))
X = []
X.append(img/255.0)
X = np.array(X)
y = model.predict(X)
if y[0][0]>y[0][1]:
	print('Not Damaged')
else:
	print('Damaged') 

