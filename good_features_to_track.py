import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt

amount_of_points = 10

img = cv.imread('b.jpg')

# get current time
start = cv.getTickCount()

gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
corners = cv.goodFeaturesToTrack(gray, amount_of_points, 0.01, 10)
corners = np.int0(corners)
end = cv.getTickCount()
time = (end - start) / cv.getTickFrequency()
print("Time: ", time)
for i in corners:
    x, y = i.ravel()
    cv.circle(img, (x, y), 3, 255, -1)
plt.imshow(img), plt.show()
