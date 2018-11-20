document.addEventListener("DOMContentLoaded", function () {
	if (window.innerWidth < 800) {
		var path = window.location.pathname;
		if (!path.includes("index2.php")) {
			window.location = "index2.php";
		}
	}
	files = 0
	currID = 0
	inProgress = false

	function a(file) {
		var uploadBox = document.createElement("div")
		uploadBox.className = "leftAlert"
		if (files > 0) {
			var defaultMargin = 100;
			var addMargin = 118;
			var finalMargin = (addMargin * files) + defaultMargin
			uploadBox.style = "margin-top: " + finalMargin + "px"
		}
		uploadBox.id = "uploadBox-" + files

		if (window.innerWidth < 800) {
			var sep = document.createElement("sep")
			sep.className = "sep"
			uploadBox.appendChild(sep)
		}

		var uploadArea = document.getElementById("alertArea")
		uploadArea.appendChild(uploadBox)

		var fileName = document.createElement("h1")
		fileName.innerHTML = file["name"];
		fileName.id = "fileName-" + files
	
		var progressBar = document.createElement("div")
		progressBar.className = "progressBar"
		progressBar.id = "progressBar-" + files
	
		var progress = document.createElement("div")
		progress.className = "progress"
		progress.style = "width:0px;"
		progress.id = "progress-" + files
	
		var progressPercentage = document.createElement("p")
		progressPercentage.className = "progressText"
		progressPercentage.innerHTML = "0%"
		progressPercentage.id = "progressPercentage-" + files

		progressBar.appendChild(progress)
		uploadBox.appendChild(fileName)
		uploadBox.appendChild(progressBar)
		uploadBox.appendChild(progressPercentage)

		elements = [fileName, progress, progressPercentage, progressBar, uploadBox]
		files = files + 1
		return elements
	}



	/* function showUploadResult(a) {
		var target = a.target,
			bar = target.bar,
			row = target.row,
			percent = target.percent;
		//percent.style.visibility = "hidden" This get's set in the updateProgressBar function at 100%
		bar.style.visibility = "hidden"
		row.removeChild(bar)
		row.removeChild(percent)
		var status = target.status, 
			span = document.createElement("span");
		span.className = "file-url"
		row.appendChild(span);
		var aElement = document.createElement("a");
		aElement.setAttribute("target", "_blank");
		if (200 === status) {
			var responseBody = JSON.parse(target.responseText);
			responseBody.status === "Success" ? (aElement.textContent = responseBody.message.link.replace(/.*?:\/\//g, ""), aElement.href = responseBody.message.link, span.appendChild(aElement)) : bar.innerHTML = "Error: " + responseBody.message.body
		} else 413 === status ? (aElement.textContent = "File Too big!", span.appendChild(aElement)) : (aElement.textContent = target.responseText, span.appendChild(aElement))
	} */

	function showUploadResult(res, elements) {
		console.log("response: " + res.target.responseText)
		var response = "NA"
		try {
			response = JSON.parse(res.target.responseText)
		} catch (e) {
			setTimeout(function (){
				text.innerHTML = "An unexpected error ocurred"	  
			}, 1000);
			currID = currID + 1
			if (currID == 4) {
				currID = 0
				files = 0
			}
			inProgress = false
		}
		var code = response["code"]
		//var code = 999
//		elements[1].style = "visibility: hidden;"
//		elements[3].style = "visibility: hidden;"
		var text = document.getElementById("progressPercentage-" + currID)
		text.style = "margin-left: -200px; font-size:13px;"
		if (code == 200) {
			var link = response["message"]["link"]
			setTimeout(function (){
				text.innerHTML = "<a href='" + link + "' target=_blank>" + link + "</a>"	  
			}, 1000);
		} else if (code == 413) {
			setTimeout(function (){
				text.innerHTML = "Your file was too large!"	  
			}, 1000);
		} else if (code == 415) {
			setTimeout(function (){
				text.innerHTML = "File not recognised/is banned"	  
			}, 1000);
		} else {
			setTimeout(function (){
				text.innerHTML = "ERROR: " + code	  
			}, 1000);			
		}
		currID = currID + 1
		if (currID == 4) {
			currID = 0
			files = 0
		}
		inProgress = false
	}

	/// TAKEN FROM W3 SCHOOLS ///
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

/*	function updateProgressBar(a) {
		var target = a.target,
			bar = target.bar,
			percentElement = target.percent;
		if (a.lengthComputable) {
			var percent = Math.floor(a.loaded / a.total * 100);
			var widthToApply = Math.floor(((percent/200) * 2) * 100)
			bar.setAttribute("value", percent), percentElement.textContent = percent + "%"
			if (percent == 100) {
				percentElement.textContent = "Processing..."
				percentElement.style.marginRight = "-110px"
				bar.style.visibility = "hidden"
			}
		}
	} */
	
	function updateProgress(evt) 
	{
		var progressSlider = document.getElementById("progress-" + currID)
		var progressBar = document.getElementById("progressBar-" + currID)
		var progressText = document.getElementById("progressPercentage-" + currID)
		if (evt.lengthComputable) 
		{  // evt.loaded the bytes the browser received
			// evt.total the total bytes set by the header
			var percent = (evt.loaded / evt.total) * 100;
			progressSlider.style = "width:" + (percent * 2) + "px;"
			progressText.innerHTML = Math.round(percent) + "%"
			if (percent == 100) {
				progressBar.style = "visibility: hidden;"
				progressSlider.style = "visibility: hidden;"
				progressText.innerHTML = "Processing..."
			}
		} 
	}   

	function startProgressBar(file, elements) {


/*		sessionUsername = document.getElementById("emailSession").textContent
		sessionPassword = document.getElementById("passwordSession").textContent

		if (getCookie("isAnon") == "True") {
			sessionUsername = "anonymous"
			sessionPassword = ""
		} else {
			if (document.getElementById("emailSession") != "anonymous") {
				sessionUsername = document.getElementById("emailSession").textContent
				sessionPassword = document.getElementById("passwordSession").textContent				
			}
		} */
			console.log(currID)
			var fileName = document.getElementById("fileName-" + currID)
			fileName.innerHTML = file["name"]

			httpRequest = new XMLHttpRequest();
			httpRequest.open("POST", "https://api.kyouko.se/v2/upload", true)
			httpRequest.setRequestHeader("Authorization", "Basic " + btoa("anonymous" + ":" + ""))
			httpRequest.withCredentials = true
			httpRequest.addEventListener("load", function(data) {
				showUploadResult(data, elements)
			}, !1)
			httpRequest.upload.onprogress = updateProgress
			
			var formData = new FormData();
			formData.append("upload", file)

			//document.getElementById("test").innerHTML = file.name

			httpRequest.send(formData)
	}

	function e(a) {
		a.stopPropagation(), a.preventDefault()
	}

	function start(file) {
		if (inProgress == false) {
			inProgress = true
			elms = a(file)
			startProgressBar(file, elms)
		} else {
			setTimeout(function() {
				start(file)  
			}, 1000)
		}
	}

	function h(b, c, f) {
		e(f), g(b, c, f);
		for (var h = f.dataTransfer.files.length, i = 0; i < h; i++) {
			var file = f.dataTransfer.files[i]
			start(file)
		}
	}

	function i(b) {
		for (var c = b.target.files.length, e = 0; e < c; e++) {
			var f = b.target.files[e]
			start(f)
		}
	}

	function j(a, b) {
		e(b), a.click()
	}
	window.addEventListener("paste", function (b) {
		var c = (b.clipboardData || b.originalEvent.clipboardData).items;
		for (index in c) {
			var e = c[index];
			if ("file" === e.kind) {
				var f = e.getAsFile(),
					g = new File([f], "pasted-image." + f.type.match(/(?:[^\/]*\/)([^;]*)/)[1]);
				g.type = f.type;
				start(g)
			}
		}
	});
	var dropArea = document.getElementById('upload-form')
	dropArea.addEventListener('drop', dragHandler, false)
	dropArea.addEventListener("dragover", function(e) {
		var button = document.getElementById("upload-btn")
		button.innerHTML = "Release"
	}, false)
	dropArea.addEventListener('dragleave', function(e) {
		var button = document.getElementById("upload-btn")
		button.innerHTML = "Drop"
	}, false)

	function dragHandler(e) {
		var button = document.getElementById("upload-btn")
		button.innerHTML = "Drop"
		let dt = e.dataTransfer
		let files = dt.files
	}

	function handleFiles(files) {
		([...files]).forEach(function (file) {
			start(file)
		})
	}

	var k = {
		dragCount: 0
	},
		l = document.getElementById("upload-btn");
	var m = document.getElementById("upload-input");
	m.addEventListener("change", i), l.addEventListener("click", j.bind(this, m)), l.addEventListener("drop", h.bind(this, k, l), !1), document.getElementById("upload-form").classList.add("js")
});

/*
window.onload = function () {
	var anonF = document.getElementById('anonFalse');
	anonF.onclick = function () {
		SetAnonState(false);
	}
	var anonT = document.getElementById('anonTrue');
	anonT.onclick = function () {
		SetAnonState(true);
	}
}


function SetAnonState(state) {
	if (state == false) {
		document.cookie = "IsAnon=False";
	} else {
		document.cookie = "IsAnon=True";
	}
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#anonTrue').addEventListener('click', SetAnonState(true));
}); */