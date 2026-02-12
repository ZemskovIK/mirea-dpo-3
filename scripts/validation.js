document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Сбрасываем старые ошибки
    document
      .querySelectorAll('.input.is-danger, .textarea.is-danger, select.is-danger')
      .forEach((el) => el.classList.remove('is-danger'));
    document.querySelectorAll('.help.is-danger').forEach((el) => el.remove());

    let isValid = true;

    // 1. Имя (минимум 2 слова)
    const fullname = document.getElementById('fullname');
    const fullnameValue = fullname.value.trim();

    if (fullnameValue === '') {
      showError(fullname, 'Введите имя и фамилию');
      isValid = false;
    } else if (fullnameValue.split(' ').length < 2) {
      showError(fullname, 'Введите минимум два слова (имя и фамилия)');
      isValid = false;
    }

    // 2. Email (не пустой, содержит @ и .)
    const email = document.getElementById('email');
    const emailValue = email.value.trim();

    if (emailValue === '') {
      showError(email, 'Введите email');
      isValid = false;
    } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
      showError(email, 'Введите корректный email');
      isValid = false;
    }

    // 3. Тема (обязательна, не пустое значение)
    const topic = document.getElementById('topic');
    const topicValue = topic.value;

    if (!topicValue) {
      showError(topic, 'Выберите тему обращения');
      isValid = false;
    }

    // 4. Сообщение (обязательное, макс 500 символов)
    const message = document.getElementById('message');
    const messageValue = message.value.trim();

    if (messageValue === '') {
      showError(message, 'Введите текст сообщения');
      isValid = false;
    } else if (messageValue.length > 500) {
      showError(message, 'Сообщение не должно превышать 500 символов');
      isValid = false;
    }

    // 5. Чекбокс согласия
    const agreement = document.getElementById('agreement');
    if (!agreement.checked) {
      // Для чекбокса делаем отдельное сообщение
      const parent = agreement.closest('.field') || agreement.parentNode;
      const help = document.createElement('p');
      help.classList.add('help', 'is-danger');
      help.textContent = 'Необходимо дать согласие на обработку данных';
      parent.appendChild(help);
      isValid = false;
    }

    // Если всё корректно - отправляем событие
    if (isValid) {
      const formData = {
        fullname: fullnameValue,
        email: emailValue,
        topic: topicValue,
        message: messageValue,
      };

      const validEvent = new CustomEvent('contactFormValid', { detail: formData });
      document.dispatchEvent(validEvent);

      alert('Форма отправлена! Данные выведены в консоль.');
      form.reset();
    }
  });

  // Функция показа ошибки
  function showError(input, message) {
    input.classList.add('is-danger');
    const help = document.createElement('p');
    help.classList.add('help', 'is-danger');
    help.textContent = message;
    input.parentNode.parentNode.appendChild(help);
  }

  // Сброс ошибки при вводе
  document.querySelectorAll('.input, .textarea').forEach(input => {
    input.addEventListener('input', function () {
      this.classList.remove('is-danger');
      const parent = this.parentNode.parentNode;
      const errors = parent.querySelectorAll('.help.is-danger');
      errors.forEach(el => el.remove());
    });
  })
});
