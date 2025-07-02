//Profile info will appear here
const overview = document.querySelector(".overview");
const username = "tiff3b";
//ul
const repoList = document.querySelector(".repo-list");
//where all the repo info appears
const repos = document.querySelector(".repos");
//individual repo ino
const repoData = document.querySelector(".repo-data");
//repo button
const button = document.querySelector(".view-repos");
//input search placeholder
const filterInput = document.querySelector(".filter-repos");

//get user info
const getData = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
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
    getRepos(username);
};


//get public repos and sort by recent updated and show up to 100 repos per page
const getRepos = async function (username){
    const publicRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await publicRepos.json();
    //verify repos are caught
    //console.log(repoData);
    //call function for repo info created below and pass the json above
    displayPublicRepos(repoData);
};

//choose data from repos to display
//use repos as the parameter so functions accepts data returned from API call above
const displayPublicRepos = function (allRepos){
    //display the input value
    filterInput.classList.remove("hide");
    //loop and create list item for each repo and give a class and element for the repo name
    for (const repo of allRepos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        //append to global variable the selects the ul 
        repoList.append(repoItem);
    }
};

//click event for when a repo from the list is clicked
repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepo(repoName);
    }
});

//get specific repo info 
const specificRepo = async function (repoName){
    const singleRepo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await singleRepo.json();
    //console.log(repoInfo);
    //create array of languages
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);

    // loop through languageData object to add each language to empty array
const languages = [];
    for (const language in languageData) {
       languages.push(language); 
    }
    console.log(languages);
    //call function to display the repo info using the repoInfo and languages info
    displaySpecificRepo(repoInfo, languages);
};

//function to display specific repo info

const displaySpecificRepo = function (repoInfo, languages){
    button.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p> Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
        repoData.append(div);
};

button.addEventListener("click", function (){
    repos.classList.remove("hide");
    repoData.classList.add("hide");
    button.classList.add("hide");
});

filterInput.addEventListener("input", function(e){
    const inputText= e.target.value;
    console.log(filterInput);
    //select all elements on the page with a class of repo (repo class created in displayPublicRepos)
    const allRepos = document.querySelectorAll(".repo");
    //input text assigned to lower case
    const lowercaseText = inputText.toLowerCase();

    //loop through each repo inside repo element.
    for (const repo of allRepos){
        // assign lowercase to the innerText of each repo
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(lowercaseText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});

