const RANDOM_QUOTE_API_URL = 'http://localhost:8000/api/quotes/random/';

async function getRandomQuote() {
  try {
    const response = await fetch(RANDOM_QUOTE_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data[0].content;
  } catch (error) {
    console.error('Error fetching the quote:', error);
    return 'Error fetching the quote';
  }
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  const quoteDisplayElement = document.getElementById('quoteDisplay');
  const quoteInputElement = document.getElementById('quoteInput');

  quoteDisplayElement.innerHTML = '';
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  resetTimer();
  startTimer();
}

let timerInterval;

function startTimer() {
  const timerElement = document.getElementById('timer');
  let timeLeft = 50

  timerElement.innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      Swal.fire({
        title: 'کاتت نەما گیانە',
        text: '  دووبارە هەوڵ دەوە',
        icon: 'بەداخەوە',
        confirmButtonText: 'ئەو جارەی چ نەجوە بچی'
      }).then(() => {
        renderNewQuote();
      });
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  const timerElement = document.getElementById('timer');
  timerElement.innerText = 40
}

function handleTyping() {
  const quoteDisplayElement = document.getElementById('quoteDisplay');
  const quoteInputElement = document.getElementById('quoteInput');
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayValue = quoteInputElement.value.split('');

  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
      correct = false;
    }
  });

  if (correct) {
    clearInterval(timerInterval);
    Swal.fire({
      title: 'پیرۆزە',
      text: 'بە تەواوی نوسیت دەستخۆش',
      icon: 'بژی',
      confirmButtonText: 'OK'
    }).then(() => {
      renderNewQuote();
    });
  }
}

document.addEventListener('DOMContentLoaded', renderNewQuote);

document.getElementById('quoteInput').addEventListener('input', handleTyping);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    renderNewQuote();
  }
});