const options = {
  timeZone: "Asia/Ho_Chi_Minh",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const formatter = new Intl.DateTimeFormat("vi-VN", options);

async function updateClock() {
  const timerElement = document.querySelector(".user-info table tr .timer");

  if (!timerElement) {
    await delay(1000);
    updateClock();
    return;
  }

  timerElement.textContent = formatter.format(new Date()) + " ";
  await delay(1000);
  updateClock();
}

updateClock();
