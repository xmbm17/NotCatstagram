//light dark mode
const lightDarkButton = document.getElementById("lightDark");

  lightDarkButton.addEventListener("click", toggleLightDarkMode);

  function toggleLightDarkMode() {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
  }

  const initialBackgroundImage = getComputedStyle(document.body).getPropertyValue("background-image");
  if (initialBackgroundImage === 'url("./imgs/b492a1a6-aaaf-4c91-accf-31a93652f61b_1.jpg")') {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.add("dark-mode");
  }

let ts = "1686691583969";
let publicKey = "9fa901025efdc47b9023c5561ac7e0fb";
let hashVal = "82db15dcd1a058d07072328808772db9";


let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

let date = new Date();
console.log(date.getTime());

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }


  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    // div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

button.addEventListener("click", getResults = async () => {
  if (input.value.trim().length < 1) {
    // alert("Input cannot be blank");
    return;
  }


  showContainer.innerHTML = "";
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();
  // const container = document.querySelector('.container');
  // container.style.transition//
  const container = document.querySelector(".container");
  container.style.animation = "rotateBackground 2s ease";


  jsonData.data["results"].forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("card-container", "fade-in"); // Add "fade-in" class
    div.innerHTML = `
      <div class="container-character-image">
        <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}"/>
      </div>
      <div class="character-name">${element.name}</div>
      <div class="character-description">${element.description}</div>
      <div class="comments">
      <button class="add-comment-button">Add Comment</button>
      </div>
    `;

    showContainer.appendChild(div);

    setTimeout(() => {
      container.style.animation = "";
    }, 2000);

    // Trigger the transition by adding the "active" class after a short delay
    setTimeout(() => {
      div.classList.add("active");
    }, 100);

    // LIKES PART
    const likesDiv = document.createElement('div')
    likesDiv.setAttribute('id', 'likesDiv1')

    let likesCounter = 0;
    let countNum = document.createElement('div')
    countNum.innerText= likesCounter

    const likesButt = document.createElement('button')
    likesButt.setAttribute('type', "button")
    likesButt.setAttribute('id', 'like-butt')
    likesButt.style.cursor = 'pointer'

    let dislikeCounter = 0;
    let dislikeNum = document.createElement('div')
    dislikeNum.innerText = dislikeCounter

    const dislikeButt = document.createElement('button')
    dislikeButt.setAttribute('type', "button")
    dislikeButt.setAttribute('id', 'dislike-butt')
    dislikeButt.style.cursor = 'pointer'

    const nameContainer = document.querySelector(".character-name")
    nameContainer.append(likesDiv)

    likesButt.addEventListener('click' ,e =>{
      likesCounter++
      countNum.innerText= likesCounter
    })
    dislikeButt.addEventListener('click', e =>{
      dislikeCounter++
      dislikeNum.innerText = dislikeCounter
    })

    likesDiv.append(countNum,likesButt,dislikeButt,dislikeNum)
    likesDiv.style.display = 'flex'
    likesButt.innerHTML = "<i class= like-img><img src=./imgs/like.png> </i>"
      dislikeButt.innerHTML = "<i class= dislike-img><img src=./imgs/dislike.png> </i>"

    // COMMENTS PART
    // const characterDesc = document.querySelector('.character-description')
    // const commentDropDiv = document.createElement('div')
    // characterDesc.append(commentDropDiv);
    // const commentButt = document.createElement('button')

    // commentDropDiv.append(commentButt)
    // commentButt.innerText = 'arrowIcon'
    // const cD = document.querySelector('.comments12')
    // cD.style.display = 'flex'
    // cD.style.justifyContent = 'center'

    const commentArrow = document.querySelector('.add-comment-button')
    const body = document.querySelector('body')


    commentArrow.addEventListener('click', handleClick);

      function handleClick(e) {
        const cD = document.createElement('div')
        body.append(cD)
        cD.setAttribute('class', 'comments12')
        cD.style.display = 'flex'
        cD.style.justifyContent = 'center'

        const div = document.createElement('div');
        div.setAttribute('id', 'commentsDiv12');

        const testDiv = document.createElement('div')
        testDiv.setAttribute('id', 'tester-id')



        const inputC = document.createElement('input');
        inputC.setAttribute('class','comIn' )

        const submitButt = document.createElement('button');
        submitButt.setAttribute('id', 'comment-submit')
        submitButt.setAttribute('type', 'button')
        submitButt.innerText = 'SUBMIT COMMENT'

        submitButt.addEventListener('click', e =>{
          // const newDiv = document.createElement('div')
          // newDiv.setAttribute('id', 'submitDiv')
          let li = document.createElement('li')
          li.setAttribute('class', 'comment-list')

          li.innerText = inputC.value;

          ulC.append(li)

        })

        const ulC = document.createElement('ul');
        testDiv.append(ulC)

        cD.append(div, testDiv);
        div.append(inputC, submitButt);
        // let secondDiv = document.querySelector('#commentsDiv12')
        // secondDiv.appendChild(ulC)

        // textAreaC.setAttribute('rows', '4');
        inputC.setAttribute('placeholder', 'Enter your own ');
        console.log('WORKS');

        commentArrow.removeEventListener('click', handleClick);
      };


  });


});


window.onload = () => {
  getResults();
};
