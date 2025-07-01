//Profile info will appear here
const overview = document.querySelector(".overview");
const userName = "tiff3b";

const getData = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${userName}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};
getData();

//create new div for the user info
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
   <img alt="user avatar" src=${data.avatar_url} /> 
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> `;
    overview.append(div);
};
