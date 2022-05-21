/**
 * NOTES TO SELF
 * TO DO
 * add event listener to drop down
 */

const URL = 'https://ghibliapi.herokuapp.com/films';
let movies = [];
let selectedMovie;

console.log(URL);

//call API and initialize movies select
fetch(URL).
then( (response) => { 
    console.log(`response:  ${response}`);
    return response.json(); 
}).
then( (json) => {
    console.log(`json:  ${json}`);
    movies = json;   
    initializeMoviesSelect();
    //write movies options
}).
catch( (error) => {
    console.log(error);
});


//initialize Select People button
showPeople = document.querySelector("#show-people");
showPeople.addEventListener("click", event => {
    console.log(`button click`)
    let ol = document.querySelector("#peopleList")
    //ol.innerHTML='';
    console.log(`selectedMovie: ${selectedMovie}`);
    
    selectedMovie.people.forEach(personURL => {
        console.log(`personURL: ${personURL}`);
        let li = document.createElement("li");
        if (personURL === "https://ghibliapi.herokuapp.com/people/") {
            li.textContent = 'There are no people in this movie!';
            ol.append(li);
            return;
        };

        fetch(personURL).
        then( response => response.json()).
        then( (json) => {
            console.log(`json: ${json}`)
            li.textContent = json.name
            ol.append(li);
        }).catch(error => {
            console.log(error)
        });
    });
});


/**
 * Populates #movieSelect with movies and sets eventListeners for each
 */
const initializeMoviesSelect = () => {
    //get select element and create options
    const select = document.querySelector("#movieSelect");
    movies.forEach(movie => {
        let option = document.createElement("option");
        option.setAttribute("value", movie.id);
        option.textContent = movie.title;
        select.append(option);
    });

    //add event listener to set selectedMovie and update #movieResult
    select.addEventListener("change", event => {
        //console.log(`getMovieObj -> title: ${getMovieObj(event.target.value).title}`);
        selectedMovie = getMovieObj(event.target.value);
        //console.log(`selectedMovie -> title: ${selectedMovie}`);

        let movieTitle = document.querySelector("#movieTitle");
        let movieYear = document.querySelector("#movieYear");
        let movieDescription = document.querySelector("#movieDescription");
        movieTitle.textContent = selectedMovie.title;
        movieYear.textContent = selectedMovie.release_date;;
        movieDescription.textContent = selectedMovie.description;       
        
        let ol = document.querySelector("#peopleList")
        ol.innerHTML='';
    
    });

};


//console.log(movies);
console.log(`debug`);

const getMovieObj = (id) => {
    return movies.find( element => element.id === id);
};
