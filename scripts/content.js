(async() => {

    // inject the messsage listener
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('scripts/inject.js');
    s.onload = function() {
	this.remove();
    };
    (document.body).appendChild(s);

    // receive message from the page
    let coords = {};

    window.addEventListener("message", function (event) {
	if (event.data.type
	    && (event.data.type == 'FROM_PAGE')) {


	    coords['latitude'] = event.data.essential.lat_lon[0];
	    coords['longitude'] = event.data.essential.lat_lon[1];

	    console.log("content script");
	    console.log(coords);
	    try {
		chrome.runtime.sendMessage({type: 'COORDINATES', data: coords});
	    } catch(exception) {
		console.log("cannot send runtime message to popup.js due to:");
		console.log(exception);
	    }
	    console.log("ending");
	} else {
	    console.log("wrong event type");
	}
	    
    }, false);
 
})();
