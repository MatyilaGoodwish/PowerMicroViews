//listen to the application
onmessage = (request) => { 

    //check the request message type
    if (request.data.route) {
        /**
        * @var currentRequest object.
        */
        var currentRequest = {};

        //set the path
        currentRequest.path = request.data.route;
        currentRequest.result = '';

        //attempt to fetch the file
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `../views/${currentRequest.path}`);
            xhr.send();
            xhr.onreadystatechange = (e) => {
                if (e.target.status == 200 && e.target.readyState == 4) {
                    currentRequest.result = e.target.response;
                    //check the length of the data response
                    if (currentRequest) {
                        postMessage(currentRequest.result);
                    }
                }
            }
        } catch (error) {
            postMessage("no data found");
        }
    }

};

 