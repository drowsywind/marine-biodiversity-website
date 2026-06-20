const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.global-nav');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
});

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});

document.querySelectorAll('.global-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const pledgeMessage = document.querySelector('#pledge-message');
const savedPledge = localStorage.getItem('oceanPledge');
if (savedPledge && pledgeMessage) pledgeMessage.textContent = `あなたの宣言：${savedPledge}`;

document.querySelectorAll('[data-pledge]').forEach(button => {
  if (button.dataset.pledge === savedPledge) button.classList.add('active');
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-pledge]').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const pledge = button.dataset.pledge;
    localStorage.setItem('oceanPledge', pledge);
    if (pledgeMessage) pledgeMessage.textContent = `あなたの宣言：${pledge}`;
  });
});

document.querySelectorAll('.quiz').forEach(quiz => {
  const answer = quiz.dataset.answer;
  const result = quiz.querySelector('.quiz-result');
  quiz.querySelectorAll('[data-choice]').forEach(button => {
    button.addEventListener('click', () => {
      quiz.querySelectorAll('button').forEach(b => b.classList.remove('correct','wrong'));
      const correct = button.dataset.choice === answer;
      button.classList.add(correct ? 'correct' : 'wrong');
      const correctButton = quiz.querySelector(`[data-choice="${answer}"]`);
      if (!correct) correctButton?.classList.add('correct');
      if (result) result.textContent = correct
        ? '正解です。海は陸や川、他の国の海ともつながっています。'
        : 'もう一度確認しましょう。正解は「陸・川・海のつながりを考える」です。';
    });
  });
});
