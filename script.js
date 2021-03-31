const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const option = document.querySelector('option');
const screen = document.getElementsByClassName('screen');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

// Copy selected seats into arr
const seatsIndex = [...selectedSeats].map(seat => 
[...seats].indexOf(seat));
localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

// Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = localStorage.getItem('selectedSeats');

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
});

// Update movie image
const movieImages = {
    '10': {
      'img':'images/doge.png',
    },
    '12': {
      'img':'images/pattocatto.png',
    },
    '8': {
      'img':'images/memes.gif',
    },
    '9': {
      'img':'images/comrade.png',
    }
  };
  function updateMovieImage() {
    const img = document.getElementById("moviePic");
    const values = movieImages[this.value];
    img.src = values['img'];
}
document.getElementById("movie").onchange = updateMovieImage;

// Seat click event
container.addEventListener('click', e => {
    if (
     e.target.classList.contains('seat') && 
     !e.target.classList.contains('occupied')
     ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// Initial count and total set
updateSelectedCount();

