
document.addEventListener('DOMContentLoaded', () => {
    const movieNameInput = document.getElementById('movieName');
    const releaseDateInput = document.getElementById('releaseDate');
    const addMovieButton = document.getElementById('addMovieButton');
    const movieList = document.getElementById('movieList');
    const moviesAddedNumber = document.querySelector('.moviesAddedNumber');
    const concludingText = document.querySelector('.concludingText');
    const editModal = document.getElementById('editModal');
    const editMovieNameInput = document.getElementById('editMovieName');
    const saveEditButton = document.getElementById('saveEditButton');
    const closeModalButton = document.querySelector('.close');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');



    let movies = [];
    const totalMovies = 100;
    let editIndex = null;
    let deleteIndex = null;


    addMovieButton.addEventListener('click', () => {

        console.log("Add event");
        const movieName = movieNameInput.value;
        const releaseDate = Date.now();

        // Create a Date object using the milliseconds value
        const currentDate = new Date(releaseDate);

        // Format the date as 'MM/DD/YYYY'
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        console.log(formattedDate)

        if (movieName) {
            const movie = {
                name: movieName,
                date: formattedDate
            };



            movies.push(movie);
            updateMovieList();
            clearInputs();
        } else {
            alert('Please enter a movie name.');
        }
    });



    function clearInputs() {
        movieNameInput.value = '';
    }

    function updateMovieList() {
        movieList.innerHTML = '';
        
        movies.forEach((movie, index) => {
            const movieItem = document.createElement('li');
            movieItem.classList.add('movie-item');
            movieItem.classList.add('stuff')

        const titleAndDateHolder= document.createElement('div')
        const editAndDeleteHolder= document.createElement('div')

        const movieName = document.createElement('div');
        movieName.textContent = movie.name;

        const movieDate = document.createElement('div');
        movieDate.textContent = movie.date;
        movieDate.classList.add('movie-date');

        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.addEventListener('click', () => {
            deleteIndex = index;
            deleteModal.style.display = 'block';
        });

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', () => {
            editIndex = index;
            editMovieNameInput.value = movie.name;
            editModal.style.display = 'block';
        });

        titleAndDateHolder.appendChild(movieName)
        titleAndDateHolder.appendChild(movieDate)
        editAndDeleteHolder.appendChild(deleteButton)
        editAndDeleteHolder.appendChild(editButton)

        movieItem.appendChild(titleAndDateHolder)
        movieItem.appendChild(editAndDeleteHolder)

            // movieItem.appendChild(movieName);

      
            // movieItem.appendChild(movieDate);
            
               // Create and append the delete button
          

            //    movieItem.appendChild(editButton);
            //    movieItem.appendChild(deleteButton);
               


            movieList.appendChild(movieItem);

            closeModalButton.addEventListener('click', () => {
                editModal.style.display = 'none';
            });
        
            window.addEventListener('click', (event) => {
                if (event.target === editModal) {
                    editModal.style.display = 'none';
                }
            });
        
            saveEditButton.addEventListener('click', () => {
                if (editIndex !== null && editMovieNameInput.value) {
                    movies[editIndex].name = editMovieNameInput.value;
                    updateMovieList();
                    editModal.style.display = 'none';
                } else {
                    alert('Please enter a movie name.');
                }
            });
        
        });


        

        confirmDeleteButton.addEventListener('click', () => {
            if (deleteIndex !== null) {
                movies.splice(deleteIndex, 1);
                updateMovieList();
                deleteModal.style.display = 'none';
            }
        });

        cancelDeleteButton.addEventListener('click', () => {
            deleteModal.style.display = 'none';
        });




// Update the counts
const moviesAddedCount = movies.length;
const remainingMoviesCount = totalMovies - moviesAddedCount;
moviesAddedNumber.textContent = moviesAddedCount;
concludingText.textContent = `${moviesAddedCount} out of ${remainingMoviesCount}`;
    }
    }

    

   
   
);
