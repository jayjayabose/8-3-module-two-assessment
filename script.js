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
    //console.log(`response:  ${response}`);
    return response.json(); 
}).
then( (json) => {
    //console.log(`json:  ${json}`);
    movies = json;   
    initializeMoviesSelect();
}).
catch( (error) => {
    console.log(error);
});


//Add a review
let form = document.querySelector("#reviewForm");
form.addEventListener("submit", event => {
    event.preventDefault();
    let userInput = event.target.review.value;    
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.setAttribute("class", "movieTitle");
    span.textContent = selectedMovie.title + ': ';  
    li.append(span);
    li.append(userInput); //this feels clunky; is there a more elegant solution
    let ul = document.querySelector("#reviewList");
    ul.append(li);
    form.reset();
});

//Show People 
showPeople = document.querySelector("#show-people");
showPeople.addEventListener("click", event => {
    console.log(`button click`)
    let ol = document.querySelector("#peopleList")
    //ol.innerHTML='';
    console.log(`selectedMovie: ${selectedMovie}`);
    
    if (selectedMovie === undefined) return;

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

//Reset Reviews
const resetReviews = document.querySelector("#reset-reviews");
resetReviews.addEventListener("click", event => {
   const reviewList = document.querySelector("#reviewList")
   reviewList.textContent = '';
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
    return movies.find(element => element.id === id);
};
