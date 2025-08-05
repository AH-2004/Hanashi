const videoIn = document.getElementById("videoIn");
const videoOut = document.getElementById('videoOut');

let webcam = () => {
	if (navigator.mediaDevices.getUserMedia) {
		let video = navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		video.then((stream) => { videoOut.srcObject = stream; });
		video.catch((err) => { console.log(err); });
	};
};

webcam();
