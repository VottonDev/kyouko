document.addEventListener("DOMContentLoaded", function () {
	if (window.innerWidth < 800) {
		const path = window.location.pathname;
		if (!path.includes("index2.php")) {
			window.location = "index2.php";
		}
	}
	let files = 0
	let currID = 0
	let inProgress = false

	function a(file) {
		const uploadBox = document.createElement("div");
		uploadBox.className = "leftAlert"
		if (files > 0) {
			const defaultMargin = 100;
			const addMargin = 118;
			const finalMargin = (addMargin * files) + defaultMargin;
			uploadBox.style = "margin-top: " + finalMargin + "px"
		}
		uploadBox.id = "uploadBox-" + files

		if (window.innerWidth < 800) {
			const sep = document.createElement("sep");
			sep.className = "sep"
			uploadBox.appendChild(sep)
		}

		const uploadArea = document.getElementById("alertArea");
		uploadArea.appendChild(uploadBox)

		const fileName = document.createElement("h1");
		fileName.innerHTML = file["name"];
		fileName.id = "fileName-" + files

		const progressBar = document.createElement("div");
		progressBar.className = "progressBar"
		progressBar.id = "progressBar-" + files

		const progress = document.createElement("div");
		progress.className = "progress"
		progress.style = "width:0px;"
		progress.id = "progress-" + files

		const progressPercentage = document.createElement("p");
		progressPercentage.className = "progressText"
		progressPercentage.innerHTML = "0%"
		progressPercentage.id = "progressPercentage-" + files

		progressBar.appendChild(progress)
		uploadBox.appendChild(fileName)
		uploadBox.appendChild(progressBar)
		uploadBox.appendChild(progressPercentage)

		let elements = [fileName, progress, progressPercentage, progressBar, uploadBox]
		files = files + 1
		return elements
	}

	function showUploadResult(res, elements) {

		//var code = 999
//		elements[1].style = "visibility: hidden;"
//		elements[3].style = "visibility: hidden;"
		const text = document.getElementById("progressPercentage-" + currID);
		console.log("response: " + res.target.responseText)
		let response = "NA";
		try {
			response = JSON.parse(res.target.responseText)
		} catch (e) {
			setTimeout(function (){
				text.innerHTML = "An unexpected error occurred"
			}, 1000);
			currID = currID + 1
			if (currID === 4) {
				currID = 0
				files = 0
			}
			inProgress = false
		}
		const code = response["code"];
		text.style = "margin-left: -200px; font-size:13px;"
		if (code === 200) {
			const link = response["message"]["link"];
			setTimeout(function (){
				text.innerHTML = "<a href='" + link + "' target=_blank>" + link + "</a>"	  
			}, 1000);
		} else if (code === 413) {
			setTimeout(function (){
				text.innerHTML = "Your file was too large!"	  
			}, 1000);
		} else if (code === 415) {
			setTimeout(function (){
				text.innerHTML = "File not recognised/is banned"	  
			}, 1000);
		} else {
			setTimeout(function (){
				text.innerHTML = "ERROR: " + code	  
			}, 1000);			
		}
		currID = currID + 1
		if (currID === 4) {
			currID = 0
			files = 0
		}
		inProgress = false
	}
	
	function updateProgress(evt) 
	{
		const progressSlider = document.getElementById("progress-" + currID);
		const progressBar = document.getElementById("progressBar-" + currID);
		const progressText = document.getElementById("progressPercentage-" + currID);
		if (evt.lengthComputable) 
		{  // evt.loaded the bytes the browser received
			// evt.total the total bytes set by the header
			const percent = (evt.loaded / evt.total) * 100;
			progressSlider.style = "width:" + (percent * 2) + "px;"
			progressText.innerHTML = Math.round(percent) + "%"
			if (percent === 100) {
				progressBar.style = "visibility: hidden;"
				progressSlider.style = "visibility: hidden;"
				progressText.innerHTML = "Processing..."
			}
		} 
	}   

	function startProgressBar(file, elements) {
			console.log(currID)
		const fileName = document.getElementById("fileName-" + currID);
		fileName.innerHTML = file["name"]

		let httpRequest = new XMLHttpRequest();
			httpRequest.open("POST", "https://api.kyouko.se/v2/upload", true)
			httpRequest.setRequestHeader("Authorization", "Basic " + btoa("anonymous" + ":" + ""))
			httpRequest.withCredentials = true
			httpRequest.addEventListener("load", function(data) {
				showUploadResult(data, elements)
			}, !1)
			httpRequest.upload.onprogress = updateProgress

		const formData = new FormData();
		formData.append("upload", file)

			//document.getElementById("test").innerHTML = file.name

			httpRequest.send(formData)
	}

	function e(a) {
		a.stopPropagation()
		a.preventDefault()
	}

	function start(file) {
		let elms;
		if (inProgress === false) {
			inProgress = true
			elms = a(file)
			startProgressBar(file, elms)
		} else {
			setTimeout(function () {
				start(file)
			}, 1000)
		}
	}

	function h(b, c, f) {
		e(f)
		g(b, c, f);
		let h = f.dataTransfer.files.length, i = 0;
		for (; i < h; i++) {
			const file = f.dataTransfer.files[i];
			start(file)
		}
	}

	function i(b) {
		let c = b.target.files.length, e = 0;
		for (; e < c; e++) {
			const f = b.target.files[e];
			start(f)
		}
	}

	function j(a, b) {
		e(b)
		a.click()
	}
	window.addEventListener("paste", function (b) {
		const c = (b.clipboardData || b.originalEvent.clipboardData).items;
		for (let index in c) {
			const e = c[index];
			if ("file" === e.kind) {
				const f = e.getAsFile(),
					g = new File([f], "pasted-image." + f.type.match(/\/(.*)/)[1]);
				g.type = f.type;
				start(g)
			}
		}
	});
	const dropArea = document.getElementById('upload-form');
	dropArea.addEventListener('drop', dragHandler, false)
	dropArea.addEventListener("dragover", function(e) {
		const button = document.getElementById("upload-btn");
		button.innerHTML = "Release"
	}, false)
	dropArea.addEventListener('dragleave', function(e) {
		const button = document.getElementById("upload-btn");
		button.innerHTML = "Drop"
	}, false)

	function dragHandler(e) {
		const button = document.getElementById("upload-btn");
		button.innerHTML = "Drop"
		let dt = e.dataTransfer
		let files = dt.files
	}
	const k = {
			dragCount: 0
		},
		l = document.getElementById("upload-btn");
	const m = document.getElementById("upload-input");
	m.addEventListener("change", i), l.addEventListener("click", j.bind(this, m)), l.addEventListener("drop", h.bind(this, k, l), !1), document.getElementById("upload-form").classList.add("js")
});


function SetAnonState(state) {
	if (state === false) {
		document.cookie = "IsAnon=False";
	} else {
		document.cookie = "IsAnon=True";
	}
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#anonTrue').addEventListener('click', function () {
		SetAnonState(true);
	}
	);
});