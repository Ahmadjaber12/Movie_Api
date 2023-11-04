
const apiLink='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=abf078f0905fee42207e71169932e2a8&page=1'
const IMG_Path='https://image.tmdb.org/t/p/w1280'
const SearchApi='https://api.themoviedb.org/3/search/movie?&api_key=abf078f0905fee42207e71169932e2a8&query=';

const main=document.getElementById("section");

const form=document.getElementById("form");
const search=document.getElementById("query");

console.log(main)

returnMovies(apiLink)
function returnMovies(url){
fetch(url).then(res => res.json())
    .then(function(data){
        console.log(data.results);
        data.results.forEach(ele=>{
            const div_card =document.createElement('div');
            div_card.setAttribute('class','card');
            const div_row =document.createElement('div');
            div_row.setAttribute('class','row');
            const div_column =document.createElement('div');
            div_column.setAttribute('class','column');
            const image =document.createElement('img');
            image.setAttribute('class','thumbnail');
            image.setAttribute('id','image');

            const title =document.createElement('h3');
            title.setAttribute('id','title');

            image.src=IMG_Path+`${ele.poster_path}`
            div_card.appendChild(image)
            div_card.appendChild(title)
            div_column.appendChild(div_card)
            div_row.appendChild(div_column)
            main.appendChild(div_row)
            title.innerHTML=`${ele.title}<br><a href="movie.html?id=${ele.id}&title=${ele.title}">reviews</a>`

        });
    });
}
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    main.innerHTML=""
    const searchItem=search.value;
    if(searchItem ){
        returnMovies(SearchApi+searchItem)
        search.value=''
    }
})
