const APIURL="https://api.github.com/users/";
const main=document.querySelector("#main");
const getUser=async(username)=>{
    const response=await fetch(APIURL+username);
    console.log(response);
    const data= await response.json();
    console.log(data);

    const card=`
      <div class="card">
            <div><img src="${data.avatar_url}" alt="img" class="avatar"></div>
        </div>
        <div class="user-info">
            <h2>${data.name}</h2>
            <p>${data.bio}</p>
            <ul class="info">
                <li>${data.followers}<strong>  Followers</strong></li>
                <li>${data.following}<strong>  Following</strong></li>
                <li>${data.public_repos}<strong>  Repos</strong></li>
            </ul>
            <div class="repos">
            </div>
    `
    main.innerHTML=card;
    getRepos(username)
}

// getUser("udc29h")

/* <a class="repo" href="#" target="_blank">Repo</a>
<a class="repo" href="#" target="_blank">Repo</a>
<a class="repo" href="#" target="_blank">Repo</a> */

const getRepos=async(username)=>{
    const repo=document.querySelector(".repos")
    const response=await fetch(APIURL+username+"/repos")
    const data= await response.json();
    // console.log(data);
    data.forEach(
        (item) => {
        console.log(item)
        const elem=document.createElement("a")
        elem.classList.add("repo");
        elem.href=item.html_url
        elem.innerText=item.name
        elem.target="_blank"
        repo.appendChild(elem)
    }
    )
}

const formSubmit=()=> {
    const searchBox=document.querySelector("#search")
    if(searchBox.value!=""){
        getUser(searchBox.value)
    }
    return false;
} 