document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');
    const toggleText = document.getElementById('toggle-text');
    const settingsButton = document.getElementById('settings-button');

    // Обновить текст в зависимости от состояния переключателя
    const updateToggleText = () => {
        toggleText.textContent = toggle.checked ? 'Выставление оптовых предложений' : 'Перебивание цен';
    };

    // Инициализировать текст при загрузке
    updateToggleText();

    // Добавить слушатель события для переключателя
    toggle.addEventListener('change', updateToggleText);

    // Обработчик для кнопки "Настройки"
    settingsButton.addEventListener('click', () => {
        const settingsUrl = chrome.runtime.getURL('pages/settings/settings.html');
        chrome.tabs.create({ url: settingsUrl });
    });

    // Кнопка "Запустить" пока не имеет функционала
    const runButton = document.getElementById('run-button');
    runButton.addEventListener('click', () => {
        // Пока ничего не делаем
    });
});
