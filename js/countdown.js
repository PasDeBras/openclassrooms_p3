// ----------------------------------------------------------------------------------------
// ---------------------------------- Countdown function ----------------------------------
// ----------------------------------------------------------------------------------------

let countdownInterval;

class Countdown {
    constructor (countdown_container_ID, duration) {
        this.reservationEnd = this.obtainEndDate(duration);


        /* this.minutes = duration - 1; // Countdown substract current minute
        this.seconds = 59; // Countdown substract current second */
        
        this.countdownContainerElt = document.getElementById(countdown_container_ID);
        
        this.countdownElt = document.createElement("div");
        this.countdownElt.id = countdown_container_ID + "_countdown";

        this.countdownTextElt = document.createElement("p");
        this.countdownTextElt.id = countdown_container_ID + "_countdown_text";
        this.countdownTextElt.textContent = "Votre réservation expirera dans : minute(s) et seconde(s).";
        
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
    
    /* tick () {
        if (this.seconds > 1) {
            this.seconds--
            this.countdownTextElt.textContent = "Votre réservation expirera dans : " + this.minutes + " minute(s) et " + this.seconds + " seconde(s).";
        } else {
            this.minutes--;
            if (this.minutes < 0){
                clearInterval(this.countdownInterval);
                this.countdownContainerElt.innerHTML = "";
                alert("Votre reservation à expirée."); 
            } else {
                this.seconds = 60;
                this.countdownTextElt.textContent = "Votre réservation expirera dans : " + this.minutes + " minute(s) et 00 seconde(s)."; 
            }
        }
    }; */
    
}
