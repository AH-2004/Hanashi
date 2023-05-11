const logo = document.getElementById('logo');
const video_in = document.getElementById('video_in');

logo.onclick = () => { window.open('./index.html', '_self'); };


let webcam = () => {
	if (navigator.mediaDevices.getUserMedia) {
		let media = navigator.mediaDevices.getUserMedia({ video: true });
		media.then((stream) => { video_in.srcObject = stream; });
		media.catch((err) => { console.log(err); });
	};
};

webcam();