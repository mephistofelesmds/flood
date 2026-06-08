// Скопировать конкретную секцию
function copySection(sectionId) {
    const section = document.getElementById(sectionId);
    const pre = section.querySelector('.template-content pre');
    const text = pre.textContent.trim();
    
    navigator.clipboard.writeText(text).then(() => {
        // Находим кнопку внутри секции
        const btn = section.querySelector('.template-btn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span class="template-btn-icon">✓</span> Скопировано';
        btn.style.borderColor = '#7a9';
        btn.style.color = '#7a9';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.borderColor = '#444';
            btn.style.color = '#bbb';
        }, 1500);
    }).catch(() => {
        // Фолбэк для старых браузеров
        fallbackCopy(text);
    });
}

// Скопировать весь шаблон
function copyAllTemplate() {
    const sections = document.querySelectorAll('.template-section');
    let fullText = '';
    
    sections.forEach(section => {
        const title = section.querySelector('.template-section-title').textContent.trim();
        const pre = section.querySelector('.template-content pre');
        const content = pre ? pre.textContent.trim() : '';
        const note = section.querySelector('.template-note');
        
        fullText += '\n═══ ' + title + ' ═══\n\n';
        if (note) {
            fullText += note.textContent.trim() + '\n\n';
        }
        fullText += content + '\n\n';
    });
    
    navigator.clipboard.writeText(fullText.trim()).then(() => {
        const feedback = document.getElementById('copyAllFeedback');
        const btn = document.querySelector('.template-btn--all');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<span class="template-btn-icon">✓</span> Скопировано';
        btn.style.borderColor = '#7a9';
        btn.style.color = '#7a9';
        feedback.textContent = 'Весь шаблон скопирован';
        feedback.classList.add('success');
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.borderColor = '#555';
            btn.style.color = '#bbb';
            feedback.textContent = '';
            feedback.classList.remove('success');
        }, 2000);
    }).catch(() => {
        fallbackCopy(fullText.trim());
    });
}

// Фолбэк-метод копирования
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
    } catch (e) {
        alert('Не удалось скопировать текст. Пожалуйста, выделите и скопируйте вручную.');
    }
    document.body.removeChild(textarea);
}