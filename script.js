// Add event listener to nav links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const sectionId = link.getAttribute('href').replace('#', '');
        document.querySelector(`section#${sectionId}`).scrollIntoView({ behavior: 'smooth' });
    });
});

const scrollButton = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


function updateClock() {
    const now = new Date();
    document.getElementById('hours').textContent = String(now.getHours()).padStart(2, '0');
    document.getElementById('minutes').textContent = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('seconds').textContent = String(now.getSeconds()).padStart(2, '0');
  }
  
  setInterval(updateClock, 1000);
  updateClock();