document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.card-header-title');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.display = 'none';
        i.querySelector('.faq-toggle').textContent = '+';
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.display = 'block';
        toggle.textContent = '−';
      }
    });
  });

  const searchBox = document.getElementById('searchBox');
  if (searchBox) {
    searchBox.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase().trim();
      const faqItems = document.querySelectorAll('.faq-item');

      faqItems.forEach(item => {
        const keywords = item.getAttribute('data-keywords').toLowerCase();
        const question = item.querySelector('h3').textContent.toLowerCase();
        const answer = item.querySelector('.content')?.textContent.toLowerCase() || '';

        const matches = keywords.includes(searchTerm) ||
          question.includes(searchTerm) ||
          answer.includes(searchTerm);

        if (searchTerm === '') {
          item.style.display = 'block';
        } else {
          item.style.display = matches ? 'block' : 'none';
        }
      });
    });
  };
});