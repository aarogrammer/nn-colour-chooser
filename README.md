# Neural Networking Node.js

## Introduction
Messing around with Brain.js to achieve Neural Networking in JavaScript.  
Nothing ground breaking here... Simply train the application to know what background colour is light and what is dark. If the Neural Network thinks the supplied RGB values is likely to be dark, we will apply white text to the area. If it thinks the supplied RGB values is likely to be light, it will apply black text.

## How to use
1. `npm i` to install dependencies.
2. `npm start` to start our express server.
3. Visit `localhost:8080`

## Quick example
This repo comes with a dataset added so you can quickly mess around with the colour picker and watch the text colour change. Feel free to add/delete data from the dataset. 

## Example dataset
```JSON
[{"input":{"r":0.97,"g":0.97,"b":0.97},"output":{"light":1}},{"input":{"r":0,"g":0,"b":0},"output":{"dark":1}},{"input":{"r":0,"g":1,"b":0.12},"output":{"light":1}},{"input":{"r":0,"g":0.23,"b":1},"output":{"dark":1}},{"input":{"r":0.07,"g":0.41,"b":0},"output":{"dark":1}}]
```