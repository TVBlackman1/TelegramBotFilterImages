import cv2.cv2 as cv


def blur(img):
    return cv.GaussianBlur(img, (5, 5), cv.BORDER_DEFAULT)
