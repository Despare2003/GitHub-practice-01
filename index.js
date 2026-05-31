document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ІНТЕРАКТИВНЕ МЕНЮ: ФІЛЬТРАЦІЯ ТА КЛІКИ ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    // Фільтрація карток за категоріями
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Зміна активної кнопки фільтра
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            // Показ або приховування картки
            menuCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-type') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Подія кліку: підсвічування обраної карти страви
    menuCards.forEach(card => {
        card.addEventListener('click', () => {
            menuCards.forEach(c => c.classList.remove('highlighted'));
            card.classList.add('highlighted');
        });
    });


    // --- 2. МОДАЛЬНЕ ВІКНО АКЦІЇ ---
    const openPromoBtn = document.getElementById('openPromoBtn');
    const closePromoBtn = document.getElementById('closePromoBtn');
    const promoModal = document.getElementById('promoModal');
    const modalOkBtn = document.getElementById('modalOkBtn');

    const openModal = () => promoModal.classList.add('active');
    const closeModal = () => promoModal.classList.remove('active');

    openPromoBtn.addEventListener('click', openModal);
    closePromoBtn.addEventListener('click', closeModal);
    modalOkBtn.addEventListener('click', closeModal);

    // Закриття по кліку на темну область
    promoModal.addEventListener('click', (e) => {
        if (e.target === promoModal) closeModal();
    });


    // --- 3. ВАЛІДАЦІЯ ФОРМИ БРОНЮВАННЯ ---
    const bookingForm = document.getElementById('bookingForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const guestsInput = document.getElementById('guests');
    const successNotification = document.getElementById('successNotification');

    const phoneRegex = /^0\d{9}$/; // Формат 0XXXXXXXXX (10 цифр)

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Перевірка імені
        if (nameInput.value.trim().length < 3) {
            nameInput.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            nameInput.parentElement.classList.remove('invalid');
        }

        // Перевірка телефону
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneInput.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            phoneInput.parentElement.classList.remove('invalid');
        }

        // Перевірка кількості гостей
        const guestsCount = parseInt(guestsInput.value);
        if (isNaN(guestsCount) || guestsCount < 1 || guestsCount > 10) {
            guestsInput.parentElement.classList.add('invalid');
            isValid = false;
        } else {
            guestsInput.parentElement.classList.remove('invalid');
        }

        // Якщо все успішно
        if (isValid) {
            successNotification.style.display = 'block';
            bookingForm.reset();
            
            setTimeout(() => {
                successNotification.style.display = 'none';
            }, 5000);
        }
    });


    // --- 4. КНОПКА "ВГОРУ" ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
