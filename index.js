document.addEventListener("DOMContentLoaded",
    () => {
        fetch("http://localhost:3000/myHouses")
        .then(response => response.json())
        .then(data => displayHouses(data))
    }
)

//display all items
function displayHouses(data){
    data.forEach(group => {
        let houseDiv = document.createElement("div");
        houseDiv.className = "left";
        houseDiv.innerHTML = `
        <img src = '${group.Image}'>
        <h2>${group.Name}</h2>;
        <p class = "likes" id ="like">Like: ${group.Likes}</p>
        <p class = "descri">${group.Description}</p>
        <p>Price:$ ${group.Price}</p>
        <button class = "buy">Buy</button>
        `
        document.getElementById("card").appendChild(houseDiv);

        houseDiv.querySelector(".buy").addEventListener("click", (e) => {
            e.preventDefault();
            let formDiv = document.querySelector(".form-container")
            formDiv.style.display = "block";
            //Form submission
            formDiv.querySelector("form").addEventListener("submit", (e) => {
                e.preventDefault();
                let formData = {
                    name: e.target.Name.value,
                    phoneNumber: e.target.number.value,
                    email: e.target.email.value,
                    comments: e.target.comments.value
                };

                // Send PUT request to update comments in db.json
                fetch(`http://localhost:3000/myHouses/${group.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comments: formData.comments })
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));

                alert("You have successfully purchased this house and submitted your details");
            });
        });
    })
}

document.querySelector("#like").addEventListener("click", (e) => {
    e.preventDefault();
    let currentLikes = parseInt(e.target.textContent.split(": ")[1]);
    e.target.textContent = `Like: ${currentLikes + 1}`;
})

document.getElementById("background").addEventListener('click' ,(e) => {
    e.preventDefault();
    let body = document.querySelector("body")
    body.style.backgroundColor = "white";
    //formDiv.style.display = "none";
})
