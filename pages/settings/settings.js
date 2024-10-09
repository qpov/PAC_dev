document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.header button');
    const tabs = document.querySelectorAll('.tab-content > div');
    const debugModeToggle = document.getElementById('debug-mode');

    // Функция для деактивации всех вкладок и кнопок
    const deactivateAll = () => {
        buttons.forEach(button => button.classList.remove('active'));
        tabs.forEach(tab => tab.style.display = 'none');
    };

    // Функция для активации выбранной вкладки и кнопки
    const activateTab = (tabId, save = true) => {
        deactivateAll();
        // Активируем кнопку
        const activeButton = document.querySelector(`.header button[data-tab="${tabId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        // Показываем контент вкладки
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
            activeTab.style.display = 'block';
        }
        if (save) {
            // Сохраняем активную вкладку в localStorage
            localStorage.setItem('activeTab', tabId);
            // Обновляем URL хэш без прокрутки страницы
            history.replaceState(null, null, `#${tabId}`);
        }
    };

    // Добавляем обработчики событий на кнопки
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            activateTab(tabId);
        });
    });

    // Функция для определения вкладки из URL хэша
    const getTabFromHash = () => {
        const hash = window.location.hash.substring(1); // Убираем #
        return hash || null;
    };

    // При загрузке страницы проверяем, есть ли хэш в URL
    const hashTab = getTabFromHash();
    if (hashTab && document.getElementById(hashTab)) {
        activateTab(hashTab, false); // Не сохраняем повторно
    } else {
        // Если нет хэша, проверяем localStorage
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab && document.getElementById(savedTab)) {
            activateTab(savedTab, false); // Не сохраняем повторно
        } else {
            // Если нет сохранённой вкладки, активируем первую по умолчанию
            const firstTab = buttons[0].getAttribute('data-tab');
            activateTab(firstTab);
        }
    }

    // Обработчик изменения хэша в URL
    window.addEventListener('hashchange', () => {
        const newHashTab = getTabFromHash();
        if (newHashTab && document.getElementById(newHashTab)) {
            activateTab(newHashTab, false); // Не сохраняем повторно
        }
    });

    // Логика для слайдера "Debug mode"
    // Загрузка состояния слайдера из localStorage
    const loadDebugMode = () => {
        const debugMode = localStorage.getItem('debugMode');
        if (debugMode === 'enabled') {
            debugModeToggle.checked = true;
        } else {
            debugModeToggle.checked = false;
        }
    };

    // Сохранение состояния слайдера в localStorage при изменении
    const saveDebugMode = () => {
        if (debugModeToggle.checked) {
            localStorage.setItem('debugMode', 'enabled');
            // Дополнительные действия при включении Debug mode
            console.log('Debug mode включен');
        } else {
            localStorage.setItem('debugMode', 'disabled');
            // Дополнительные действия при выключении Debug mode
            console.log('Debug mode выключен');
        }
    };

    // Инициализация состояния слайдера при загрузке
    loadDebugMode();

    // Добавление обработчика события на слайдер
    debugModeToggle.addEventListener('change', saveDebugMode);
});
