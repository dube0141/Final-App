/////////////////////
/// Gabriel Dubé & Brittany Serrador
/// 4/20/2015

var app = {
	loadRequirements: 0,
	init: function () {
		document.addEventListener("DOMContentLoaded", app.onDomReady);
		document.addEventListener("deviceready", app.onDeviceReady, false);
	},
	onDeviceReady: function () {
		app.loadRequirements++;
		console.log("Device is ready.");
		if (app.loadRequirements === 2) {
			app.start();
		}
	},
	onDomReady: function () {
		app.loadRequirements++;
		console.log("DOM is ready.");
		if (app.loadRequirements === 2) {
			app.start();
		}
	},
	start: function () {

		/////////////////////
		/// hammers for
		/// take-photo.js

		// Show take picture page
		var hammertime = new Hammer(document.querySelector("#p1"));
		hammertime.on('tap', function (ev) {
			showPic();
		});

		// Show list page
		var hammertime = new Hammer(document.querySelector("#p2"));
		hammertime.on('tap', function (ev) {
			loadList();
			showList();
		});

		// Take photo button
		var hammertime = new Hammer(document.querySelector("#take-photo"));
		hammertime.on('tap', function (ev) {
			takePhoto();
		});

		// Set text button
		var hammertime = new Hammer(document.querySelector("#set-text"));
		hammertime.on('tap', function (ev) {
			setText();
		});

		// save/upload button
		var hammertime = new Hammer(document.querySelector("#save"));
		hammertime.on('tap', function (ev) {
			savePhoto();
		});
	}
}

//tabs(page) navigator
var page1 = document.querySelector("#capture");
var page2 = document.querySelector("#list");

function showPic() {
	page2.style.display = "none";
	page1.style.display = "block";

}

function showList() {
	page1.style.display = "none";
	page2.style.display = "block";
}

//AJAX (GET & POST)
var req;

function createAJAXObj() {
	try {
		return new XMLHttpRequest();
	} catch (er1) {
		try {
			return new ActiveXObject("Msxml3.XMLHTTP");
		} catch (er2) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			} catch (er3) {
				try {
					return new ActiveXObject("Msxml2.XMLHTTP.3.0");
				} catch (er4) {
					try {
						return new ActiveXObject("Msxml2.XMLHTTP");
					} catch (er5) {
						try {
							return new ActiveXObject("Microsoft.XMLHTTP");
						} catch (er6) {
							return false;
						}
					}
				}
			}
		}
	}
}

function sendRequest(url, callback, postData) {
	req = createAJAXObj(), method = (postData) ? "POST" : "GET";
	if (!req) {
		return;
	}
	req.open(method, url, true);
	if (postData) {
		req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	}
	req.onreadystatechange = function () {
		if (req.readyState !== 4) {
			return;
		}
		if (req.status !== 200 && req.status !== 304) {
			return;
		}
		callback(req);
	}
	req.send(postData);
}

app.init();