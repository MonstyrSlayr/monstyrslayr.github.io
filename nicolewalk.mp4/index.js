var myVideo = document.getElementById('daVideo');
if (typeof myVideo.loop == 'boolean') { // loop supported
  myVideo.loop = true;
} else { // loop property not supported
  myVideo.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
  }, false);
}
//...
myVideo.play();
