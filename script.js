const button = document.querySelector("#heartbeatButton");
const card = document.querySelector(".card");
const instruction = document.querySelector("#instruction");

// Two close beats followed by a restful pause — a soft "lub-dub".
const heartbeatPattern = [90, 100, 150, 860];
let heartbeatTimer = null;
let isBeating = false;

function vibrateOnce() {
  if ("vibrate" in navigator) {
    navigator.vibrate(heartbeatPattern);
  }
}

function startHeartbeat() {
  isBeating = true;
  button.classList.add("active");
  button.setAttribute("aria-pressed", "true");
  card.classList.add("active-state");
  vibrateOnce();
  heartbeatTimer = window.setInterval(vibrateOnce, 1200);
}

function stopHeartbeat() {
  isBeating = false;
  button.classList.remove("active");
  button.setAttribute("aria-pressed", "false");
  card.classList.remove("active-state");
  window.clearInterval(heartbeatTimer);
  heartbeatTimer = null;

  if ("vibrate" in navigator) {
    navigator.vibrate(0);
  }
}

button.addEventListener("click", () => {
  if (isBeating) {
    stopHeartbeat();
    return;
  }

  startHeartbeat();

  if (!("vibrate" in navigator)) {
    instruction.innerHTML = "Your browser doesn’t support vibration, but Bear’s heart is still beating for you.";
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && isBeating) stopHeartbeat();
});
