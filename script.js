            // ---------- СЛАЙДЕР (СТРОГО 29 ФОТО) ----------
            const slider = document.getElementById('slider');
            const prevBtn = document.getElementById('prevSlide');
            const nextBtn = document.getElementById('nextSlide');
            const dotsContainer = document.getElementById('sliderDots');
            const counter = document.getElementById('sliderCounter');

            if (slider && prevBtn && nextBtn) {
                // ✅ Укажите точные номера ваших 29 фото. 
                // Если фото называются 1.png, 2.png ... 29.png, оставьте как есть:
                const START_NUM = 1;
                const END_NUM = 29; // Всего будет 29 фотографий (29 - 1 + 1 = 29)
                
                const IMG_PATH = 'photos/';
                const IMG_EXT = '.png';
                let currentIndex = 0;
                const totalSlides = END_NUM - START_NUM + 1; // Строго 29
                let slides = [];

                function createSlide(index, photoNumber) {
                    const slide = document.createElement('div');
                    slide.className = 'slide';
                    if (index === 0) slide.classList.add('active');

                    const img = document.createElement('img');
                    img.src = `${IMG_PATH}${photoNumber}${IMG_EXT}`;
                    img.alt = `Фото ${photoNumber}`;
                    img.loading = 'lazy';

                    // Если случайно фото не загрузится - покажем простую заглушку без текста "не найдено"
                    img.addEventListener('error', () => {
                        img.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.className = 'slide-placeholder';
                        placeholder.textContent = `📸 Фото ${photoNumber}`;
                        placeholder.style.background = `#1a2a4a`; // Темно-синий фон
                        placeholder.style.display = 'flex';
                        placeholder.style.alignItems = 'center';
                        placeholder.style.justifyContent = 'center';
                        placeholder.style.fontSize = '2rem';
                        placeholder.style.color = 'white';
                        placeholder.style.height = '500px';
                        slide.prepend(placeholder);
                    });

                    slide.appendChild(img);
                    return slide;
                }

                function buildSlides() {
                    const fragment = document.createDocumentFragment();
                    for (let num = START_NUM; num <= END_NUM; num++) {
                        fragment.appendChild(createSlide(num - START_NUM, num));
                    }
                    slider.innerHTML = '';
                    slider.appendChild(fragment);
                    slides = document.querySelectorAll('#slider .slide');
                }

                function updateSlider() {
                    slides.forEach((slide, i) => {
                        slide.classList.toggle('active', i === currentIndex);
                    });
                    if (dotsContainer && dotsContainer.style.display !== 'none') {
                        const dots = dotsContainer.children;
                        for (let i = 0; i < dots.length; i++) {
                            dots[i].classList.toggle('active', i === currentIndex);
                        }
                    }
                    if (counter) {
                        counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
                    }
                }

                function createDots() {
                    if (!dotsContainer) return;
                    dotsContainer.innerHTML = '';
                    for (let i = 0; i < totalSlides; i++) {
                        const dot = document.createElement('div');
                        dot.className = 'dot';
                        if (i === currentIndex) dot.classList.add('active');
                        dot.addEventListener('click', () => {
                            currentIndex = i;
                            updateSlider();
                        });
                        dotsContainer.appendChild(dot);
                    }
                }

                buildSlides();
                createDots();
                updateSlider();
                toggleDotsOnMobile();

                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                    updateSlider();
                });
                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % totalSlides;
                    updateSlider();
                });

                let touchStartX = 0;
                slider.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                }, { passive: true });
                slider.addEventListener('touchend', (e) => {
                    const touchEndX = e.changedTouches[0].screenX;
                    const diff = touchEndX - touchStartX;
                    if (Math.abs(diff) > 50) {
                        if (diff < 0) {
                            currentIndex = (currentIndex + 1) % totalSlides;
                        } else {
                            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                        }
                        updateSlider();
                    }
                });
            }
