const heightEl = document.querySelector(".heightInfo");
const sliderEl = document.querySelector(".slider");
const labelEl = document.querySelector(".label");
const videoEl = document.querySelector(".video");

function main() {
  window.addEventListener("deviceorientation", onOrientationChange);

  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: "environment",
      },
    })
    .then((signal) => {
      videoEl.srcObject = signal;
      videoEl.play();
    })
    .catch((err) => alert(err));
}

function onOrientationChange(e) {
  let angle = e.beta - 90;
  if (angle < 0) angle = 0;

  const distanceToObj = sliderEl.value;
  labelEl.innerHTML = `Distance to object: ${distanceToObj} meters`;

  // Math.tan(angle) = height / distance
  const height = Math.tan(angle * (Math.PI / 180)) * distanceToObj; // Radians = Degrees × π / 180
  heightEl.innerHTML = `${height.toFixed(1)}m (${angle.toFixed(1)}&deg)`;
}
