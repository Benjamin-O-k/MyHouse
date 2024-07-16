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
        <p class = "likes">Likes: ${group.Likes}</p>
        <p class = "descri">${group.Description}</p>
        <p>Price:$ ${group.Price}</p>
        <button class = "buy">Buy</button>
        `
        document.getElementById("card").appendChild(houseDiv);
    })
}
document.querySelector(".buy").addEventListener("click",(e) =>{
    e.preventDefault();
    let formDiv = document.getElementById("popUpForm")
    //formDiv.style.display = "block";
    //formDiv.style.display = formDiv.style.display === "none"? "block" : "none";
    formDiv.innerHTML =`
    <form class="form-container">
            <label>Please Enter Your Details</label>
            <input type="test" id="Name" placeholder="Enter Your Name">
            <input type="number" id="number" placeholder="Your Phone Number">
            <input type="email" id="email" placeholder="Enter Your Email">
            <input type = "text" id = "comments" placeholder="What are your thoughts on this house">
            <button type="submit" id = "submitInfo">Submit</button>
        </form>
    `
    alert("You have successfully purchased this house");
})
