import cv2
import pytesseract
import time

#pytesseract does image processing, path leads to tesseract, change for server code is on
pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'


#reads in file from local storage, change this part to receive image from user
img = cv2.imread('IMG_1516.jpg',0)

#threshold image to allow it to be better read
(thresh, blackAndWhiteImage) = cv2.threshold(img, 110, 255,cv2.THRESH_BINARY)

#commented out code for debugging purposes
#cv2.imshow('blackAndWhiteImage',blackAndWhiteImage)
#time1 = time.time()
#time2 = time.time()
#print(time2-time1)

#get text from image 
text = pytesseract.image_to_string(blackAndWhiteImage)

#commented out code for debugging purposes
#blackAndWhiteImage = cv2.resize(blackAndWhiteImage, (1000,1000))
#cv2.imshow('black',blackAndWhiteImage)
#print(text)

#words array to contain all words from image
words = []

#send array to be sent to user 
send = []

#index variable
i = 0

#ask in regular input method for store name, will need to be changed to accept input from user's device
storeName = input("What store is this receipt from? ")

#loop to turn individual characters read by tesseract into words that are more easily managed
while(i < len(text)):
    #include store name check
    word = ''
    while i < len(text) and text[i] != "\n":
        word += text[i]       
        i+=1        
    i+=1
    words.append(word)


#loop for Walmart receipts    
if 'Walmart' == storeName or 'WALMART' == storeName:
    #searches words array for keyword, in this case 'ST#', after keyword is found, all text before that and including it is deleted
    for i,x in enumerate(words):
        if 'ST#' in x:
            words = words[i+1:]
            break #break at end to end for loop
    #searches words array for keyword, in this case 'TOTAL', after keyword is found, all text after that and including it is deleted
    for i,x in enumerate(words):
        if 'TOTAL' in x or 'Total' in x or 'total' in x:
            words = words[:i]
            break #break at end to end for loop
    #cuts off any extra info after items that isn't useful
    for i,x in enumerate(words):
        for j,y in enumerate(x):
            if y == '0' or y=="@":
                words[i] = x[:j]
                #send.append(words[i])
                break #break at end to end for loop

#same methodology as for Walmart, cut beginning and end, then remove useless info on item lines
#same methodology for all other stores
elif 'ALDI' == storeName:
    for i,x in enumerate(words):
        if 'cashier' in x:
            words = words[i+1:]
            break
    for i,x in enumerate(words):
        if 'TOTAL' in x:
            words = words[:i]
            break
    for i,x in enumerate(words):
        for j,y in enumerate(x):
            if not y.isalpha() and y is not ' ' and y is not '/' and y is not '&':
                words[i] = x[:j]
                break
elif "Trader Joe's" == storeName or "TRADER JOE'S" == storeName:
    for i,x in enumerate(words):
        if 'OPEN' in x:
            words = words[i+1:]
            break
    for i,x in enumerate(words):
        if 'TOTAL' in x or 'Total' in x or 'total' in x:
            words = words[:i]
            break
    for i,x in enumerate(words):
        for j,y in enumerate(x):
            if not y.isalpha() and y is not ' ' and y is not '/' and y is not '&':
                words[i] = x[:j]
                break
elif "Hannaford's" == storeName:
    for i,x in enumerate(words):
        if 'Hannaford' in x or 'com' in x:
            words = words[i+1:]
            break
    for i,x in enumerate(words):
        if 'Tax' in x:
            words = words[:i]
            break
    for i,x in enumerate(words):
        for j,y in enumerate(x):
            if not y.isalpha() and y is not ' ' and y is not '/' and y is not '&':
                words[i] = x[:j]
                break
else:
    for i,x in enumerate(words):
        if 'OPEN' in x:
            words = words[i+1:]
            break
    for i,x in enumerate(words):
        if 'TOTAL' in x or 'Total' in x or 'total' in x:
            words = words[:i]
            break
    for i,x in enumerate(words):
        for j,y in enumerate(x):
            if not y.isalpha() and y is not ' ' and y is not '/' and y is not '&':
                words[i] = x[:j]
                break
#currently prints remaining receipt data, relevant data, to console.
#this will need to be changed to send relevant data to user's device
for x in words:
    if x!="":
        print(x)


#TO DO
#Interface with server
