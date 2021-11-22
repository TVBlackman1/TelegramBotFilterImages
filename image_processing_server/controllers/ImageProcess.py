import cv2.cv2 as cv

def increase_brightness(img, alpha:float=1):
    beta = 0
    img = cv.convertScaleAbs(img, alpha=alpha, beta=beta)
    return img

def blur(img):
    return cv.GaussianBlur(img, (5, 5), cv.BORDER_DEFAULT)

def brightness_up(img):
    return increase_brightness(img, alpha=1.35)

def brightness_down(img):
    return increase_brightness(img, alpha=0.65)
