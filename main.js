//register a micro background worker
const app = new Worker("micro/app.js");

//content display object
const contentRender = {};

Object.setPrototypeOf(contentRender, {
    //get the div container 
    getContainer: function (element) {
        return document.querySelector(element);
    }
});

 
//discover all the buttons on the page
document.querySelectorAll('button').forEach((element)=> {
    //add buttons collections
    var menuButtonsArray = [];
    //push each button to the element
    menuButtonsArray.push(element);
    //show the length
    //print to the console
    console.log(menuButtonsArray);
    //need to go over each button 
    //set even listener to every button on the list
    for(var button of menuButtonsArray){
        //attach event to each button
        button.addEventListener('click', (buttonAction) => {
            //post the button id to the worker
            app.postMessage({ route: buttonAction.target.getAttribute('data-source') });
        })
    }
    //handle the events associated with the application
    app.onmessage = (response) => {
        //render content to the dom
        contentRender.getContainer('.content-placeholder').innerHTML = response.data;
    }
})
 