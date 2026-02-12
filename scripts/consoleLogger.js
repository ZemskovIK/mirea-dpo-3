document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('contactFormValid', (event) => {
    const fromData = event.detail;

    console.clear();
    console.log('=== Данные формы контактов ===');
    console.log('Имя:', fromData.fullname);
    console.log('Email:', fromData.email);
    console.log('Тема:', fromData.topic);
    console.log('Сообщение:', fromData.message);

    const timestamp = new Date().toLocaleString('ru-RU');
    console.log('Время отправки:', timestamp);
  });
});
