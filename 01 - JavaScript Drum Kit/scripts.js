var allowed = true;

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; //only do stuff on transform
  this.classList.remove('playing');
};

// function removeKeyDown(e) {
//   const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
//   if (!key) return;
//   allowed = true;
//   key.classList.remove("playing");
// };
function play(item) {
  playSound({"keyCode":item})
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; // bad key...then return prevent the rest
  // if (!allowed) return;
  // allowed = false;
  audio.currentTime = 0; //rewind to start
  audio.play();
  key.classList.add("playing");

}

window.addEventListener('keydown', playSound);
const keys = document.querySelectorAll('.key');
// window.addEventListener('keyup', removeKeyDown);
keys.forEach((key) => key.addEventListener('transitionend', removeTransition))
keys.forEach((key) => key.addEventListener('click', playSound))
