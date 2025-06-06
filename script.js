document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobBtn = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');
    mobBtn.addEventListener('click', () => {
        const expanded = navUl.classList.toggle('show');
        mobBtn.setAttribute('aria-expanded', expanded);
    });

    // Hero slide background switch
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        const bg = slide.getAttribute('data-bg');
        slide.style.backgroundImage = `url('${bg}')`;
    });
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000);

    // ✅ Gallery image shuffle every 3 seconds
    const gallery = document.querySelector('.gallery');
    setInterval(() => {
        const images = Array.from(gallery.children);
        images.sort(() => Math.random() - 0.5);
        images.forEach(img => gallery.appendChild(img));
    }, 3000);

    // Booking date minimum
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Booking form with WhatsApp
    const form = document.getElementById('bookingForm');
    const thanks = document.querySelector('.thank-you');
    form.addEventListener('submit', e => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const data = {
            name: form.name.value.trim(),
            phone: form.phone.value.trim(),
            email: form.email.value.trim(),
            address: form.address.value.trim(),
            service: form.service.value,
            date: form.date.value,
            requests: form.request.value.trim() || 'None'
        };

        const msg =
            `Hello Rubi Beauty Parlour,%0A%0AI would like to book an appointment:%0A` +
            `👤 Name: ${data.name}%0A📞 Phone: ${data.phone}%0A📧 Email: ${data.email}%0A🏠 Address: ${data.address}%0A` +
            `💇 Service: ${data.service}%0A📅 Date: ${data.date}%0A📝 Requests: ${data.requests}`;

        const number = '923001234567'; // Replace with your actual WhatsApp number
        window.open(`https://wa.me/${number}?text=${msg}`, '_blank');

        form.reset();
        thanks.hidden = false;
        setTimeout(() => {
            thanks.hidden = true;
        }, 5000);
    });
});
