/////////////////////
/// Gabriel Dubé
/// 4/20/2015

var canvas, context, img, newImg, thumb1;

function takePhoto() {
	navigator.camera.getPicture(onSuccess, onFail, {
		quality: 100,
		destinationType: Camera.DestinationType.DATA_URL
	});

	function onSuccess(imageData) {
		img = document.createElement("img");
		canvas = document.querySelector("#preview");

		canvas.height = 600;
		canvas.width = 800;

		context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);

		img.onload = function (ev) {
			var imgWidth = ev.currentTarget.width;
			var imgHeight = ev.currentTarget.height;
			var aspectRatio = imgWidth / imgHeight;

			ev.currentTarget.height = canvas.height;
			ev.currentTarget.height = canvas.height * aspectRatio;

			var w = canvas.height * aspectRatio;
			var h = canvas.height;

			canvas.width = w;
			canvas.style.width = w + "px";
			context.drawImage(img, 0, 0, w, h);

			newImg = canvas.toDataURL("data:image/jpeg;base64");
		};

		img.src = "data:image/jpeg;base64," + imageData;
	}

	function onFail(message) {
		alert('Failed because: ' + message);
	}
}

/////////////////////
/// Gabriel Dubé
/// 4/20/2015

function setText() {
	if (img) {
		var radioTop = document.querySelector("#top");
		var textValue = document.querySelector("#text-field").value;

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(img, 0, 0, canvas.width, canvas.height);

		var middle = canvas.width / 2;
		var top = 50;
		var bottom = canvas.height - 50;

		context.fillStyle = "red";
		context.textAlign = "center";
		context.font = "bold 30px Roboto";

		if (radioTop.checked) {
			context.fillText(textValue, middle, top);
			newImg = canvas.toDataURL("data:image/jpeg;base64");
		} else {
			context.fillText(textValue, middle, bottom);
			newImg = canvas.toDataURL("data:image/jpeg;base64");
		}
	} else {
		alert("Please take a picture first!");
	}
}

/////////////////////
/// Gabriel Dubé
/// 4/20/2015

function savePhoto() {
	var tempoImg = document.createElement("img");
	var fullImage = canvas.toDataURL("data:image/jpeg;base64");
	
	tempoImg.addEventListener("load", function () {

		var imgWidth = tempoImg.width;
		var imgHeight = tempoImg.height;
		var aspectRatio = imgWidth / imgHeight;

		var h = 180 / aspectRatio;
		var w = 180;

		newImg.height = h;
		newImg.width = h * aspectRatio;

		canvas.height = h;
		canvas.style.height = h + "px";
		canvas.width = w;
		canvas.style.width = w + "px";
		context.drawImage(tempoImg, 0, 0, w, h);

		var thumb1 = canvas.toDataURL("image/jpeg");
		var thumbnailImage = thumb1;

		fullImage = encodeURIComponent(fullImage);
		thumbnailImage = encodeURIComponent(thumbnailImage);

		var dataString = "dev=" + device.uuid + "&thumb=" + thumbnailImage + "&img=" + fullImage;
		var url = "http://faculty.edumedia.ca/griffis/mad9022/final-w15/save.php";
		sendRequest(url, imgSaved, dataString);
	});
	
	tempoImg.src = newImg;

	function imgSaved(xhr) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		alert(xhr.responseText);
	}
}

/////////////////////
/// Gabriel Dubé
/// 4/20/2015
