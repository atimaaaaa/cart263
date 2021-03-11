// let mainHeading = document.getElementById(`main-heading`); // target the the heading you want
let wellSection = document.getElementById(`well-section`);
let pronoun = document.getElementById(`pronoun`);
let image = document.getElementById(`clown-image`);

//Change CSS of elements
mainHeading.style.color = `#339966`; //what do you want to manipulate? CSS? Write in camelCase
mainHeading.style[`font-size`] = `4rem`; //Can be written with square braquets in CSS way
mainHeading.innerText = `i feel great!`;

//Naming
//mainHeading.style.fontSize is same as
//mainHeading.style[`font-size`]

//Change TEXT content
pronoun.innerText = `you`; // innerText good to change words
pronoun.innerHTML = `<strong>you</strong>`; //innerHTML adds the extra HTML

//ATTRIBUTES
//
//Change Image with setAttribute
image.setAttribute(`src`, `http://loremflickr.com/320/240/clown`); //change what to what?

//Get element by its CLASS
let headers = document.getElementsByClassName(`header`); //plural ELEMENTS
for (let i = 0; i < headers.length; i++) {
  headers[i].style[`color`] = `red`; //changes all the class in a loop
}

//Get elements by TAG name
let h2s = document.getElementsByTagName(`h2`);
for (let i = 0; i < h2s.length; i++) {
  h2s[i].style[`color`] = `blue`; //changes all the class in a loop
}

//Query Selector. Select all H1 (`h1`), class(.example), H1 and H2(`h1, h2`), ID (#example),
let headers = document.querySelectorAll(`.header`);
for (let i = 0; i < headers.length; i++) {
  headers[i].style[`color`] = `red`; //changes all the class in a loop
}

//Add element to HTML
let newP = document.createElement(`p`); //child element, new element to add
newP.innerText = `gosh i do like clowns`;
let clownSection = document.getElementById(`clown-section`); //parent element
clownSection.appendChild(newP); //added child to the end of parent element

//Remove element from html
let mainHeading = document.getElementById(`main-heading`); //child element
mainHeading.parentElement.removeChild(mainHeading); //parentElements selects parent for us, remove the child element
