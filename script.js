const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const shareText = "Argentina was down 2–0 with minutes left—and still won 3–2. Is that the best comeback of the tournament? Fi's Playbook has the full story.";
const shareUrl = `${window.location.origin}${window.location.pathname}#conversation`;
const encodedMessage = encodeURIComponent(`${shareText} ${shareUrl}`);
const shareStatus = document.querySelector('.share-status');

document.querySelector('[data-share="sms"]').href = `sms:?&body=${encodedMessage}`;
document.querySelector('[data-share="whatsapp"]').href = `https://wa.me/?text=${encodedMessage}`;
document.querySelector('[data-share="email"]').href = `mailto:?subject=${encodeURIComponent("This week's Fi's Playbook conversation starter")}&body=${encodedMessage}`;

document.querySelector('[data-share="native"]').addEventListener('click', async () => {
  if (navigator.share) {
    try { await navigator.share({ title: "Fi's Playbook", text: shareText, url: shareUrl }); } catch (error) { /* Sharing was cancelled. */ }
  } else {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    shareStatus.textContent = 'Conversation starter copied!';
  }
});

document.querySelector('[data-share="copy"]').addEventListener('click', async () => {
  await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
  shareStatus.textContent = 'Conversation starter copied!';
});
