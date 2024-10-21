function ClockScreen() {
  const { useState, useEffect } = React;

  const [countActive, setCountActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [breakValue, setBreakValue] = useState(5);
  const [sessionValue, setSessionValue] = useState(25);
  const [currentAction, setCurrentAction] = useState("Session");

  function breakIncrement() {
    if (breakValue >= 60) return;
    setBreakValue(breakValue + 1);
  }
  function breakDecrement() {
    if (breakValue <= 1) return;
    setBreakValue(breakValue - 1);
  }
  function sessionIncrement() {
    if (sessionValue >= 60) return;
    setSessionValue(sessionValue + 1);
  }
  function sessionDecrement() {
    if (sessionValue <= 1) return;
    setSessionValue(sessionValue - 1);
  }

  function handleReset() {
    setCountActive(false);
    setBreakValue(5);
    setSessionValue(25);
    setTimer(0);
    setCurrentAction("Session");
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;
  }

  function updateTime() {
    if (currentAction == "Session") {
      const totalSeconds = sessionValue * 60 - timer;

      if (totalSeconds < 0) {
        setTimer(0);
        setCurrentAction("Break");
      } else if (totalSeconds === 0) {
        playBeep();
      }
      return formatTime(totalSeconds);
    } else if (currentAction === "Break") {
      const totalSeconds = breakValue * 60 - timer;

      if (totalSeconds < 0) {
        setTimer(0);
        setCurrentAction("Session");
      } else if (totalSeconds === 0) {
        playBeep();
      }
      return formatTime(totalSeconds);
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      secondsLeft < 10 ? "0" + secondsLeft : secondsLeft
    }`;
  }

  function playBeep() {
    const beep = document.getElementById("beep");
    beep.currentTime = 0;
    beep.play();
  }

  useEffect(() => {
    let interval;
    if (countActive) {
      interval = setInterval(() => {
        setTimer((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countActive]);

  return (
    <div className="row vh-100 justify-content-center m-0 align-items-center">
      <div className="col-5 p-3 border border-dark border-2 rounded">
        {/* Title */}
        <div className="row m-0 mb-4">
          <h1 className="text-center p-0 m-0 fw-bold">25 + 5 Clock</h1>
        </div>
        {/* Manage length */}
        <div className="row m-0 mb-5">
          {/* Break */}
          <div className="col-6 p-0 px-5" id="break-label">
            <div className="row m-0 my-2 justify-content-center fw-bold">
              Break length
            </div>
            <div className="row m-0 text-center">
              <div
                className="col-4 p-0 btn btn-outline-dark d-flex justify-content-center align-items-center"
                id="break-increment"
                onClick={breakIncrement}>
                <i className="fa-solid fa-arrow-up"></i>
              </div>
              <div className="col-4 p-0" id="break-length">
                <span class="badge text-bg-dark fs-5">{breakValue}</span>
              </div>
              <div
                className="col-4 p-0 btn btn-outline-dark d-flex justify-content-center align-items-center"
                id="break-decrement"
                onClick={breakDecrement}>
                <i className="fa-solid fa-arrow-down"></i>
              </div>
            </div>
          </div>
          {/* Session */}
          <div className="col-6 p-0 px-5" id="session-label">
            <div className="row m-0 my-2 justify-content-center fw-bold">
              Session length
            </div>
            <div className="row m-0 text-center">
              <div
                className="col-4 p-0 btn btn-outline-dark d-flex justify-content-center align-items-center"
                id="session-increment"
                onClick={sessionIncrement}>
                <i className="fa-solid fa-arrow-up"></i>
              </div>
              <div className="col-4 p-0" id="session-length">
                <span class="badge text-bg-dark fs-5"> {sessionValue}</span>
              </div>
              <div
                className="col-4 p-0 btn btn-outline-dark d-flex justify-content-center align-items-center"
                id="session-decrement"
                onClick={sessionDecrement}>
                <i className="fa-solid fa-arrow-down"></i>
              </div>
            </div>
          </div>
        </div>
        {/* Screen */}
        <div className="row m-0 mb-2 justify-content-center">
          <div className="col-6 p-0 border border-dark border-3 rounded text-center">
            <h5 id="timer-label" className="fw-bold mt-2">
              {currentAction}
            </h5>
            <h1 id="time-left" className="fw-bold">
              {updateTime()}
            </h1>
          </div>
        </div>
        {/* Action buttons */}
        <div class="btn-group" role="group">
          <button
            type="button"
            class="play-pause-button btn btn-outline-dark"
            onClick={() => setCountActive(!countActive)}
            id="start_stop">
            <i className="fa-solid fa-play"></i>/
            <i className="fa-solid fa-pause"></i>
          </button>

          <button
            type="button"
            class="action-button btn btn-outline-dark"
            onClick={handleReset}
            id="reset">
            <i className="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
        {/* Audio beep */}
        <audio
          id="beep"
          src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
      </div>
    </div>
  );
}

ReactDOM.render(<ClockScreen />, document.querySelector("#clock-wrapper"));
