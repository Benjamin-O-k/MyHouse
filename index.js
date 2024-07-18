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
        <h2>${group.Name}</h2>
        <p class = "descri">${group.Description}</p>
        <p>Price:$ ${group.Price}</p>
        <p id ="like">Like: ${group.Likes}</p>
        <button class = "like" type = "button">Like</button>
        <button class = "buy" type = "button">Buy</button>
        `
        document.getElementById("card").appendChild(houseDiv);

        houseDiv.querySelector(".like").addEventListener("click", () => {

            group.Likes++;
            const likeItems = houseDiv.querySelector('#like');
            likeItems.textContent = `Like: ${group.Likes}`;

            // Send PUT request to update likes in db.json
            fetch(`http://localhost:3000/myHouses/${group.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify({ Likes: group.Likes })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        })

        houseDiv.querySelector(".buy").addEventListener("click", (e) => {
            e.preventDefault();
            let formDiv = document.querySelector(".form-container")
            let formMain = document.querySelector(".form-popup")
            formMain.style.display = "block";
            formDiv.style.display = "block";
            //Form submission
            formDiv.addEventListener("submit", (e) => {
                e.preventDefault();
                let formData = {
                    name: e.target.Name.value,
                    phoneNumber: e.target.number.value,
                    email: e.target.email.value,
                    comments: e.target.comments.value
                };

                // Send PATCH request to update comments in db.json
                fetch(`http://localhost:3000/myHouses/${group.Comments}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept' : 'application/json'
                    },
                    body: JSON.stringify({ Comments: formData.comments })
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));

                alert("You have successfully purchased this house and submitted your details");
            });
        });
    })
}

document.getElementById("background").addEventListener('click' ,() => {
    let body = document.querySelector("body")
    body.style.background = "white";
})

document.querySelector("#search").addEventListener("click", () =>{
    let val = document.querySelector("#val").value;
    fetch(`http://localhost:3000/myHouses`)
    .then(response => response.json())
    .then(data => {
        let all = document.querySelector('#card');
        all.innerHTML = "";
        displayHouses(data.filter(item => item.id === val))
    })
})
