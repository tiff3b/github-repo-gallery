//Profile info will appear here
const overview = document.querySelector(".overview");
const userName = "tiff3b";
const repoList = document.querySelector(".repo-list");

//get user info
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
    //call function that fetches repos
    getRepos();
};

//get public repos and sort by recent updatd and show up to 100 repos per page
const getRepos = async function (){
    const publicRepos = await fetch (`https://api.github.com/users/${userName}/repos?sort=updated&per_page=100`);
    const repoData = await publicRepos.json();
    //verify repos are caught
    console.log(repoData);
    //call function for repo info created below and pass the json above
    displayPublicRepos(repoData);
};

//choose data from repos to display
//use repos as the parameter so functions accepts data returned from API call above
const displayPublicRepos = function (repos){
    //loop and create list item for each repo and give a class and element for the repo name
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        //append to global variable the selects the ul 
        repoList.append(repoItem);
    }
};