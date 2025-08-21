(function() {
    'use strict';
    
    // Configuration from server injection - NO QUOTES around placeholders!
    const CONFIG = {
        websiteUrl: '{{WEBSITE_URL}}',
        personalInfoStored: '{{PERSONAL_INFO_STORED}}',
        enableMdQuizz: {{ENABLE_MD_QUIZZ}},
        enableJsSandbox: {{ENABLE_JS_SANDBOX}},
        enablePrivacy: {{ENABLE_PRIVACY}}
    };

    console.log('Kizuna initialized with config:', CONFIG);

    // Load styles dynamically
    function loadStyles() {
        const script = document.createElement('script');
        // Use relative path if on same domain, otherwise use full URL
        script.src = window.location.hostname === 'kizuna.kahiether.com' 
            ? '/styles.js' 
            : 'https://kizuna.kahiether.com/styles.js';
        script.onload = () => {
            if (window.applyKizunaStyles) {
                window.applyKizunaStyles();
                console.log('Kizuna styles applied');
            }
        };
        script.onerror = () => console.error('Failed to load Kizuna styles');
        document.head.appendChild(script);
    }

    // Privacy popup
    function showPrivacyPopup() {
        if (!CONFIG.enablePrivacy) return;
        
        const popup = document.createElement('div');
        popup.id = 'kizuna-privacy-popup';
        popup.innerHTML = `
            <div class="kizuna-privacy-content">
            
                <h3>Privacy & GDPR Compliance</h3>
                <p>Your privacy is important to us. This application is designed to comply with the General Data Protection Regulation (GDPR) and to ensure that your personal data remains under your control at all times.</p>        
                <p><strong>Data Storage:</strong> No personal data is ever transmitted or stored on our servers. All information generated or used by this application is kept exclusively within your own browser and device. You remain in full control of your data at all times.</p>        
                <p><strong>No Commercial Use:</strong> None of your data is sold, shared, or commercialized in any way. We do not build user profiles, and we do not use your data for advertising or behavioral tracking purposes.</p>        
                <p><strong>Analytics with Umami:</strong> To help us understand and improve how this website is used, we employ Umami, a privacy-friendly analytics tool. Umami only collects standard, aggregated, and anonymized data such as page views, device type, operating system, browser, and approximate geolocation (country level). This information cannot be used to identify you personally and is never combined with other datasets.</p>       
                <p><strong>Your Rights:</strong> Under GDPR, you have the right to access, rectify, delete, and restrict the processing of your personal data. In this case, since no personal data is collected or stored on our servers, your privacy is inherently safeguarded without requiring further action.</p>        
                <p><strong>Consent:</strong> By continuing to use this website, you consent to the limited, anonymized analytics described above and to the local processing of data required for the functionality of this application.</p>
            </div>
            <div class="kizuna-privacy-buttons">
            <button onclick="this.closest('#kizuna-privacy-popup').remove(); document.body.classList.remove('no-scroll');">Close</button>
            </div>
        `;

        document.body.appendChild(popup);
    }

    // JavaScript sandbox
    function createJsSandbox() {
        if (!CONFIG.enableJsSandbox) return null;
        
        const existing = document.getElementById('kizuna-js-sandbox');
        if (existing) existing.remove();
        
        const sandbox = document.createElement('div');
        sandbox.id = 'kizuna-js-sandbox';
        sandbox.innerHTML = `
            <div class="kizuna-sandbox-content">
                <h3>JavaScript Sandbox</h3>
                <textarea placeholder="Paste your JavaScript code here..." rows="10"></textarea>
                <div class="kizuna-sandbox-buttons">
                    <button onclick="window.kizunaExecuteScript(this)">Execute</button>
                    <button onclick="window.kizunaClearSandbox(this)">Clear</button>
                    <button onclick="window.kizunaCloseSandbox(this)">Close</button>
                </div>
                <div class="kizuna-sandbox-output"></div>
            </div>
        `;
        return sandbox;
    }

    // Sandbox functions (global for onclick handlers)
    window.kizunaExecuteScript = function(btn) {
        const sandbox = btn.closest('#kizuna-js-sandbox');
        const textarea = sandbox.querySelector('textarea');
        const output = sandbox.querySelector('.kizuna-sandbox-output');
        
        try {
            // Capture console.log output
            const originalLog = console.log;
            let logs = [];
            console.log = function(...args) {
                logs.push(args.join(' '));
                originalLog.apply(console, args);
            };
            
            const result = new Function(textarea.value)();
            
            // Restore console.log
            console.log = originalLog;
            
            let outputText = logs.length > 0 ? logs.join('<br>') : '';
            if (result !== undefined) {
                outputText += (outputText ? '<br>' : '') + `<strong>Return value:</strong> ${result}`;
            }
            
            output.innerHTML = outputText || 'Code executed successfully (no output)';
            output.style.color = 'green';
        } catch (error) {
            output.innerHTML = `<strong>Error:</strong> ${error.message}`;
            output.style.color = 'red';
        }
    };

    window.kizunaClearSandbox = function(btn) {
        const sandbox = btn.closest('#kizuna-js-sandbox');
        sandbox.querySelector('textarea').value = '';
        sandbox.querySelector('.kizuna-sandbox-output').innerHTML = '';
    };

    window.kizunaCloseSandbox = function(btn) {
        btn.closest('#kizuna-js-sandbox').remove();
    };

    // Scroll functions
    function zoomAwareScroll(speed = 50) {
        let scrollStep = Math.ceil(1 / window.devicePixelRatio);
        let interval = speed;
        let scroller = setInterval(() => {
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
                clearInterval(scroller);
                console.log("Reached the bottom of the page.");
            } else {
                window.scrollBy(0, scrollStep);
            }
        }, interval);
        window.stopScroll = () => {
            clearInterval(scroller);
            console.log("Scrolling stopped.");
        };
    }

    // Quiz functionality
    function isValidCell(content) {
        return content && content.trim().length > 0 && !/^[a-zA-Z0-9\s\-\.,]*$/.test(content.trim());
    }


    // Create menu
    function createMenu() {
        console.log('Creating Kizuna menu...');
        
        const burger = document.createElement('div');
        burger.id = 'kizuna-burger';
        burger.textContent = '☰';

        const function startQuiz(isAdvanced) {
    if (!CONFIG.enableMdQuizz) {
        alert('Quiz feature is disabled for this website.');
        return;
    }

    const rows = Array.from(document.querySelectorAll("table tbody tr"));
    if (rows.length === 0) {
        alert('No table data found on this page. The quiz feature requires a table with questions and answers.');
        return;
    }

    // keep your existing validity rule
    function isValidCell(content) {
        return content && content.trim().length > 0 && !/^[a-zA-Z0-9\s\-\.,]*$/.test(content.trim());
    }

    // sanitizer for advanced mode (same spirit as your original)
    const sanitize = (s) => {
        if (!isAdvanced) return (s || '').trim();
        return (s || '')
            .normalize("NFD")
            .replace(/[a-zA-Z0-9()\.\,~\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ")
            .trim();
    };

    const firstCells = rows[0].querySelectorAll("td");
    const colCount = firstCells.length;
    if (colCount < 2) {
        alert('Need at least 2 columns (question + answer).');
        return;
    }

    const maxQuestions = Math.min(20, rows.length);
    const usedRows = new Set();
    const selectedQuestions = [];

    // randomly pick rows; for each, choose a valid answer column (1..colCount-1)
    let guard = rows.length * 4; // avoid infinite loops on sparse tables
    while (selectedQuestions.length < maxQuestions && guard-- > 0) {
        const randomRowIndex = Math.floor(Math.random() * rows.length);
        if (usedRows.has(randomRowIndex)) continue;

        const row = rows[randomRowIndex];
        const cells = row.querySelectorAll("td");
        if (!cells || cells.length < 2) continue;

        const questionText = (cells[0]?.textContent || '').trim();
        if (!questionText) continue;

        // find answer columns that have valid content
        const validCols = [];
        for (let c = 1; c < cells.length; c++) {
            const raw = cells[c]?.textContent || '';
            if (isValidCell(sanitize(raw))) validCols.push(c);
        }
        if (validCols.length === 0) continue;

        // choose a random valid answer column for this row
        const answerCol = validCols[Math.floor(Math.random() * validCols.length)];
        const correctRaw = (cells[answerCol]?.textContent || '').trim();
        const correctAnswer = sanitize(correctRaw);
        if (!isValidCell(correctAnswer)) continue;

        selectedQuestions.push({
            question: questionText,
            correctAnswer,
            correctRaw,
            answerCol,
            rowIndex: randomRowIndex
        });
        usedRows.add(randomRowIndex);
    }

    if (selectedQuestions.length === 0) {
        alert('Could not generate quiz questions from the table data. Please ensure the table has valid question–answer pairs.');
        return;
    }

    // remove existing quiz if any
    const existingQuiz = document.getElementById('kizuna-quiz-container');
    if (existingQuiz) existingQuiz.remove();

    const quizContainer = document.createElement('div');
    quizContainer.id = 'kizuna-quiz-container';
    document.body.appendChild(quizContainer);

    let score = 0;
    let timer;
    const results = [];

    function askQuestion(index) {
        if (index >= selectedQuestions.length) {
            showRecap();
            return;
        }

        const current = selectedQuestions[index];
        const { question, correctAnswer, correctRaw, answerCol, rowIndex } = current;

        // gather distractors from the SAME column in other rows
        const pool = [];
        rows.forEach((r, i) => {
            if (i === rowIndex) return;
            const cell = r.querySelectorAll("td")[answerCol];
            if (!cell) return;
            const raw = (cell.textContent || '').trim();
            const val = sanitize(raw);
            if (isValidCell(val) && val !== correctAnswer) pool.push(val);
        });

        // unique + pick up to 3
        const incorrectAnswers = [...new Set(pool)].sort(() => 0.5 - Math.random()).slice(0, 3);
        while (incorrectAnswers.length < 3) {
            incorrectAnswers.push(`Option ${incorrectAnswers.length + 2}`);
        }

        const options = [correctAnswer, ...incorrectAnswers].sort(() => 0.5 - Math.random());

        quizContainer.innerHTML = `
            <h3>Question ${index + 1}/${selectedQuestions.length}</h3>
            <h4>${question}</h4>
        `;

        if (isAdvanced) {
            const timerDisplay = document.createElement('div');
            timerDisplay.className = 'kizuna-timer-display';
            quizContainer.appendChild(timerDisplay);

            let timeLeft = 10;
            timerDisplay.textContent = `Time: ${timeLeft}s`;
            timer = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = `Time: ${timeLeft}s`;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    results.push({
                        question,
                        correctAnswer: correctRaw,
                        userAnswer: null,
                        result: "❌ Time Out"
                    });
                    askQuestion(index + 1);
                }
            }, 1000);
        }

        options.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.className = 'kizuna-quiz-option';
            optionButton.addEventListener('click', () => {
                if (timer) clearInterval(timer);

                const isCorrect = option === correctAnswer;

                // lock + color feedback
                quizContainer.querySelectorAll('.kizuna-quiz-option').forEach(btn => {
                    btn.disabled = true;
                    if (btn.textContent === correctAnswer) {
                        btn.style.backgroundColor = 'green';
                        btn.style.color = 'white';
                    } else if (btn === optionButton && !isCorrect) {
                        btn.style.backgroundColor = 'red';
                        btn.style.color = 'white';
                    }
                });

                if (isCorrect) score++;

                results.push({
                    question,
                    correctAnswer: correctRaw,
                    userAnswer: option,
                    result: isCorrect ? "✅ Correct" : "❌ Wrong"
                });

                setTimeout(() => askQuestion(index + 1), 1500);
            });
            quizContainer.appendChild(optionButton);
        });
    }

    function showRecap() {
        const percentage = Math.round((score / selectedQuestions.length) * 100);

        let emoji = '';
        let message = '';
        if (percentage >= 90) { emoji = '🎉🎊'; message = 'Excellent!'; }
        else if (percentage >= 70) { emoji = '🌟'; message = 'Great Job!'; }
        else if (percentage >= 50) { emoji = '👍'; message = 'Good Effort!'; }
        else { emoji = '📚'; message = 'Keep Practicing!'; }

        quizContainer.innerHTML = `
            <h3>Quiz Complete!</h3>
            <div style="font-size: 48px; margin: 20px 0;">${emoji}</div>
            <div style="font-size: 36px; color: ${percentage >= 70 ? 'green' : 'orange'};">
                ${score}/${selectedQuestions.length} (${percentage}%)
            </div>
            <p style="font-size: 24px; margin: 20px 0;">${message}</p>
            <h4>Review:</h4>
        `;

        results.forEach((r, i) => {
            const reviewDiv = document.createElement('p');
            reviewDiv.innerHTML = `
                <strong>${i + 1}.</strong> ${r.question}<br>
                <span style="color: green;">Answer: ${r.correctAnswer}</span><br>
                <span>${r.result}</span>
            `;
            quizContainer.appendChild(reviewDiv);
        });

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.className = 'kizuna-quiz-close';
        closeButton.addEventListener('click', () => quizContainer.remove());
        quizContainer.appendChild(closeButton);
    }

    askQuestion(0);
} = document.createElement('div');
        menu.id = 'kizuna-menu';

        // Always add scroll buttons
        const startScrollBtn = document.createElement('button');
        startScrollBtn.textContent = 'Start Scroll';
        startScrollBtn.className = 'kizuna-menu-button';
        startScrollBtn.addEventListener('click', () => {
            zoomAwareScroll(50);
            menu.style.display = 'none';
        });

        const stopScrollBtn = document.createElement('button');
        stopScrollBtn.textContent = 'Stop Scroll';
        stopScrollBtn.className = 'kizuna-menu-button';
        stopScrollBtn.addEventListener('click', () => {
            if (window.stopScroll) window.stopScroll();
            menu.style.display = 'none';
        });
        
        menu.appendChild(startScrollBtn);
        menu.appendChild(stopScrollBtn);

        // Add quiz buttons if enabled (don't check for table existence)
        if (CONFIG.enableMdQuizz) {
            console.log('Quiz feature enabled - adding quiz buttons');
            
            const beginnerQuizBtn = document.createElement('button');
            beginnerQuizBtn.textContent = 'Beginner Quiz';
            beginnerQuizBtn.className = 'kizuna-menu-button';
            beginnerQuizBtn.addEventListener('click', () => {
                startQuiz(false);
                menu.style.display = 'none';
            });
            
            const advancedQuizBtn = document.createElement('button');
            advancedQuizBtn.textContent = 'Advanced Quiz';
            advancedQuizBtn.className = 'kizuna-menu-button';
            advancedQuizBtn.addEventListener('click', () => {
                startQuiz(true);
                menu.style.display = 'none';
            });
            
            menu.appendChild(beginnerQuizBtn);
            menu.appendChild(advancedQuizBtn);
        }

        // Add sandbox button if enabled
        if (CONFIG.enableJsSandbox) {
            console.log('JS Sandbox feature enabled');
            const sandboxBtn = document.createElement('button');
            sandboxBtn.textContent = 'JS Sandbox';
            sandboxBtn.className = 'kizuna-menu-button';
            sandboxBtn.addEventListener('click', () => {
                const sandbox = createJsSandbox();
                if (sandbox) document.body.appendChild(sandbox);
                menu.style.display = 'none';
            });
            menu.appendChild(sandboxBtn);
        }

        // Add privacy button if enabled
        if (CONFIG.enablePrivacy) {
            console.log('Privacy feature enabled');
            const privacyBtn = document.createElement('button');
            privacyBtn.textContent = 'Privacy Info';
            privacyBtn.className = 'kizuna-menu-button';
            privacyBtn.addEventListener('click', () => {
                showPrivacyPopup();
                menu.style.display = 'none';
            });
            menu.appendChild(privacyBtn);
        }

        // Toggle menu on burger click
        burger.addEventListener('click', () => {
            menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
        });

        document.body.appendChild(burger);
        document.body.appendChild(menu);
        
        console.log('Kizuna menu created successfully');
    }

    // Initialize Kizuna
    function init() {
        console.log('Initializing Kizuna...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                loadStyles();
                setTimeout(createMenu, 100);
//                if (CONFIG.enablePrivacy) {
//                    setTimeout(showPrivacyPopup, 1500);
//                }
            });
        } else {
            loadStyles();
            setTimeout(createMenu, 100);
//            if (CONFIG.enablePrivacy) {
//                setTimeout(showPrivacyPopup, 1500);
//            }
        }
    }

    // Start initialization
    init();
})();






