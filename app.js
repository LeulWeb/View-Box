const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd2b38425d1msh34ba7a26533ba91p1b36b0jsn2dab454bc44a',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
};

var keyword = 'game'
var address = 'https://online-movie-database.p.rapidapi.com/auto-complete?q='

var initSta = 'https://online-movie-database.p.rapidapi.com/auto-complete?q='.concat(keyword)

var term = ''
var input = document.getElementById('search')

input.addEventListener('input', (e) => {
    term = e.target.value;
})

myListner = document.getElementById('find');
myListner.addEventListener('click', () => {


    getMovie(address.concat(term))
    // input.value = ''
    // term = ''
})

function getMovie(address) {
    if (term !== '') {
        document.querySelector('.movie').innerHTML = ''
    }

    fetch(address, options)
        .then(response => response.json())
        .then(response => {
            console.log(response.d)
            const list = response.d

            // 
            list.map((data) => {
                const name = data.l
                const rank = data.rank
                const year = data.y
                const auth = data.s
                const type = data.qid
                const poster = data.i.imageUrl
                const movie = `
                <li><img src=${poster}> <h2>${name}</h2>
                <p class="auth">By ${auth}</p>
                <div class="row">
                    <p>Rating ${rank}</p>
                    <p>Year ${year}</p>
                </div>
                <p>${type}</p>
                </li>`


                const display = document.querySelector('.movie')

                display.innerHTML += movie

                document.querySelector('.indicator').classList.remove('hide')
            })
        })
        .catch(err => console.error(err));

    term = ''
}


