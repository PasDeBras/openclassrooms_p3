// ----------------------------------------------------------------------------------------
// ---------------------------------- Countdown function ----------------------------------
// ----------------------------------------------------------------------------------------

let countdownInterval;

class Countdown {
    constructor (countdown_container_ID, duration) {
        this.minutes = duration - 1; // Countdown substract current minute
        this.seconds = 59; // Countdown substract current second
        
        this.countdownContainerElt = document.getElementById(countdown_container_ID);
        
        this.countdownElt = document.createElement("div");
        this.countdownElt.id = countdown_container_ID + "_countdown";

        this.countdownTextElt = document.createElement("p");
        this.countdownTextElt.id = countdown_container_ID + "_countdown_text";
        this.countdownTextElt.textContent = "Votre réservation expirera dans : " + this.minutes + " minute(s) et " + this.seconds + " seconde(s).";
        
        this.countdownContainerElt.innerHTML = "";
        this.countdownContainerElt.appendChild(this.countdownElt);
        this.countdownElt.appendChild(this.countdownTextElt);
        this.countdownInterval = setInterval(()=>{
            this.tick()
        }, 1000);
    }

    tick () {
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
    };
    
}
