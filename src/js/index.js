const logo = document.getElementById('logo');
const video_in = document.getElementById('video_in');
const video_out = document.getElementById('video_out');

// Controls
const toggle_mute = document.getElementById('toggle_mute');
const toggle_cam = document.getElementById('toggle_cam');

// Events
logo.onclick = () => { window.open('./index.html', '_self'); };

let webcam = () => {
	if (navigator.mediaDevices.getUserMedia) {
		let video = navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		video.then((stream) => { video_out.srcObject = stream; });
		video.catch((err) => { console.log(err); });
	};
};

webcam();
