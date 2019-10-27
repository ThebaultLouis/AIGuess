import numpy as np
import cv2
import tensorflow as tf
#from random import choices

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation, Flatten, Reshape, InputLayer
from tensorflow.keras.layers import Conv2D, MaxPooling2D
from tensorflow.keras.layers import LeakyReLU, Dropout
from tensorflow.keras.optimizers import Adam

class ConvNet:
    def __init__(self, img_rows=28, img_cols=28):

        self.img_rows = img_rows
        self.img_cols = img_cols
        self.input_shape = (self.img_rows,self.img_cols,1)
        self.model = None
        
        depth = 32
        dropout = 0.25
        self.model = Sequential()
        self.model.add(Conv2D(depth,3,strides=1,padding='same',activation='relu',input_shape=self.input_shape))
        self.model.add(Conv2D(depth,3,strides=1,padding='same',activation='relu'))
        self.model.add(MaxPooling2D())
        self.model.add(Dropout(dropout))
        self.model.add(Conv2D(depth*2,3,strides=1,padding='same',activation='relu'))
        self.model.add(MaxPooling2D())
        self.model.add(Dropout(dropout))
        self.model.add(Flatten())
        self.model.add(Dense(128,activation='relu'))
        self.model.add(Dropout(0.5))       
        self.model.add(Dense(49,activation='softmax'))

        self.model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

    def train(self,train_steps=20,epochs=1):
        train_images = np.load("db/k49-train-imgs.npz")['arr_0']
        train_images = train_images.reshape(train_images.shape[0], self.img_rows,self.img_cols,1)
        train_images /= 255

        train_labels = np.load("db/k49-train-labels.npz")['arr_0']
        train_labels = tf.keras.utils.to_categorical(train_labels, 49)
        print("training ...\n")
        self.model.fit(train_images,train_labels,epochs=epochs,batch_size=128,verbose=1)
        model_json = self.model.to_json()
        with open("model.json","w") as json_file:
            json_file.write(model_json)
        self.model.save_weights("model.h5")
        print("model saved\n")

    def prediction(self,image):
        image = image.reshape(1,image.shape[0], image.shape[1],1)
        image /= 255
        res = self.model.predict(image)
        return np.argmax(res)
    
