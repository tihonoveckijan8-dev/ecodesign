            // ---------- СЛАЙДЕР (СТРОГО 29 ФОТО) ----------
            const slider = document.getElementById('slider');
            const prevBtn = document.getElementById('prevSlide');
            const nextBtn = document.getElementById('nextSlide');
            const dotsContainer = document.getElementById('sliderDots');
            const counter = document.getElementById('sliderCounter');

            if (slider && prevBtn && nextBtn) {
                // ✅ Здесь мы жестко задаем ровно 29 фотографий. 
                // Убедитесь, что в папке photos/ лежат файлы 1.png, 2.png ... 29.png.
                const START_NUM = 1;
                const END_NUM = 29; 
                
                const IMG_PATH = 'photos/';
                const IMG_EXT = '.png';
                let currentIndex = 0;
                const totalSlides = END_NUM - START_NUM + 1; // Будет ровно 29
                let slides = [];

                function createSlide(index, photoNumber) {
                    const slide = document.createElement('div');
                    slide.className = 'slide';
                    if (index === 0) slide.classList.add('active');

                    const img = document.createElement('img');
                    img.src = `${IMG_PATH}${photoNumber}${IMG_EXT}`;
                    img.alt = `Фото ${photoNumber}`;
                    img.loading = 'lazy';

                    // Если фото нет, создается заглушка. 
                    // Текст "(не найдено)" убран, CSS сам красиво её оформит.
                    img.addEventListener('error', () => {
                        img.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.className = 'slide-placeholder';
                        placeholder.textContent = `📸 Фото ${photoNumber}`;
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
                    
                    // Обновляем точки
                    if (dotsContainer && dotsContainer.style.display !== 'none') {
                        const dots = dotsContainer.children;
                        for (let i = 0; i < dots.length; i++) {
                            dots[i].classList.toggle('active', i === currentIndex);
                        }
                    }
                    
                    // Обновляем счетчик. Теперь он будет корректным: 1/29, 29/29
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
                toggleDotsOnMobile(); // Ваша существующая функция для мобильных точек

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
