/**
 * NOTES TO SELF
 * TO DO
 * add event listener to drop down
 */

const URL = 'https://ghibliapi.herokuapp.com/films';
let movies = [];
let selectedMovie;

console.log(URL);

fetch(URL).
then( (response) => { 
    console.log(`response:  ${response}`);
    return response.json(); 
}).
then( (json) => {
    console.log(`json:  ${json}`);
    movies = json;   
    initializeMovieOptions();
    //write movies options
}).
catch( (error) => {
    console.log(error);
});

const initializeMovieOptions = () => {
    const select = document.querySelector("#movieSelect");
    movies.forEach(movie => {
        let option = document.createElement("option");
        option.setAttribute("value", movie.id);
        option.textContent = movie.title;
        select.append(option);
    });

    select.addEventListener("change", event => {
        console.log(`getMovieObj -> title: ${getMovieObj(event.target.value).title}`);
        selectedMovie = getMovieObj(event.target.value);
        console.log(`selectedMovie -> title: ${selectedMovie}`);
        //let movieResult = document.querySelector("#movieResult")
        let movieTitle = document.querySelector("#movieTitle");
        let movieYear = document.querySelector("#movieYear");
        let movieDescription = document.querySelector("#movieDescription");

        movieTitle.textContent = selectedMovie.title;
        movieYear.textContent = selectedMovie.release_date;;
        movieDescription.textContent = selectedMovie.description;        
    });

};
//console.log(movies);
console.log(`debug`);

const getMovieObj = (id) => {
    return movies.find( element => element.id === id);
};
