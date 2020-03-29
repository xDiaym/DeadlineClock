'use strict';

async function getDeadlineTime() {
    let response = await fetch('/time');
    let time = await response.json();
    return time.deadline;
}

function getUnixTime(date) {
    if (date === null) {
        return +(new Date()).getTime() / 1000;
    }
    return +date.getTime() / 1000;
}

function normalizeTime(delta) {
    return {
        hours: Math.floor(delta / (60 * 60)),
        minutes: Math.floor(delta / 60) % 60,
        seconds: Math.floor(delta) % 60
    };
}

function formatDate(date) {
    let strHours = date.hours.toString();
    let strMinutes = date.minutes.toString();
    let strSeconds = date.seconds.toString();

    if (strHours.length < 2) {
        strHours = '0' + strHours;
    }

    if (strMinutes.length < 2) {
        strMinutes = '0' + strMinutes;
    }

    if (strSeconds.length < 2) {
        strSeconds = '0' + strSeconds;
    }

    return strHours + ':' + strMinutes + ':' + strSeconds;
}

function tick(clock, deadline) {
    let delta = deadline - getUnixTime(new Date());
    if (delta < 0) {
        clock.textContent = 'Time is running out';
        clock.style = 'color: #cf3650';
    } else {
        clock.textContent = formatDate(normalizeTime(delta));
    }
}

(async function () {
    const clock = document.getElementById('clock');
    const deadline = await getDeadlineTime();

    tick(clock, deadline);
    setInterval(tick, 1000, clock, deadline);
})();
