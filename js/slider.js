// ----------------------------------------------------------------------------------------
// ---------------------------- Slider ressource array ------------------------------------
// ----------------------------------------------------------------------------------------
let imagesSlider = [
	{
		src: 'media/slider/slider_img1.jpg',
		alt: 'Image slider 1 : Utlilisateur Velov',
        legend: '"Je sélectionne une station sur la carte en cliquant sur sa puce"'
	},
	{
		src: 'media/slider/slider_img2.jpg',
		alt: 'Image slider 2 : Rangée de Velov',
        legend: '"Je confirme ma demande avec le bouton "reservation" après avoir vérifié les information affichées"'
	},
	{
		src: 'media/slider/slider_img3.jpg',
		alt: 'Image slider 3 : Utlilisatrice Velov',
        legend: '"Je valide ma réservation, après avoir rempli les champs et signé."'
	},
];

// ----------------------------------------------------------------------------------------
// ----------------------------- Slider constructor ---------------------------------------
// ----------------------------------------------------------------------------------------
class SliderConstructor {
    constructor (images, sectionId) {
        this.imageActuelle = 0;
        this.numberOfImages = images.length;
        this.sectionSliderContainer = document.getElementById(sectionId);
        this.sectionSliderContainer.style.width = (this.numberOfImages * 100) + '%';
        
        let img;
        let txt;
        let divImage;
        let legend;
        
        images.forEach((image) => {
            divImage = document.createElement('div');
            divImage.style.width = (100 / this.numberOfImages) + '%';
            divImage.style.position = 'relative';

            img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.className = 'slider-img';
            divImage.appendChild(img);

            legend = document.createElement('div');
            legend.className = 'legendContainer';
            txt = document.createTextNode(image.legend);
            legend.appendChild(txt);
            divImage.appendChild(legend);

            this.sectionSliderContainer.appendChild(divImage);
        });
        this.initButtons();
        this.keyboardNav();
    }

    // Slider left & right buttons
    initButtons () {
        this.btnLeft = document.createElement('button');
        this.btnRight = document.createElement('button');
        this.btnLeft.textContent = "<";
        this.btnRight.textContent = ">";
        this.btnLeft.className = 'btn-left';
        this.btnRight.className = 'btn-right';
        document.getElementById('section_slider').appendChild(this.btnLeft);
        document.getElementById('section_slider').appendChild(this.btnRight);
    
        this.btnLeft.addEventListener('click', () => {
            if (this.imageActuelle > 0) {
                this.sliderMove('left');
            }
        });

        this.btnRight.addEventListener('click', () => {
            if (this.imageActuelle < this.numberOfImages - 1) {
                this.sliderMove('right');
            }
        });
    }

    // Slider arrow left & arrow right keyboard navigation
    keyboardNav () {
        document.body.addEventListener('keydown', (e)=> {
            if ((e.keyCode == '37') && (this.imageActuelle > 0)) {
                this.sliderMove('left');
            } else if ((e.keyCode == '39') && (this.imageActuelle < this.numberOfImages - 1)) {
                this.sliderMove('right');
            }
        })
    }

    // Slider direction
    sliderMove (direction) {
        if (direction == 'right') {
            this.imageActuelle++;
            this.sectionSliderContainer.style.marginLeft = "-" + (this.imageActuelle * 100) + '%';
        } else if (direction == 'left') {
            this.imageActuelle--;
            this.sectionSliderContainer.style.marginLeft = "-" + (this.imageActuelle * 100) + '%';
        }
    }
}

let slider = new SliderConstructor(imagesSlider, 'section_slider_container');


