const logo = document.getElementById('logo');
const video_in = document.getElementById('video_out');
const video_out = document.getElementById('video_out');

// Controls
const toggle_mute = document.getElementById('toggle_mute');
const toggle_cam = document.getElementById('toggle_cam');


class devices {
	constructor() {
		if (navigator.mediaDevices.getUserMedia) {
			let media = navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			media.then((stream) => { console.log(stream); });
			media.catch((err) => { console.log(err); })
		};
	};
};


// Events
logo.onclick = () => { window.open('./index.html', '_self'); };

toggle_mute.onclick = () => {
	if (toggle_mute.dataset.state == 'off') {
		
	} else {
		
	};
};


// let webcam = () => {
// 	if (navigator.mediaDevices.getUserMedia) {
// 		let video = navigator.mediaDevices.getUserMedia({ video: true });
// 		video.then((stream) => { video_out.srcObject = stream; });
// 		video.catch((err) => { console.log(err); });
// 	};
// };

// let mic = () => {
// 	if (navigator.mediaDevices.getUserMedia) {
// 		let audio = navigator.mediaDevices.getUserMedia({ audio: true });
// 		audio.then((stream) => {  });
// 		audio.catch((err) => { console.log(err); });
// 	};
// };


// Note: This might be a cleaner way todo in the future.
// Src: https://stackoverflow.com/questions/27846392/access-microphone-from-a-browser-javascript

// async function getMedia(constraints) {
//   let stream = null;
//   try {
//     stream = await navigator.mediaDevices.getUserMedia(constraints);
//     console.log(stream)
//   } catch(err) {
//    document.write(err)
//   }
// }

// getMedia({ audio: true, video: true })
