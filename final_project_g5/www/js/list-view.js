/////////////////////
/// Gabriel Dubé
/// 4/20/2015

var count = 0;

function loadList() {
	var dataString = "?dev=" + device.uuid;
	var url = "http://faculty.edumedia.ca/griffis/mad9022/final-w15/list.php" + dataString;
	sendRequest(url, displayImg, null);

	function displayImg(xhr) {
		var data = JSON.parse(xhr.responseText);
		var ul = document.querySelector("#imgList");
		ul.innerHTML = null;

		if (data.code === 0) {
			for (var i = 0; i < data.thumbnails.length; i++) {
				count++;
				var a = document.createElement("a");
				var li = document.createElement("li");
				var img = document.createElement("img");
				var del = document.createElement("span");

				a.href = "#openModal";
				img.src = data.thumbnails[i].data;
				img.id = data.thumbnails[i].id;
				img.style.width = "180px";
				img.className = "listImg";

				del.innerHTML = "DELETE";
				del.id = data.thumbnails[i].id;
				del.className = "delete";

				a.appendChild(img);
				li.appendChild(a);
				li.appendChild(del);
				ul.appendChild(li);

				if (count == data.thumbnails.length) {
					deleteFunc();
					selectImgs()
				}

			}
		} else {
			alert("Connection error!")
		}
	}
}

/////////////////////
/// Gabriel Dubé
/// 4/20/2015

function deleteFunc() {
	var deleteButtons = document.querySelectorAll(".delete");
	var img_id;

	for (var i = 0; i < deleteButtons.length; i++) {
		var hammertime = new Hammer(deleteButtons[i]);
		hammertime.on('tap', function (ev) {
			var r = confirm("Are you sure you want to delete this?");

			if (r == true) {
				img_id = ev.target.id;
				var dataString = "?dev=" + device.uuid + "&img_id=" + ev.target.id;
				var url = "http://faculty.edumedia.ca/griffis/mad9022/final-w15/delete.php" + dataString;
				sendRequest(url, deleteImg, null);
			} else {
				return;
			}
		});
	}

	function deleteImg(xhr) {
		alert(xhr.responseText);
		count = 0;
		loadList();
	}
}

/////////////////////
/// Gabriel Dubé & Brittany Serrador
/// 4/20/2015

function selectImgs() {
	var allImgs = document.querySelectorAll("#imgList li img");

	for (var i = 0; i < allImgs.length; i++) {
		var hammertime = new Hammer(allImgs[i]);
		hammertime.on('tap', function (ev) {
			loadFullImg(ev);
		});
	}
}

/////////////////////
/// Brittany Serrador
/// 4/21/2015

function loadFullImg(ev) {
	var dataString = "?dev=" + device.uuid + "&img_id=" + ev.target.id;
	var url = "http://faculty.edumedia.ca/griffis/mad9022/final-w15/get.php" + dataString;
	sendRequest(url, displayFull, null);

	function displayFull(xhr) {
		var fullImg = JSON.parse(xhr.responseText);
		var img = document.createElement("img");
		img.src = fullImg.data;
		var output = document.querySelector("#openModal div");

		if (document.querySelector("#openModal img")) {
			var reload = document.querySelector("#openModal img");
			reload.parentNode.removeChild(reload);
		}

		output.appendChild(img);
	}
}