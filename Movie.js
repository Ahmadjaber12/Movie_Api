
const url=new URL(location.href)
const movieId=url.searchParams.get("id")
const movieTitle=url.searchParams.get("title")
const close=document.querySelector(".close")
const popup=document.querySelector(".popup")

const apiLink='http://localhost:4000/'


// const new_div=`<div class="row">
//                 <div class="column">
//                 <div class="card">
//                 New Review 

const main=document.getElementById("section");
const title=document.getElementById("title");

title.innerText=movieTitle;
const search=document.getElementById("query");

returnReviews(apiLink)
async function returnReviews(url){

   await fetch(url  +'getReviewsByid/'+ parseInt(movieId)).then(res => res.json())
        .then(data => { 

        data.forEach(review=>{
            console.log("hi")
                const div_card =document.createElement('div');

            div_card.innerHTML=`
            <div class="row">
            <div class="column">
                <div class="card" id=${review._id}>
                    <p>Review: <strong>${review.Review}</strong></p>
                    <p>User: <strong>${review.username}</strong></p>
                    <p><a href="#" onclick="editReview('${review._id}','${review.Review}','${review.username}')">✏️</a> <a href="#" onclick="deleteReview('${review._id}')">🗑️</a></p>
                </div>
            </div>
        </div> `           
                main.appendChild(div_card)
        });
})
 };


function editReview(id,Review,username){

    const element=document.getElementById(id);
    element.style.height="233px"
    const reviewInputId= "review"+ id;
    const userInputId=   "review"+ username;

    element.innerHTML= `
            <p><strong>Review: </strong>
            <input type="text" id=${reviewInputId} value="${Review}"></p>

            <p><strong>User: </strong>

            <input type="text" id=${userInputId} value="${username}"></p>

            <p><a href="#" onclick="saveChanges('${reviewInputId}','${userInputId}','${id}')">🗳️</a></p>



    `
    
}

async function saveChanges(reviewInputId,userInputId,id){
  const review=document.getElementById(reviewInputId).value;
  const User= document.getElementById(userInputId).value;
  const element=document.getElementById(id);


    if(User && review)
  {    const response = await fetch(apiLink + `${id}`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "username": User, "Review": review })
  });
    if (response.ok) {
        location.reload();
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorData.msg, // Display the error message received from the server
          footer: '<a href="">Why do I have this issue?</a>'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please fill all fields',
        footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  }

async function findReview(username, Review) {
    const response = await fetch(apiLink + `Reviews/${username}/${Review}`);
    const data = await response.json();
    return data;
  }

async function deleteReview(id){
    let element=document.getElementById(id).remove()
    fetch(apiLink+id,{
        method:"DELETE"}).then(res=>res.json())
    .then(res=>{
        location.reload();
    })
}
function viewBox(){
    popup.style.display="flex";
}

close.addEventListener("click",()=>{
            popup.style.display="none"
})

async function addReview() {
    const User = document.getElementById("Username").value;
    const review = document.getElementById("Review").value;
  
    if (User && review) {
      try {
        const response = await fetch(apiLink + "addReview", {
          method: "POST",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "username": User, "Review": review, "MovieId": movieId })
        });
  
        if (response.ok) {
          // If the response status is OK (e.g., 200), data is expected.
          const data = await response.json();
          location.reload();
          console.log(data);
        } else {
          // Handle the case where the request was not successful.
          throw new Error('Something went wrong! Your data is duplicated');
        }
      } catch (error) {
        // Handle fetch errors and display a Swal notification
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "data is duplicated",
          footer: '<a href="">Why do I have this issue?</a>'
        });
      }
    }
  }
  

  
