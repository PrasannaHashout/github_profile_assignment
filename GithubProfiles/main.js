const API_URL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("PrasannaHashout");

async function getUser(username){
    const resp = await fetch(API_URL + username);
    const respData = await resp.json();
    console.log(respData);
    createUserCard(respData);
    getRepos(username);
}

async function getRepos(username){
    const resp = await fetch(API_URL + username + "/repos");
    const respData = await resp.json();
    console.log(respData);
    addReposToCard(respData);
}

function addReposToCard(repos){
    const reposEl = document.getElementById("repos");
    repos.forEach(repo => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("rep");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText =`Repository Name: ${repo.name}`;
        reposEl.appendChild(repoEl);
                
        const repoEll = document.createElement("li");
        repoEll.classList.add("rep");
        repoEll.innerText = `Node ID: ${repo.node_id}`;
        repoEl.appendChild(repoEll);

        const repoId = document.createElement("li");
        repoId.classList.add("rep");
        repoId.innerText = `ID: ${repo.id}`;
        repoEl.appendChild(repoId);

        const repofullName = document.createElement("li");
        repofullName.classList.add("rep");
        repofullName.innerText = `Full Name: ${repo.full_name}`;
        repoEl.appendChild(repofullName);

        const repoPrivate = document.createElement("li");
        repoPrivate.classList.add("rep");
        repoPrivate.innerText = `Private Status: ${repo.private}`;
        repoEl.appendChild(repoPrivate);

    })
}

function createUserCard(user){
    const cardHTML = `
        <div class="card">
            <div class="user-info">
                <h2>${user.name}</h2>
                <div id="repos">
                   
                </div>
            </div>
        </div>
    `
    main.innerHTML = cardHTML;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const user = search.value;
    if(user){
        getUser(user);
        search.value = '';
    }
})
