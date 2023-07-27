
const quoteContainer = document.getElementById('quote_container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new_quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loading Spinner Shown
const loading = () => {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Remove Loading Spinner
const complete = () => {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

// Show New Quote
const newQuote = () => {
	loading();
	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	if (!quote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	}

	if (quote.text.length > 80) {
		quoteText.classList.add('long_quote');
	} else {
		quoteText.textContent = quote.text;
	}
	complete();
}

// Get Quotes From API
async function getQuotes() {
	loading();
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		console.log('whoops, no quote', error);
	}
}

// On Load
getQuotes();

// tweetQuote
const tweetQuote = () => {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

// Event Listeners

// tweetQuote
twitterBtn.addEventListener('click', tweetQuote);

// newQuote
newQuoteBtn.addEventListener('click', newQuote);

