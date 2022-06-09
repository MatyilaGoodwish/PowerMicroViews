//register a micro background worker thread
const app = new Worker("micro/app.js");

//content display object
const contentRender = {};

Object.setPrototypeOf(contentRender, {
    //get the div container 
    getContainer: function (element) {
        return document.querySelector(element);
    }
});

const init = {
    process: () => {
        //discover all the buttons on the page
        document.querySelectorAll('button').forEach((element) => {
            //add buttons collections
            var menuButtonsArray = [];
            //push each button to the element
            menuButtonsArray.push(element);
            //show the length
            //print to the console
            //console.log(menuButtonsArray.length);
            //need to go over each button 
            //set even listener to every button on the list
            for (var button of menuButtonsArray) {
                //attach event to each button
                button.addEventListener('click', (buttonAction) => {
                    //post the button id to the worker
                    app.postMessage({ route: buttonAction.target.getAttribute('data-source') });

                    history.pushState({}, buttonAction.target.getAttribute('data-source'), "#/" + buttonAction.target.innerHTML.split(' ').join('-'))
                })
            }
            //handle the events associated with the application
            app.onmessage = (response) => {
                //render content to the dom
                contentRender.getContainer('.content-placeholder').innerHTML = `<center> <img src="loader/loader.gif" height="140"></center>`;
                //await the content
                setTimeout(() => {
                    contentRender.getContainer('.content-placeholder').innerHTML = response.data;
                }, 4000);
            }
        })
    }
};

//we'd also like to track your location
Object.setPrototypeOf(init, {
    getLocation: () => {
        navigator.geolocation.getCurrentPosition((position) => {
            //we have your location 
            document.getElementById("location").innerHTML = `LAT: ${position.coords.latitude} LONG: ${position.coords.longitude}`
        })
    }
})

//get user location 
init.getLocation();

//keep alive store duration of website visit
var durationCount = 0;
setInterval(() => {
    //init the application 
    init.process();
   
    //check if the localstorage last duration is stored
    if (localStorage.getItem('last-duration') !== null) {
        durationCount = Number(localStorage.getItem('last-duration'));
        durationCount++;
        document.getElementById('visit-duration').innerHTML = durationCount + "<small>s duration</small>";
        localStorage.setItem('last-duration', durationCount);
    } else {
        localStorage.setItem('last-duration', 0);
    }
}, 1200);



 