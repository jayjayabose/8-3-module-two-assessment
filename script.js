/**
 * NOTES TO SELF
 * Optional
 * error condition: 
 */

const URL = 'https://ghibliapi.herokuapp.com/films';
let movies = [];
let selectedMovie;

//call API and initialize movies select
fetch(URL).
then(response => response.json()).
then((json) => {
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
    if (selectedMovie === undefined) return;
    let ol = document.querySelector("#peopleList")

    selectedMovie.people.forEach(personURL => {
        let li = document.createElement("li");
        if (personURL === "https://ghibliapi.herokuapp.com/people/") {
            li.textContent = 'There are no people in this movie!';
            ol.append(li);
            return;
        };

        fetch(personURL).
        then(response => response.json()).
        then((json) => {
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
    //populate movieSelect with movie titles
    const select = document.querySelector("#movieSelect");
    movies.forEach(movie => {
        let option = document.createElement("option");
        option.setAttribute("value", movie.id);
        option.textContent = movie.title;
        select.append(option);
    });

    //update selectedMovie and display #movieDetails
    select.addEventListener("change", event => {
        selectedMovie = getMovieObj(event.target.value);
        let movieDetails = document.querySelector("#movieDetails");
        movieDetails.innerHTML = ''; 

        let movieTitle = document.createElement("h3");
        movieTitle.textContent = selectedMovie.title;
        movieDetails.append(movieTitle);

        let movieYear = document.createElement("p");
        movieYear.textContent = selectedMovie.release_date;
        movieDetails.append(movieYear);

        let movieDescription = document.createElement("p");
        movieDescription.textContent = selectedMovie.description;       
        movieDetails.append(movieDescription);
        
        //clear list of people when selected movie is changed
        let ol = document.querySelector("#peopleList")
        ol.innerHTML='';
    });
};

/**
 * returns movie object from movies array
 * @param {string} id - The ID of the movie 
 */
const getMovieObj = (id) => {
    return movies.find(element => element.id === id);
};
