///* Зміна картинки разом з кнопками *///

function changeButtonColor(clickedButton) {
  // Знаходимо найближчий елемент з класом .about
  const aboutElement = clickedButton.closest('.about');

  // Знаходимо усі кнопки тільки всередині найденої группи .about
  const buttons = aboutElement.querySelectorAll('.about_button');
  buttons.forEach(button => {
    button.classList.remove('about_button_active');
    const pElement = button.querySelector('p');
    pElement.classList.remove('about_button_text_active');
    pElement.classList.add('about_button_text');
    const imgElement = button.querySelector('img');
    imgElement.src = "./img/main/about_1/arrow_blue.svg";
  });

  // Додаємо клас .about_button_active тільки до кнопки, на яку клікаємо
  clickedButton.classList.add('about_button_active');
  const pElementActive = clickedButton.querySelector('p');
  pElementActive.classList.remove('about_button_text');
  pElementActive.classList.add('about_button_text_active');
  const imgElementActive = clickedButton.querySelector('img');
  imgElementActive.src = "./img/main/about_1/arrow_white.svg";

  // Отримуємо індекс натиснутої кнопки
  const buttonIndex = Array.from(buttons).indexOf(clickedButton);

  // Отримуємо всі зображення збоку
  const images = aboutElement.querySelectorAll('.about_left img');

  // Перебираємо всі зображення і змінюємо їх видимість відповідно до індексу кнопки
  images.forEach((image, index) => {
    if (index === buttonIndex) {
      // Показуємо зображення, яке відповідає натиснутій кнопці
      image.style.display = 'block';
    } else {
      // Ховаємо інші зображення
      image.style.display = 'none';
    }
  });
}

///* Плеер *///

document.addEventListener("DOMContentLoaded", function () {
  const videoPlayer = document.getElementById("videoPlayer");
  const playRightButton = document.querySelector(".btn_play_right");
  const playLeftButton = document.querySelector(".btn_play_left");
  const video = videoPlayer.querySelector("video");

  // Функція для відкриття відеоплееру
  function openVideoPlayer() {
    videoPlayer.style.display = "flex";
    video.play(); // Автоматично відтворюємо відео під час відкриття
  }

  //  Функція для закриття відеоплееру
  function closeVideoPlayer() {
    videoPlayer.style.display = "none";
    video.pause(); // Призупиняємо відео під час закриття
  }

  // Натискання на кнопку "Watch Video" відкриває відеоплеєр
  playRightButton.addEventListener("click", openVideoPlayer);
  playLeftButton.addEventListener("click", openVideoPlayer);

  // Натискання на фон закриває відеоплеєр
  videoPlayer.addEventListener("click", function (event) {
    if (event.target === videoPlayer) {
      closeVideoPlayer();
    }
  });
});

///* Анімації для цифр *///

let animationStarted = false;

function startCounterAnimation() {
  if (animationStarted) {
    return;
  }

  const dataNumbers = document.querySelectorAll('.data_numbers');
  animationStarted = true;

  dataNumbers.forEach((element) => {
    const targetNumber = parseInt(element.textContent);
    let currentNumber = 0;
    const animationDuration = 3000; // Тривалість анімації в мілісекундах
    const fontSizeStart = 32; // Початковий розмір шрифту
    const fontSizeEnd = 40; // Кінцевий розмір шрифту

    const updateNumber = () => {
      if (currentNumber < targetNumber) {
        currentNumber += 1;
        const progress = currentNumber / targetNumber;
        const fontSize = fontSizeStart + (progress * (fontSizeEnd - fontSizeStart));
        element.textContent = currentNumber;
        element.style.fontSize = fontSize + 'px';
        setTimeout(updateNumber, animationDuration / targetNumber);
      }
    };

    updateNumber();
  });
}

// Обробник події прокрутки сторінки
window.addEventListener('scroll', () => {
  const customersData = document.querySelector('.customers_data');
  const customersDataTop = customersData.getBoundingClientRect().top;

  // Якщо блок "customers_data" видно на екрані, почати анімацію
  if (customersDataTop < window.innerHeight) {
    startCounterAnimation();
  }
});

///* Зміна для кнопок у розділі Prices *///

// Функця для зняття активності з елементів
function deactivateElements() {
  const packageButtons = document.querySelectorAll('.packages_button');
  const packageTexts = document.querySelectorAll('.packages_text');
  const packageColumns = document.querySelectorAll('.package_columns');

  packageButtons.forEach(button => {
    button.classList.remove('packages_button_active');
  });

  packageTexts.forEach(text => {
    text.classList.remove('packages_text_active');
  });

  packageColumns.forEach(column => {
    column.classList.remove('package_columns_active');
  });
}

// Функція для додавання активності до вибраного елементу
function activateElement(clickedButton) {
  clickedButton.classList.add('packages_button_active');
  const packageText = clickedButton.closest('.package_columns').querySelector('.packages_text');
  packageText.classList.add('packages_text_active');

  const packageColumn = clickedButton.closest('.package_columns');
  packageColumn.classList.add('package_columns_active'); // Додайте клас активності до .package_columns

}

// Обробник подій на кнопках
const packageButtons = document.querySelectorAll('.packages_button');
packageButtons.forEach(button => {
  button.addEventListener('click', function () {
    deactivateElements(); // Зінмаємо активність зі всіх елементів
    activateElement(this); // Активуємо вибрание елемент
  });
});


