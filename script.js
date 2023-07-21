const apiKey = 'f42b0883583f4950ad64a83cfab8db67';
const newsContainer = document.getElementById('newsContainer');

// Fetch Function
async function fetchNews() {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const data = await response.json();

    if (data.status === 'ok') {
      displayNews(data.articles);
    } else {
      showError('Failed to fetch news data. Please try again later.');
    }
  } catch (error) {
    showError('An error occurred. Please try again later.');
  }
}

// Display
function displayNews(articles) {
  newsContainer.innerHTML = '';

  articles.forEach((article) => {
    const card = createNewsCard(article);
    newsContainer.appendChild(card);
  });
}


function createNewsCard(article) {
  const card = document.createElement('div');
  card.classList.add('news-card');

  const image = document.createElement('img');
  image.classList.add('news-image');
  image.src = article.urlToImage || 'placeholder.png'; 
  image.alt = article.title;
  card.appendChild(image);

  const title = document.createElement('h2');
  title.classList.add('news-title');
  title.textContent = article.title;
  card.appendChild(title);

  const description = document.createElement('p');
  description.classList.add('news-description');
  description.textContent = article.description || 'No description available.';
  card.appendChild(description);

  const readMore = document.createElement('a');
  readMore.href = article.url;
  readMore.target = '_blank';
  readMore.textContent = 'Read More';
  card.appendChild(readMore);

  return card;
}

// For error message 
function showError(message) {
  const errorCard = document.createElement('div');
  errorCard.classList.add('news-card');

  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorCard.appendChild(errorMessage);

  newsContainer.appendChild(errorCard);
}


document.addEventListener('DOMContentLoaded', fetchNews);