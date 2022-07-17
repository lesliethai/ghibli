// object for app
const app = {}; 


// selectors & url
const movieUrl = 'https://ghibliapi.herokuapp.com/films';
app.$title = $('.mainTitle');
app.$altTitle = $('.altTitle');
app.$description = $('.description');
app.$img = $('.img');
app.$container = $('.container');

// init
app.init = () => {
    console.log('test');
    // app.filmTitle(); 
    // app.randomFilm();
    // app.displayMovie();

    // on click, generate random movie & clear old request 
    $('.generate').on('click', function(event) {
        event.preventDefault();
        app.clear(); 
        app.filmTitle();  
    })
}

// api request for info
app.filmTitle = () => {
    $.ajax({
        url: `${movieUrl}`,
        method: 'GET',
        dataType: 'json',
    }).then(data => {
        console.log(data);
        // generate random film
        app.randomFilm(data);
        // display film
        app.displayMovie(data);
    })


};

// film randomizer
app.randomFilm = (array) => {
    const index = Math.floor(Math.random() * array.length);
    return array[index]
};

// generate & display movie
app.displayMovie = (data) => {
    const movieRandomized = app.randomFilm(data);
    // retrieve titles, description, img
    const title = movieRandomized.title;
    const description = movieRandomized.description;
    const imageUrl = movieRandomized.movie_banner
    const originalTitle = movieRandomized.original_title;
    const originalTitleRoman = movieRandomized.original_title_romanised;

    // append to html
    app.$title.append(`${title}`);
    app.$altTitle.append(`${originalTitle} (${originalTitleRoman})`);
    app.$description.append(`${description}`)
    app.$img.append(`<img src="${imageUrl}" alt="Movie poster for ${title}">`)
}

// clear old selection 
app.clear = () => {
    app.$title.empty();
    app.$description.empty();
    app.$img.empty();
    app.$altTitle.empty();
}

// doc ready
$(document).ready(function() {
    app.init();
});