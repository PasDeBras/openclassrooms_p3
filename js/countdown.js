// ----------------------------------------------------------------------------------------
// ---------------------------------- Countdown function ----------------------------------
// ----------------------------------------------------------------------------------------

let countdownInterval;

class Countdown {
    constructor (countdown_container_ID, duration) {
        
        if (sessionStorage.getItem('storedReservationEnd')) {
            this.reservationEnd = sessionStorage.getItem('storedReservationEnd');
        } else {
            this.reservationEnd = this.obtainEndDate(duration);
            sessionStorage.setItem('storedReservationEnd', this.reservationEnd);
            sessionStorage.setItem('storedCountdownContainerID', countdown_container_ID);
        };
        
        this.countdownContainerElt = document.getElementById(countdown_container_ID);
        
        this.countdownElt = document.createElement("div");
        this.countdownElt.id = countdown_container_ID + "_countdown";

        this.countdownTextElt = document.createElement("p");
        this.countdownTextElt.id = countdown_container_ID + "_countdown_text";
        this.countdownTextElt.textContent = "Votre réservation expirera dans ...";
        
        this.countdownContainerElt.innerHTML = "";
        this.countdownContainerElt.appendChild(this.countdownElt);
        this.countdownElt.appendChild(this.countdownTextElt);
        this.countdownInterval = setInterval(()=>{
            this.tick()
        }, 1000);
    }
    obtainEndDate(duration) {
        let date = new Date();
        let endDate = date.setMinutes(date.getMinutes() + duration);
        return endDate;
    }

    tick() {
        let now = new Date();
        let distance = this.reservationEnd - now;
        if (distance < 0) {
            clearInterval(this.countdownInterval);
            this.countdownContainerElt.innerHTML = "";
            alert("Votre reservation à expirée.");
        } else {
            let _second = 1000;
            let _minute = _second * 60;
            let _hour = _minute * 60;
            let _day = _hour * 24;
            let days = Math.floor(distance / _day);
            let hours = Math.floor((distance % _day) / _hour);
            let minutes = Math.floor((distance % _hour) / _minute);
            let seconds = Math.floor((distance % _minute) / _second);
            this.countdownTextElt.textContent = "Votre réservation expirera dans : " + minutes + " minute(s) et " + seconds + " seconde(s).";
        }
    }
}

function reservationCheck() {
    if (sessionStorage.getItem('storedReservationEnd')) {
        let countDown = new Countdown(sessionStorage.getItem('storedCountdownContainerID', 20));
    } else {

    }
}
window.onload = function() {
    reservationCheck();
  };
