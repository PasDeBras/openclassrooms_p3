
// ----------------------------------------------------------------------------------------
// ---------------------------------- Canvas Constructor ----------------------------------
// ----------------------------------------------------------------------------------------
let canvas;
class Canvas {
    constructor (canvas_container_ID) {
        this.body = document.body;

        this.signatureCanvasInstructionElt = document.createElement("p");
        this.signatureCanvasInstructionElt.id = "signatureCanvasInstruction";
        this.signatureCanvasInstructionElt.textContent = "Appliquez votre signature :";

        this.signatureCanvasElt = document.createElement("canvas");
        this.signatureCanvasElt.width = 320;
        this.signatureCanvasElt.height = 381;
        this.signatureCanvasElt.id = "signatureCanvas";
        this.signatureCanvasElt.className = "signatureCanvas";

        this.signatureCanvasButtonElt = document.createElement("button");
        this.signatureCanvasButtonElt.id = "signatureCanvasButton";
        this.signatureCanvasButtonElt.textContent = "effacer";


        this.context = this.signatureCanvasElt.getContext("2d");
        this.paint = false;

        this.context.strokeStyle = "#000000";
        this.context.lineJoin = "round";
        this.context.lineWidth = 5;

        // addClick Function arrays, contains signature
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];

        this.addListeners();
        
        this.canvasContainer = document.getElementById(canvas_container_ID);
        this.canvasContainer.appendChild(this.signatureCanvasInstructionElt);
        this.canvasContainer.appendChild(this.signatureCanvasElt);
        this.canvasContainer.appendChild(this.signatureCanvasButtonElt);
    }

    addListeners () {
        // Mouse Down & Move Events (Allows painting on canvas & register strokes)
        this.signatureCanvasElt.addEventListener("mousedown", (e)=>{
            let mouseX = e.clientX - this.signatureCanvasElt.getBoundingClientRect().left;
            let mouseY = e.clientY - this.signatureCanvasElt.getBoundingClientRect().top;
            this.paint = true; // Allow canvas painting
            this.addClick(mouseX, mouseY);
            this.redraw();
        });

        this.signatureCanvasElt.addEventListener("mousemove", (e)=>{
            if (this.paint) { // Check if painting is allowed
                let mouseX = e.clientX - this.signatureCanvasElt.getBoundingClientRect().left;
                let mouseY = e.clientY - this.signatureCanvasElt.getBoundingClientRect().top;
                this.addClick(mouseX, mouseY, true);
                this.redraw();
            }
        });
       
        // Mouse Leave Event (Stops painting if user mouves pointer out of canvas)
        this.signatureCanvasElt.addEventListener("mouseleave", (e)=>{
            this.paint = false;
        });

        // Mouse Up Event (Stops painting if user stop clicking mouse)
        this.signatureCanvasElt.addEventListener("mouseup", (e)=>{
            this.paint = false;
        });

        // Touch Start & Move Events (Allows painting on canvas & register strokes on mobile touchscreen)
        this.signatureCanvasElt.addEventListener("touchstart", (e)=>{
            var touchX = e.clientX - this.signatureCanvasElt.getBoundingClientRect().left;
            var touchY = e.clientY - this.signatureCanvasElt.getBoundingClientRect().top;
            this.paint = true;
            this.addClick(touchX, touchY);
            this.redraw();
            console.log("touch");
        });

        this.signatureCanvasElt.addEventListener("touchmove", (e)=>{
            if (this.paint) {
                var targetTouches = e.targetTouches[0];
                var touchX = targetTouches.clientX - this.signatureCanvasElt.getBoundingClientRect().left;
                var touchY = targetTouches.clientY - this.signatureCanvasElt.getBoundingClientRect().top;
                this.addClick(touchX, touchY, true);
                this.redraw();
            }
        });

        // Touch Leave Event (Stops painting if user stops touching canvas rectangle on mobile)
        this.signatureCanvasElt.addEventListener("touchend", (e)=>{
            this.paint = false;
        });

        // Erase Canvas button (clear signature arrays)
        this.signatureCanvasButtonElt.addEventListener("click", (e)=>{
            this.clickX = [];
            this.clickY = [];
            this.clickDrag = [];

            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        });
    }

    // addClick strokes logs to signature array
    addClick (x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    };

    // Redraws strokes to canvas from signature array
    redraw () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas
        var clickXlenght = this.clickX.length;
        for(var i=0; i < clickXlenght; i++) {
            this.context.beginPath();
            if(this.clickDrag[i] && i){
                this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
            }else{
                this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
            }
            this.context.lineTo(this.clickX[i], this.clickY[i]);
            this.context.closePath();
            this.context.stroke();
        }
    };

}

// ----------------------------------------------------------------------------------------
// ---------------------------------- Form Constructor-------------------------------------
// ----------------------------------------------------------------------------------------
class Form {
    constructor (form_container_ID) {
        this.formElt = document.createElement("form");
        this.formElt.id = "section_reservation_form";
        this.formElt.method = "post";
        this.formElt.action = "traitement.php";

        this.paragraphElt = document.createElement("p");
        this.paragraphElt.id = "section_reservation_form_p";

        this.labelNameElt = document.createElement("label");
        this.labelNameElt.for = "formName";
        this.labelNameElt.textContent = "Nom : ";

        this.inputNameElt = document.createElement("input");
        this.inputNameElt.type = "text";
        this.inputNameElt.name = "formName";
        this.inputNameElt.id = "formName";
        this.inputNameElt.required = true;

        this.brElt = document.createElement("br");

        this.labelSurnameElt = document.createElement("label");
        this.labelSurnameElt.for = "formSurname";
        this.labelSurnameElt.textContent = "Prénom : ";

        this.inputSurnameElt = document.createElement("input");
        this.inputSurnameElt.type = "text";
        this.inputSurnameElt.name = "formSurname";
        this.inputSurnameElt.id = "formSurname";
        this.inputSurnameElt.required = true;

        this.submitElt = document.createElement("input");
        this.submitElt.type = "submit";
        this.submitElt.value = "Finaliser la reservation";
        this.submitElt.id = "formSubmitButton";

        document.getElementById(form_container_ID).appendChild(this.formElt);

        this.formElt.appendChild(this.paragraphElt);

        this.paragraphElt.appendChild(this.labelNameElt);
        this.paragraphElt.appendChild(this.inputNameElt);

        this.paragraphElt.appendChild(this.brElt);

        this.paragraphElt.appendChild(this.labelSurnameElt);
        this.paragraphElt.appendChild(this.inputSurnameElt);
    
        this.brElt = document.createElement("br");
        this.paragraphElt.appendChild(this.brElt);

        this.paragraphElt.appendChild(this.submitElt);
        
        this.addListeners();
    }

    addListeners () {
        // Brings countdown if all fields correctly filled
        this.formElt.addEventListener("submit", (e)=>{
            e.preventDefault(); // Prevent page reload
            if (canvas.clickX.length < 5) { // Ensures canvas contains signature
                alert("Veuillez signez dans l'encart avant de valider.")
                return;
            }
            clearInterval(countdownInterval);
            document.getElementById("section_reservation").innerHTML = "";
            
            let countDown = new Countdown('section_reservation', 20);
        })
    }

};
