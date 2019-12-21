import matplotlib.pyplot as plt
import numpy as np
import cv2
import sys
import tensorflow as tf
dim_x = 128
dim_y = 128
dim_z = 3
input_shape = (dim_x,dim_y,dim_z)
basedir = '/home/hackathon_roorkee/dataset/train'
lables = ['negative','positive']
X = []
y = []
for x in lables:
    for images in os.listdir(basedir+x):
        img = cv2.imread(basedir+x+images)
        img = cv2.blur(img, (5, 5))
        img = cv2.resize(img,(128,128))
        X.append(img/255.0)
        if x == 'positive':
            y.append([0,1])
        else:
            y.append([1,0])
X = np.array(X)
y = np.array(y)
model = Sequential()
model.add(Convolution2D(16, 8, 8, subsample=(4, 4),border_mode='valid', input_shape=inputShape))
model.add(ELU())
model.add(Convolution2D(32, 5, 5, subsample=(2, 2), border_mode="same"))
model.add(ELU())
model.add(Convolution2D(64, 5, 5, subsample=(2, 2), border_mode="same"))
model.add(Flatten())
model.add(Dropout(.2))
model.add(ELU())
model.add(Dense(512))
model.add(ELU())
model.add(Dense(2))
model.add(Activation('softmax'))
history = model.fit(X, y, nb_epoch=100,validation_split=0.1)
model.save('model_elu.h5')
model.save_weights("weights_elu.h5")