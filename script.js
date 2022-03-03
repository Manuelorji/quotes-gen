const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-btn");
const newQuoteBtn = document.getElementById("next-quote");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");

//set time-interval for new quotes when the btn is not clicked
setInterval(newQuote, 5000);

//loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//loading completed
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

let apiQuotes = [];

//show new quote
function newQuote() {
  loading();
  //pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   authorText.textContent = quote.author;
  //   quoteText.textContent = quote.text;

  //check if author field is blank and replace with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //check quote length to determine styling
  if (quote.text > 10) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

// get quotes from Api
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);

    apiQuotes = await response.json();
    console.log(apiQuotes);

    newQuote();
  } catch (error) {
    console.log(error);
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//add EventListeners to the btns
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load
getQuotes();
