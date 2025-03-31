// ДОМ элементы
const page1 = document.getElementById('page-1');
const section1 = document.getElementById('section-1');
const section1_2 = document.getElementById('section-1-2');
const page1_1 = document.getElementById('page-1-1');
const page2 = document.getElementById('page-2');
const section2_1 = document.getElementById('section-2-1');
const section2_2 = document.getElementById('section-2-2');
const section2_3 = document.getElementById('section-2-3');
const section2_4 = document.getElementById('section-2-4');

const termsLink = document.getElementById('termsLink');
const confirmButton = document.getElementById('confirmButton');
const closeCodex = document.getElementById('closeCodex');

const ticketButton = document.getElementById('ticketButton');
const btnNonClick = document.getElementById('btnNonClick');
const btnClick = document.getElementById('btnClick');
const nextArrow = document.getElementById('nextArrow');
const arrowBackPg3 = document.getElementById('arrowBackPg3');
const arrow1 = document.getElementById('arrow1');
const arrow2 = document.getElementById('arrow2');
const arrow3 = document.getElementById('arrow3');

const ticket1 = document.getElementById('ticket1');
const ticket2 = document.getElementById('ticket2');
const ticket3 = document.getElementById('ticket3');

// Элементы для экрана 2-1
const codeDisplay = document.getElementById('codeDisplay');
const numpadButtons = document.querySelectorAll('.numpad-button');
const arrowBack = document.getElementById('arrowBack');
const arrowNext = document.getElementById('arrowNext');
const errorMessage = document.getElementById('errorMessage');

// Элементы для экрана 2-2
const numberBlocks = document.querySelectorAll('.number-block');
const numberBlocksContainer = document.getElementById('numberBlocksContainer');
const nextArrow2_1 = document.getElementById('nextArrow2-1');

// Элементы для экрана 2-3
const puzzlePieces = document.querySelectorAll('.puzzle-piece');
const key = document.getElementById('key');
const keyholeClosed = document.getElementById('keyholeClosed');
const keyholeOpen = document.getElementById('keyholeOpen');
const dragInstruction = document.getElementById('dragInstruction');

// Элементы для экрана 2-4
const sliderRange = document.getElementById('sliderRange');
const sliderThumb = document.getElementById('sliderThumb');
const sliderProgress = document.getElementById('sliderProgress');
const arrowBack2_3 = document.getElementById('arrowBack2-3');
const arrowNext2_3 = document.getElementById('arrowNext2-3');

// Состояние приложения
let isCodexRead = false;
let isButtonClicked = false;
let currentArrow = 1;
let ticketIssuingInProgress = false;

// Код для экрана 2
let currentCode = '';
const correctCode = '833';
const maxDigits = 3;

// Код для страницы 2-1
let currentBlockIndex = -1; 
let numberValues = ['', '', '', '', '']; 
const totalBlocks = 5; 

// Код для страницы 2-2
let keyIsVisible = false;
let keyIsInKeyhole = false;
let puzzleDragEnabled = true;

// Код для страницы 2-3
let isSliderDragging = false;
let sliderWidth = 0;
let minSliderPos = 0;
let maxSliderPos = 0;
let thumbStartX = 0;
let thumbStartLeft = 0;
let progressMaxWidth = 0;
let sliderFullyLoaded = false;

// ДОМ элементы
const mamontContainer = document.querySelector('.mamont-container');
const mamont = mamontContainer.querySelector('.mamont');
const skeleton = mamontContainer.querySelector('.skeleton');

// Инициализация 
window.addEventListener('DOMContentLoaded', () => {

    // Стрелки - начало
    startArrowsAnimation();
    
    // Настройки - начало
    arrow1.classList.add('active');
    
    // Пазл - начало
    setupDraggableElements();
    
    // Слайдер - начало
    initSlider();
});


termsLink.addEventListener('click', () => {
    // Кодекс - появление
    page1.classList.add('hidden');
    page1_1.classList.remove('hidden');
});

closeCodex.addEventListener('click', () => {
    // Кодекс - закрыт - прочитан
    page1_1.classList.add('hidden');
    page1.classList.remove('hidden');
    
    if (!isCodexRead) {
        isCodexRead = true;
        confirmButton.classList.remove('disabled');
        confirmButton.src = 'img/background_1_items/btn_on.svg';
    }
});

confirmButton.addEventListener('click', () => {
    // Переход к тикету
    if (isCodexRead) {
        scrollToSection(section1_2);
    }
});

ticketButton.addEventListener('click', () => {
    // Кнопка талона
    if (!isButtonClicked && !ticketIssuingInProgress) {
        isButtonClicked = true;
        
        // Кнопки - две
        btnNonClick.classList.add('hidden');
        btnClick.classList.remove('hidden');
        
        // Тикет появляется
        issueTicket();
    }
});

nextArrow.addEventListener('click', () => {
    // Переход на экран 2
    page1.classList.add('hidden');
    page2.classList.remove('hidden');
    
    scrollToSection(section2_1);
});

function startArrowsAnimation() {
    // Стрелки - циклическая 
    setInterval(() => {
        document.getElementById(`arrow${currentArrow}`).classList.remove('active');
        
        currentArrow = currentArrow % 3 + 1;
        
        document.getElementById(`arrow${currentArrow}`).classList.add('active');
    }, 500); 
}

function issueTicket() {
    ticketIssuingInProgress = true;
    
    // Тикет - покадровая
    setTimeout(() => {

        ticket1.classList.add('show');
        
        setTimeout(() => {

            ticket1.classList.remove('show');
            ticket2.classList.add('show');
            
            setTimeout(() => {
                
                ticket2.classList.remove('show');
                ticket3.classList.add('show');
                
                // Стрелка - некст
                setTimeout(() => {
                    nextArrow.classList.remove('hidden');
                    ticketIssuingInProgress = false;
                }, 500);
                
            }, 500);    
        }, 500);    
    }, 300); 
}

// СТРАНИЦА 2

// Кнопки с цифрами
numpadButtons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        const nonClickedImg = this.querySelector('.numpad-btn-non-clicked');
        const clickedImg = this.querySelector('.numpad-btn-clicked');
        
        // Нажатие - клик
        nonClickedImg.style.display = 'none';
        clickedImg.style.display = 'block';
        
        // Новая цифра - плюс
        if (currentCode.length < maxDigits) {
            currentCode += value;
            codeDisplay.textContent = currentCode;
            
            // Чек
            if (currentCode.length === maxDigits) {
                checkCode();
            }
        }
        
        // Нажатие - после клика
        setTimeout(() => {
            nonClickedImg.style.display = 'block';
            clickedImg.style.display = 'none';
        }, 200);
    });
});

// Стрелка - назад
arrowBack.addEventListener('click', () => {
    page2.classList.add('hidden');
    page1.classList.remove('hidden');
    resetCodeInput();
});

// Стрелка - некст
arrowNext.addEventListener('click', () => {
    
    scrollToSection(section2_2);
    initNumberInput();
});

// Чек
function checkCode() {
    if (currentCode === correctCode) {
        // Стрелка некст
        arrowNext.classList.remove('hidden');
        errorMessage.classList.remove('show');
    } else {
        // Ошибка
        errorMessage.classList.add('show');
        
        // Ошибка пропадает
        setTimeout(() => {
            resetCodeInput();
            errorMessage.classList.remove('show');
        }, 2000);
    }
}

// Сброс
function resetCodeInput() {
    currentCode = '';
    codeDisplay.textContent = '';
}

// Экран 2-1 
function initNumberInput() {
    // Блоки - в ноль
    numberBlocks.forEach(block => {
        const display = block.querySelector('.number-display');
        display.textContent = '';
    });
    
    
    numberValues = ['', '', '', '', ''];
    currentBlockIndex = -1;
    
    // Стрелка - некст - скрыть
    nextArrow2_1.classList.remove('show');
    
    // Клавиатура
    document.addEventListener('keydown', handleKeyDown);
    
    // Текст - инструкция
    dragInstruction.classList.add('show');
    
    // Блоки - клик
    numberBlocks.forEach((block, index) => {
        block.addEventListener('click', () => {
            currentBlockIndex = index;
            highlightCurrentBlock();
        });
    });
}

function handleKeyDown(event) {
    // Блок - первый - актив
    if (currentBlockIndex === -1 && /^[0-9]$/.test(event.key)) {
        currentBlockIndex = 0;
    }
    
    // Блок - любой - актив
    if (/^[0-9]$/.test(event.key) && currentBlockIndex >= 0 && currentBlockIndex < totalBlocks) {

        numberValues[currentBlockIndex] = event.key;
        
        // Цифра
        const display = numberBlocks[currentBlockIndex].querySelector('.number-display');
        display.textContent = event.key;
        
        // Блок - дальше
        if (currentBlockIndex < totalBlocks - 1) {
            currentBlockIndex++;
        } else {
            // Проверка - количество цифф в блоках
            if (numberValues.every(value => value !== '')) {
                // Стрелка - некст
                nextArrow2_1.classList.add('show');
                
                // Стрелка
                nextArrow2_1.addEventListener('click', () => {
            
                    scrollToSection(section2_3);
                    initPuzzleGame();
                });
                
                // Цвет - изменение
                numberBlocksContainer.classList.add('all-filled');
            }
        }
        
        // Блок - хайлайт
        highlightCurrentBlock();
    }
    
    // Бэкспейс
    if (event.key === 'Backspace' && currentBlockIndex >= 0) {
        
        numberValues[currentBlockIndex] = '';
        const display = numberBlocks[currentBlockIndex].querySelector('.number-display');
        display.textContent = '';
        
        // Блок - дальше
        if (currentBlockIndex > 0) {
            currentBlockIndex--;
        }
        
        numberBlocksContainer.classList.remove('all-filled');
        
        nextArrow2_1.classList.remove('show');
        
        highlightCurrentBlock();
    }
}

// Блок - хайлайт
function highlightCurrentBlock() {
    
    numberBlocks.forEach(block => {
        block.classList.remove('active');
    });
    
    if (currentBlockIndex >= 0 && currentBlockIndex < totalBlocks) {
        numberBlocks[currentBlockIndex].classList.add('active');
    }
}

// Экран 2-3
function initPuzzleGame() {
    
    dragInstruction.classList.add('show');
    
    // Пазл - части - актив
    puzzleDragEnabled = true;
}

// Пазл - части
function setupDraggableElements() {
    
    puzzlePieces.forEach(piece => {
        piece.addEventListener('mousedown', startDragPuzzle);
        piece.addEventListener('touchstart', startDragPuzzle, { passive: false });
    });
    
    // Пазл - ключ
    key.addEventListener('mousedown', startDragKey);
    key.addEventListener('touchstart', startDragKey, { passive: false });
    
    document.addEventListener('mousemove', dragPuzzle);
    document.addEventListener('touchmove', dragPuzzle, { passive: false });
    document.addEventListener('mouseup', stopDragPuzzle);
    document.addEventListener('touchend', stopDragPuzzle);
    
    document.addEventListener('mousemove', dragKey);
    document.addEventListener('touchmove', dragKey, { passive: false });
    document.addEventListener('mouseup', stopDragKey);
    document.addEventListener('touchend', stopDragKey);
}

let activePuzzle = null;
let puzzleOffsetX = 0;
let puzzleOffsetY = 0;

// Пазл - начало
function startDragPuzzle(e) {
    if (puzzleDragEnabled) {
        e.preventDefault();
        
        activePuzzle = e.target.closest('.puzzle-piece');
        
        if (activePuzzle) {
            // Пазл - одна часть - актив 
            activePuzzle.style.zIndex = '20';
          
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
           
            puzzleOffsetX = clientX - activePuzzle.offsetLeft;
            puzzleOffsetY = clientY - activePuzzle.offsetTop;
        }
    }
}

// Пазл - процесс
function dragPuzzle(e) {
    if (activePuzzle && puzzleDragEnabled) {
        e.preventDefault();
        
        // Координаты 
        const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
        
        // Новое положение
        activePuzzle.style.left = (clientX - puzzleOffsetX) + 'px';
        activePuzzle.style.top = (clientY - puzzleOffsetY) + 'px';
    }
}

// Пазл - конец
function stopDragPuzzle() {
    if (activePuzzle) {
        
        activePuzzle.style.zIndex = '10';
     
        activePuzzle = null;
    }
}

// Ключ
let isKeyDragging = false;
let keyOffsetX = 0;
let keyOffsetY = 0;

// Ключ - начало
function startDragKey(e) {
    e.preventDefault();
    
    // Ключ - флаг
    isKeyDragging = true;
    
    // Координаты 
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
  
    keyOffsetX = clientX - key.offsetLeft;
    keyOffsetY = clientY - key.offsetTop;
    
    // Ключ - видимость
    if (!keyIsVisible) {
        keyIsVisible = true;
        
        // Пазл - отключение
        puzzleDragEnabled = false;
        
        // Пазл - все части - исчезают
        puzzlePieces.forEach(piece => {
            piece.style.transition = 'opacity 0.5s ease';
            piece.style.opacity = '0';
        });
    }
}

// Ключ - процесс
function dragKey(e) {
    if (isKeyDragging) {
        e.preventDefault();
        
        // Координаты 
        const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
        
        key.style.left = (clientX - keyOffsetX) + 'px';
        key.style.top = (clientY - keyOffsetY) + 'px';
        
        // Ключ - соотношение - скважина
        checkKeyOverKeyhole();
    }
}

// Ключ - конец
function stopDragKey() {
    if (isKeyDragging) {
        isKeyDragging = false;
        
        // Ключ - соотношение - над скважиной
        if (keyIsInKeyhole) {
            // Ключ - соотношение - центр
            const keyholeRect = keyholeClosed.getBoundingClientRect();
            const keyRect = key.getBoundingClientRect();
            
            // Новые координаты центр
            const centerX = keyholeRect.left + keyholeRect.width / 2 - keyRect.width / 2;
            const centerY = keyholeRect.top + keyholeRect.height / 2 - keyRect.height / 2;
            
            key.style.left = centerX + 'px';
            key.style.top = centerY + 'px';
            
            // Скважина - открыта
            keyholeOpen.style.opacity = '1';
            
            // Некст 
            setTimeout(() => {
                scrollToSection(section2_4);
            }, 1000);
        }
    }
}

// Ключ - соотношение - скважина
function checkKeyOverKeyhole() {
   
    const keyRect = key.getBoundingClientRect();
    const keyholeRect = keyholeClosed.getBoundingClientRect();
  
    keyIsInKeyhole = (
        keyRect.left < keyholeRect.right &&
        keyRect.right > keyholeRect.left &&
        keyRect.top < keyholeRect.bottom &&
        keyRect.bottom > keyholeRect.top
    );
}

// Экран 2-5
function initSlider() {
    // Ползунок
    const sliderRange = document.getElementById('sliderRange');
    
    // Сбросы

    arrowNext2_3.classList.add('hidden');
   
    sliderRange.value = 0;
    sliderProgress.style.width = '0px';
    sliderThumb.style.left = '0';
    
    sliderFullyLoaded = false;
    
    // Инпут рендж
    sliderRange.addEventListener('input', updateSlider);
    
    // Стрелка - назад
    arrowBack2_3.addEventListener('click', () => {
    
        scrollToSection(section2_3);
    });
    
    // Стрелка - вперед
    arrowNext2_3.addEventListener('click', () => {
        // Переход на страницу 3
        page2.classList.add('hidden');
        document.getElementById('page-3').classList.remove('hidden');
        // Сбрасываем положение страницы на первую секцию
        scrollToSection(document.getElementById('section-3-1'));
    });
}

// Ползунок - процесс - позиции
function updateSlider() {
   
    const value = parseInt(sliderRange.value);
   
    const sliderContainer = document.querySelector('.slider-container');
    const containerWidth = sliderContainer.clientWidth;
    
    const thumbWidth = sliderThumb.offsetWidth;
    const availableWidth = containerWidth - thumbWidth;
    const thumbPosition = (value / 100) * availableWidth;
    
    sliderThumb.style.left = thumbPosition + 'px';
  
    sliderProgress.style.width = thumbPosition + 'px';
    
    // Ползунок - проверка - конец
    if (value >= 95) {
        if (!sliderFullyLoaded) {
            sliderFullyLoaded = true;
            arrowNext2_3.classList.remove('hidden');
        }
    } else {
        if (sliderFullyLoaded) {
            sliderFullyLoaded = false;
            arrowNext2_3.classList.add('hidden');
        }
    }
}


function scrollToSection(section) {
    section.scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('load', () => {
    resetCodeInput();
    initNumberInput();
    initPuzzleGame();
    initSlider();
    
    // Инициализация - 3 страница
    if (document.getElementById('page-3')) {
        initPage3();
    }

    if (document.getElementById('section-3-3')) {
        initSection3_3();
    }
   
    if (document.getElementById('section-3-4')) {
        initSection3_4();
    }
});

// Ползунок - смена
window.addEventListener('resize', function() {

    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function() {
        updateSlider();
    }, 250);
});

// Страница 3 - сложные вещи
function initPage3() {
    const mamont = document.getElementById('mamont');
    const arrowBack3 = document.getElementById('arrowBack3');
    const movingLine = document.querySelector('.moving-line');
    let isStopped = false;

    // Бегущая строка - остановка по ховеру
    const stopElements = document.querySelectorAll('.stroke-line, .people, .cactus-stroke, .mamont-container');
    stopElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!isStopped) {
                document.querySelectorAll('.people, .cactus-stroke, .mamont-container').forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            }
        });
        el.addEventListener('mouseleave', () => {
            if (!isStopped) {
                document.querySelectorAll('.people, .cactus-stroke, .mamont-container').forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }
        });
    });

    // Стрелка - назад
    arrowBack3.addEventListener('click', () => {
        document.getElementById('page-3').classList.add('hidden');
        document.getElementById('section-2-4').scrollIntoView({ behavior: 'smooth' });
        document.getElementById('page-2').classList.remove('hidden');
    });

    // Анимация - обновление
    function updateAnimation() {
        document.querySelectorAll('.people, .cactus-stroke, .mamont').forEach(el => {
            el.style.animation = 'moveRight 5s linear infinite';
        });
    }

    // Мамонт - в  скелет
    mamontContainer.addEventListener('click', () => {
        if (!isStopped) {
            isStopped = true;
            document.querySelectorAll('.people, .cactus-stroke, .mamont-container').forEach(el => {
                el.style.animationPlayState = 'paused';
            });
            mamont.classList.add('hidden');
            skeleton.classList.remove('hidden');
            
            // Скелет - череп 
            skeleton.style.transform = 'scale(0.7) translateY(51px)';
            
            setTimeout(() => {
                skeleton.classList.add('hidden');
                mamont.classList.remove('hidden');
                isStopped = false;
                document.querySelectorAll('.people, .cactus-stroke, .mamont-container').forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; /* trigger reflow */
                    // el.style.left = '0%'; // Возвращение
                    el.style.animation = 'moveRight 7s linear infinite';
                });
            }, 3000);
        }
    });
    
    // Экран 3-2
    initSection3_2();
}

// Экран 3-2
function initSection3_2() {
    // ДОМ элементы
    const section3_2 = document.getElementById('section-3-2');
    const messageInput = document.getElementById('messageInput');
    const messageText1 = document.getElementById('messageText1');
    const messageText2 = document.getElementById('messageText2');
    const handShade = document.getElementById('hand_shade');
    
    // Отпечатки рук
    const handPrints = [
        'img/background_3-1_items/hand_1.svg',
        'img/background_3-1_items/hand_2.svg',
        'img/background_3-1_items/hand_3.svg'
    ];
    
    // 1. Ввод текста
    messageInput.addEventListener('input', function() {
        // Текст - замена
        if (this.value.trim().length > 0) {
            messageText1.classList.add('hidden');
            messageText2.classList.remove('hidden');
        } else {
            // Текст - не замена
            messageText1.classList.remove('hidden');
            messageText2.classList.add('hidden');
        }
    });
    
    // 2. Мигание рук
    let isHandFading = false;
    
    function fadeHandInOut() {
        if (isHandFading) return;
        
        isHandFading = true;
        
        handShade.style.opacity = '1';
       
        function animateOpacity() {
           
            handShade.style.transition = 'opacity 1s ease-in-out';
            handShade.style.opacity = '0.5';
            
            setTimeout(() => {
                handShade.style.opacity = '1';
                
                // И повторяем цикл
                setTimeout(animateOpacity, 1000);
            }, 1000);
        }
        
        animateOpacity();
    }
    
    fadeHandInOut();
    
    // 3. Отпечатки
    section3_2.addEventListener('click', function(e) {
        // Отпечаток
        const handPrint = document.createElement('img');
        
        // Отпечаток - рандом
        const randomIndex = Math.floor(Math.random() * handPrints.length);
        handPrint.src = handPrints[randomIndex];
        
        // Координаты
        const sectionRect = section3_2.getBoundingClientRect();
        
        // Размер - рандом
        const randomSize = Math.floor(Math.random() * 101) + 100;
        const offsetSize = randomSize / 2; 
        
        // Отпечаток - куча разного сложного - позиция и слой под текстовый ввод
        handPrint.style.position = 'absolute';
        handPrint.style.left = (e.clientX - sectionRect.left - offsetSize) + 'px'; 
        handPrint.style.top = (e.clientY - sectionRect.top - offsetSize) + 'px'; 
        handPrint.style.width = randomSize + 'px'; 
        handPrint.style.height = 'auto';
        handPrint.style.pointerEvents = 'none'; 
        handPrint.style.zIndex = '1'; 
        handPrint.classList.add('hand-print'); 
        
        section3_2.appendChild(handPrint);
    });
}

// Экран 3-3
function initSection3_3() {
    // ДОМ элементы
    const draggableItem1 = document.getElementById('draggableItem1');
    const draggableItem2 = document.getElementById('draggableItem2');
    const draggableItem3 = document.getElementById('draggableItem3');
    const fireStatic = document.getElementById('fire-static-id');
    
    // Элементы еды в огне - сколько
    let foodAddedToFire = 0;
    
    // Еда - элементы
    if (draggableItem1) setupDraggableFood(draggableItem1);
    if (draggableItem2) setupDraggableFood(draggableItem2);
    if (draggableItem3) setupDraggableFood(draggableItem3);
    
    // Элементы еды
    function setupDraggableFood(element) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        
        // Устройства 1
        element.addEventListener('mousedown', startDragFood);
        
        // Устройства 2 
        element.addEventListener('touchstart', startDragFood, { passive: false });
        
        // Элементы еды - начало
        function startDragFood(e) {
            e.preventDefault();
            
            isDragging = true;
            
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            
            offsetX = clientX - element.offsetLeft;
            offsetY = clientY - element.offsetTop;
            
            element.style.zIndex = '100';
          
            document.addEventListener('mousemove', dragFood);
            document.addEventListener('touchmove', dragFood, { passive: false });
            document.addEventListener('mouseup', stopDragFood);
            document.addEventListener('touchend', stopDragFood);
        }
        
        // Элементы еды - процесс
        function dragFood(e) {
            if (!isDragging) return;
            
            e.preventDefault();
            
            const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
            
            element.style.left = (clientX - offsetX) + 'px';
            element.style.top = (clientY - offsetY) + 'px';
        }
        
        // Элементы еды - конец
        function stopDragFood() {
            if (isDragging) {
                isDragging = false;
                
                element.style.zIndex = '';
               
                checkIfOverFire(element);
                
                document.removeEventListener('mousemove', dragFood);
                document.removeEventListener('touchmove', dragFood);
                document.removeEventListener('mouseup', stopDragFood);
                document.removeEventListener('touchend', stopDragFood);
            }
        }
    }
    
    // Еда над огнем - проверка
    function checkIfOverFire(element) {
        if (foodAddedToFire >= 3) return; 
        
        const elementRect = element.getBoundingClientRect();
        const fireRect = fireStatic.getBoundingClientRect();
       
        const isOverlapping = !(
            elementRect.right < fireRect.left || 
            elementRect.left > fireRect.right || 
            elementRect.bottom < fireRect.top || 
            elementRect.top > fireRect.bottom
        );
        
        // Еда в огне - исчезновение и увеличение огня

        if (isOverlapping) {

            foodAddedToFire++;
          
            element.style.transition = 'opacity 0.5s ease';
            element.style.opacity = '0';
         
            element.style.pointerEvents = 'none';
            
            const scaleAmount = 1.35;
            
            fireStatic.style.transition = 'transform 0.5s ease';
            
            const currentTransform = window.getComputedStyle(fireStatic).getPropertyValue('transform');
            const currentScale = currentTransform !== 'none' && currentTransform.includes('matrix') 
                ? parseFloat(currentTransform.split(',')[0].replace('matrix(', '')) 
                : 1;
                
            const newScale = currentScale * 1.3;
            
            const liftAmount = -10 * foodAddedToFire; 
            
            fireStatic.style.transform = `scale(${newScale}) translateY(${liftAmount}px)`;
           
            fireStatic.classList.add('fire-growing');
            
            setTimeout(() => {
                fireStatic.classList.remove('fire-growing');
            }, 500);
        }
    }
}

// Экран 3-4
function initSection3_4() {
    // ДОМ элементы
    const authorStar = document.getElementById('author-img-2');
    const groupStar = document.getElementById('group-img-2');
    const curatorsStar = document.getElementById('curators-img-2');
    
    const authorText = document.getElementById('author-text');
    const groupText = document.getElementById('group-text');
    const curatorsText = document.getElementById('curators-text');
    
    const starTextPairs = [
        { star: authorStar, text: authorText },
        { star: groupStar, text: groupText },
        { star: curatorsStar, text: curatorsText }
    ];
    
    starTextPairs.forEach(pair => {
        if (pair.text) {
            pair.text.classList.add('hidden');
        }
    });
    
    // Звезды
    starTextPairs.forEach(pair => {
        if (pair.star) {
            pair.star.classList.add('star-animation');
            setupStarInteraction(pair.star, pair.text);
        }
    });
    
    function setupStarInteraction(star, text) {
        
        star.addEventListener('mouseenter', () => {
            
            star.classList.add('paused');
           
            text.classList.remove('hidden');
        });
        
        star.addEventListener('mouseleave', () => {
            
            star.classList.remove('paused');
            
            text.classList.add('hidden');
        });
        
        star.style.cursor = 'pointer';
    }
}