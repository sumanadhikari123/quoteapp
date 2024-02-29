const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector(".query-button"),
  categoryName = document.querySelector(".name"),
  arrowLeftBtn = document.querySelector(".arrow-left"),
  arrowRightBtn = document.querySelector(".arrow-right"),
  categoryValue = document.querySelector(".select-categories"),
  increaseBtn = document.querySelector(".increase-button"),
  decreaseBtn = document.querySelector(".decrease-button");

let randomN;

let selectedCategory;

let quotes;

let fontSize = 20;
function randomNumberGenerator() {
  const randomNumber = Math.floor(Math.random() * 10).toFixed(0);
  return randomNumber;
}

async function QuoteGenerator() {
  try {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    const res = await fetch("./quotes.json");
    const quote = await res.json();
    quotes = quote;
    return quote;
  } catch (error) {
    console.log(err);
  }
}

async function randomQuote() {
  await QuoteGenerator();
  try {
    let value = categoryValue.value;
    if (value !== "") {
      let filterQuotes = quotes.filter((item) => item.category === value);
      quotes = filterQuotes;
      randomN = Math.floor(Math.random() * quotes.length).toFixed(0);
      quoteText.innerText = quotes[randomN].quote;
      categoryName.innerText = quotes[randomN].category;
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "Generate Random Quote";
    } else {
      randomN = randomNumberGenerator();
      quoteText.innerText = quotes[randomN].quote;
      categoryName.innerText = quotes[randomN].category;
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "Generate Random Quote";
    }
  } catch (error) {
    console.log(error);
  }
}

async function previousQuote() {
  const prevNum = randomN--;
  if (isNaN(randomN)) {
    alert("Please Generate Quote at first");
    arrowLeftBtn.classList.add("disabled");
  }
  if (randomN <= 0 && prevNum <= 0) {
    arrowLeftBtn.classList.add("disabled");
  } else {
    arrowLeftBtn.classList.remove("disabled");
    quoteText.innerText = quotes[prevNum].quote;
    categoryName.innerText = quotes[prevNum].category;
    quoteBtn.classList.remove("loading");
    quoteBtn.innerText = "Generate Random Quote";
  }
}

async function nextQuote() {
  const nextNum = randomN++;
  if (isNaN(randomN)) {
    alert("Please Generate Quote at first");
    arrowRightBtn.classList.add("disabled");
  }

  if (nextNum >= quotes.length) {
    arrowRightBtn.classList.add("disabled");
  } else {
    arrowLeftBtn.classList.remove("disabled");
    quoteText.innerText = quotes[nextNum].quote;
    categoryName.innerText = quotes[nextNum].category;
    quoteBtn.classList.remove("loading");
    quoteBtn.innerText = "Generate Random Quote";
  }
}

var icon = document.getElementById("icon");
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
};

function changeSizeBySlider() {
  var paragraph = document.querySelector(".quote");
  let slider = document.getElementById("slider");
  paragraph.style.fontSize = slider.value;
}

function increaseFontSize() {
  var currentSize = parseInt(
    window.getComputedStyle(quoteText).getPropertyValue("font-size")
  );
  var newSize = currentSize + 2;
  quoteText.style.fontSize = newSize + "px";
}

function decreaseFontSize() {
  var currentSize = parseInt(
    window.getComputedStyle(quoteText).getPropertyValue("font-size")
  );
  var newSize = currentSize - 2;
  quoteText.style.fontSize = newSize + "px";
}

quoteBtn.addEventListener("click", randomQuote);
arrowRightBtn.addEventListener("click", nextQuote);
arrowLeftBtn.addEventListener("click", previousQuote);
