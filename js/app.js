// State Management
let currentLang = 'en';
let selectedCount = 0;
let currentScores = null;
let isReportGenerated = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderQuestions();
    updateProgress();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.dataset.theme = 'dark';
        document.getElementById('theme-icon').textContent = '☀️';
    }
});

// Get currently selected question IDs
function getSavedSelections() {
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checked).map(cb => parseInt(cb.id.replace('q', '')));
}

// Render questions list
function renderQuestions() {
    const listEl = document.getElementById('questions-list');
    const savedSelections = getSavedSelections();
    
    listEl.innerHTML = '';
    
    questions.forEach((q, index) => {
        const row = document.createElement('div');
        const isSelected = savedSelections.includes(q.id);
        
        row.className = `question-row ${isSelected ? 'selected' : ''}`;
        row.dataset.id = q.id;
        row.innerHTML = `
            <input type="checkbox" id="q${q.id}" data-cat="${q.cat}" ${isSelected ? 'checked' : ''}>
            <label for="q${q.id}">${q[currentLang]}</label>
            <span class="cat-badge">${q.cat}</span>
        `;
        
        // Row click toggles checkbox
        row.addEventListener('click', (e) => {
            const cb = row.querySelector('input[type="checkbox"]');
            cb.checked = !cb.checked;
            row.classList.toggle('selected', cb.checked);
            updateProgress();
        });
        
        // Checkbox click stops propagation
        row.querySelector('input[type="checkbox"]').addEventListener('click', (e) => {
            e.stopPropagation();
            row.classList.toggle('selected', e.target.checked);
            updateProgress();
        });
        
        listEl.appendChild(row);
    });
    
    updateProgress();
}

// Update progress bar
function updateProgress() {
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    selectedCount = checked.length;
    const total = questions.length;
    const percentage = (selectedCount / total) * 100;
    
    document.getElementById('progress-count').textContent = 
        `${selectedCount}/${total} ${uiText[currentLang].selected}`;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
    
    if (selectedCount >= 10) {
        document.getElementById('progress-bar').style.background = 
            'linear-gradient(90deg, var(--success), #34d399)';
    } else {
        document.getElementById('progress-bar').style.background = 
            'linear-gradient(90deg, var(--accent), var(--accent-light))';
    }
}

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'tl' : 'en';
    const langData = uiText[currentLang];
    
    document.getElementById('lang-flag').textContent = currentLang === 'en' ? '🇵🇭' : '🇺🇸';
    document.getElementById('lang-text').textContent = langData.langName;
    
    document.getElementById('main-title').textContent = langData.title;
    document.getElementById('sub-title').textContent = langData.sub;
    document.getElementById('instruction-text').textContent = langData.instr;
    document.getElementById('btn-discover').textContent = langData.discover;
    document.getElementById('progress-text').textContent = langData.progress;
    
    renderQuestions();
    
    if (isReportGenerated && currentScores) {
        renderReport();
    }
}

// Toggle theme
function toggleTheme() {
    const isDark = document.body.dataset.theme === 'dark';
    document.body.dataset.theme = isDark ? 'light' : 'dark';
    document.getElementById('theme-icon').textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Generate assessment results
function generateDocument() {
    if (selectedCount === 0) {
        showToast(currentLang === 'en' ? 'Please select at least one statement first' : 'Mangyaring pumili muna ng hindi bababa sa isang pahayag');
        return;
    }

    currentScores = {A:0, B:0, C:0, D:0, E:0, F:0, G:0};
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(i => {
        currentScores[i.dataset.cat]++;
    });
    
    isReportGenerated = true;
    renderReport();
    
    document.getElementById('form-view').style.display = 'none';
    document.getElementById('report-output').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render report view
function renderReport() {
    const idContainer = document.getElementById('identified-gifts-container');
    const appContainer = document.getElementById('appendix-container');
    idContainer.innerHTML = '';
    appContainer.innerHTML = '';

    const langData = uiText[currentLang];
    let hasPrimaryGifts = false;

    const sortedGifts = Object.keys(database).sort((a, b) => currentScores[b] - currentScores[a]);

    sortedGifts.forEach(key => {
        const gift = database[key][currentLang];
        const score = currentScores[key];
        
        if (score >= 3) {
            hasPrimaryGifts = true;
            idContainer.innerHTML += `
                <div class="gift-card">
                    <span class="level-header">
                        ${key}. ${gift.title}
                        <span class="score-badge">${langData.score}: ${score}</span>
                    </span>
                    <div class="gift-description">${gift.text}</div>
                    <div class="scripture-ref">${gift.scripture}</div>
                </div>
            `;
        }

        appContainer.innerHTML += `
            <div class="gift-card" style="border-left-color: ${score > 0 ? 'var(--accent)' : 'var(--border)'}; opacity: ${score > 0 ? '1' : '0.7'};">
                <span class="level-header">
                    ${key}. ${gift.title}
                    ${score > 0 ? `<span class="score-badge">${langData.score}: ${score}</span>` : ''}
                </span>
                <div class="gift-description">${gift.text}</div>
                <div class="scripture-ref">${gift.scripture}</div>
            </div>
        `;
    });

    if (!hasPrimaryGifts) {
        idContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎯</div>
                <h3>${langData.emptyTitle}</h3>
                <p>${langData.emptyDesc}</p>
            </div>
        `;
    }

    document.getElementById('title-strengths').textContent = langData.strengths;
    document.getElementById('title-appendix').textContent = langData.appendix;
    document.getElementById('title-resources').textContent = langData.resources;
    //document.getElementById('btn-pdf').textContent = `📄 ${langData.pdf}`;
    document.getElementById('btn-reset').textContent = `🔄 ${langData.reset}`;
}

// Populate PDF template
function populatePDFTemplate() {
    const langData = uiText[currentLang];
    const now = new Date();
    const dateStr = now.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'tl-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('pdf-date').textContent = dateStr;
    document.getElementById('pdf-footer-date').textContent = dateStr;
    
    const primaryContainer = document.getElementById('pdf-primary-gifts');
    const allContainer = document.getElementById('pdf-all-gifts');
    primaryContainer.innerHTML = '';
    allContainer.innerHTML = '';
    
    let hasPrimary = false;
    const sortedGifts = Object.keys(database).sort((a, b) => currentScores[b] - currentScores[a]);
    
    sortedGifts.forEach(key => {
        const gift = database[key][currentLang];
        const score = currentScores[key];
        
        if (score >= 3) {
            hasPrimary = true;
            primaryContainer.innerHTML += `
                <div class="pdf-gift-card">
                    <div class="pdf-gift-header">
                        <span>${key}. ${gift.title}</span>
                        <span class="pdf-gift-score">${langData.score}: ${score}</span>
                    </div>
                    <div class="pdf-gift-text">${gift.text}</div>
                    <div class="pdf-scripture">${gift.scripture}</div>
                </div>
            `;
        }
    });
    
    if (!hasPrimary) {
        primaryContainer.innerHTML = `
            <div class="pdf-empty-state">
                <strong>${langData.emptyTitle}</strong><br>
                ${langData.emptyDesc}
            </div>
        `;
    }
    
    sortedGifts.forEach(key => {
        const gift = database[key][currentLang];
        const score = currentScores[key];
        const opacity = score > 0 ? '1' : '0.6';
        const borderColor = score > 0 ? '#2563eb' : '#cbd5e1';
        
        allContainer.innerHTML += `
            <div class="pdf-gift-card" style="opacity: ${opacity}; border-left-color: ${borderColor};">
                <div class="pdf-gift-header">
                    <span>${key}. ${gift.title}</span>
                    ${score > 0 ? `<span class="pdf-gift-score">${langData.score}: ${score}</span>` : ''}
                </div>
                <div class="pdf-gift-text">${gift.text}</div>
                <div class="pdf-scripture">${gift.scripture}</div>
            </div>
        `;
    });
}

// Download PDF
async function downloadPDF() {
    const btn = document.getElementById('btn-pdf');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="loading"></span> Generating...';
    btn.disabled = true;

    populatePDFTemplate();

    const element = document.getElementById('pdf-template');
	element.style.display = 'block';
	element.style.visibility = 'hidden';
	element.style.position = 'fixed';
	element.style.top = '0';
	element.style.left = '0';

    const opt = {
        margin: [15, 15, 15, 15],
        filename: `Spiritual_Gifts_Report_${currentLang}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            letterRendering: true,
            scrollY: 0
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        },
        pagebreak: { 
            mode: ['css', 'legacy'],
            avoid: '.pdf-gift-card'
        }
    };
	
	await new Promise(resolve => setTimeout(resolve, 300));

    html2pdf().set(opt).from(element).save().then(() => {
        element.style.display = 'none';
        element.style.position = 'static';
        btn.innerHTML = originalText;
        btn.disabled = false;
        showToast(currentLang === 'en' ? 'PDF downloaded successfully!' : 'Matagumpay na na-download ang PDF!');
    }).catch(err => {
        element.style.display = 'none';
        element.style.position = 'static';
        btn.innerHTML = originalText;
        btn.disabled = false;
        showToast('Error generating PDF. Please try again.');
        console.error(err);
    });
}

// Reset test
function resetTest() {
    if (confirm(currentLang === 'en' ? 'Are you sure you want to start over? Your selections will be cleared.' : 'Sigurado ka bang gusto mong magsimulang muli? Ang iyong mga pinili ay mabubura.')) {
        currentScores = null;
        isReportGenerated = false;
        window.location.reload();
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}