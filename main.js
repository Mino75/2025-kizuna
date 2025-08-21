(function() {
    'use strict';
    
    // Configuration from server injection
    const CONFIG = {
        websiteUrl: '{{WEBSITE_URL}}',
        personalInfoStored: '{{PERSONAL_INFO_STORED}}',
        enableMdQuizz: '{{ENABLE_MD_QUIZZ}}' === 'yes',
        enableJsSandbox: '{{ENABLE_JS_SANDBOX}}' === 'yes',
        enablePrivacy: '{{ENABLE_PRIVACY}}' === 'yes'
    };

    console.log('Kizuna Config:', CONFIG);

    // Load styles dynamically
    function loadStyles() {
        const script = document.createElement('script');
        script.src = 'https://kizuna.kahiether.com/styles.js';
        script.onload = () => window.applyKizunaStyles && window.applyKizunaStyles();
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
                <p>This website (${CONFIG.websiteUrl}) uses the Kizuna feature enhancement service.</p>
                <p><strong>Personal Information Storage:</strong> ${CONFIG.personalInfoStored === 'yes' ? 'This website stores personal information' : 'This website does not store personal information'}.</p>
                <p>By continuing to use this website, you consent to our data processing practices in accordance with GDPR regulations. We are committed to protecting your privacy and ensuring transparent data handling.</p>
                <p>For more information about how your data is processed, please contact the website administrator at ${CONFIG.websiteUrl}.</p>
                <p>You have the right to access, modify, or delete your personal data at any time.</p>
                <div class="kizuna-privacy-buttons">
                    <button onclick="this.closest('#kizuna-privacy-popup').remove()">Accept</button>
                    <button onclick="window.location.href='about:blank'">Decline</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
    }

    // JavaScript sandbox
    function createJsSandbox() {
        if (!CONFIG.enableJsSandbox) return null;
        
        const sandbox = document.createElement('div');
        sandbox.id = 'kizuna-js-sandbox';
        sandbox.innerHTML = `
            <div class="kizuna-sandbox-content">
                <h3>JavaScript Sandbox</h3>
                <textarea placeholder="Paste your JavaScript code here..." rows="10"></textarea>
                <div class="kizuna-sandbox-buttons">
                    <button onclick="executeScript(this)">Execute</button>
                    <button onclick="clearSandbox(this)">Clear</button>
                    <button onclick="closeSandbox(this)">Close</button>
                </div>
                <div class="kizuna-sandbox-output"></div>
            </div>
        `;
        return sandbox;
    }

    // Sandbox functions
    window.executeScript = function(btn) {
        const sandbox = btn.closest('#kizuna-js-sandbox');
        const textarea = sandbox.querySelector('textarea');
        const output = sandbox.querySelector('.kizuna-sandbox-output');
        
        try {
            const result = new Function(textarea.value)();
            output.innerHTML = `<strong>Result:</strong> ${result !== undefined ? result : 'Code executed successfully'}`;
            output.style.color = 'green';
        } catch (error) {
            output.innerHTML = `<strong>Error:</strong> ${error.message}`;
            output.style.color = 'red';
        }
    };

    window.clearSandbox = function(btn) {
        const sandbox = btn.closest('#kizuna-js-sandbox');
        sandbox.querySelector('textarea').value = '';
        sandbox.querySelector('.kizuna-sandbox-output').innerHTML = '';
    };

    window.closeSandbox = function(btn) {
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
        return content && !/^[a-zA-Z0-9\s\-\.,]*$/.test(content.trim());
    }

    function startQuiz(isAdvanced) {
        if (!CONFIG.enableMdQuizz) {
            alert('Quiz is disabled');
            return;
        }
        
        const rows = Array.from(document.querySelectorAll("table tbody tr"));
        if (rows.length === 0) {
            alert('No table data found on this page. Quiz requires a table structure to work.');
            return;
        }

        const totalQuestions = Math.min(20, rows.length);
        let selectedQuestions = [];

        // Select random questions
        let attempts = 0;
        while (selectedQuestions.length < totalQuestions && attempts < rows.length * 2) {
            attempts++;
            const randomRowIndex = Math.floor(Math.random() * rows.length);
            const row = rows[randomRowIndex];
            const cells = row.querySelectorAll("td");

            if (!cells.length || cells.length < 2) continue;

            const validColumns = [1, 2, 3].filter(index => 
                cells[index] && isValidCell(cells[index].textContent)
            );
            if (!validColumns.length) continue;

            const answerColumn = validColumns[Math.floor(Math.random() * validColumns.length)];
            const questionText = cells[0]?.textContent.trim();
            const correctAnswer = cells[answerColumn]?.textContent.trim();

            if (isValidCell(questionText) && isValidCell(correctAnswer)) {
                const exists = selectedQuestions.some(q => q.question === questionText);
                if (!exists) {
                    selectedQuestions.push({
                        question: questionText,
                        correctAnswer,
                        column: answerColumn
                    });
                }
            }
        }

        if (selectedQuestions.length === 0) {
            alert('No valid quiz questions found in the table data.');
            return;
        }

        let score = 0;
        let timer;
        let results = [];

        const quizContainer = document.createElement('div');
        quizContainer.id = 'kizuna-quiz-container';
        document.body.appendChild(quizContainer);

        function askQuestion(index) {
            if (index >= selectedQuestions.length) {
                showRecap();
                return;
            }

            const currentQuestion = selectedQuestions[index];
            const { question, correctAnswer, column } = currentQuestion;

            const cleanAnswer = isAdvanced ? correctAnswer
                .normalize("NFD")
                .replace(/[a-zA-Z0-9()\.\,~\u0300-\u036f]/g, "")
                .replace(/\s+/g, " ")
                .trim() : correctAnswer;

            const allAnswers = rows.map(row => {
                const cellContent = row.querySelectorAll("td")[column]?.textContent.trim();
                return isAdvanced ? cellContent?.normalize("NFD").replace(/[a-zA-Z0-9()\.\,~\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim() : cellContent;
            }).filter(answer => isValidCell(answer));

            const incorrectAnswers = allAnswers.filter(answer => answer !== cleanAnswer)
                .sort(() => 0.5 - Math.random()).slice(0, 3);

            const options = [cleanAnswer, ...incorrectAnswers].sort(() => 0.5 - Math.random());

            quizContainer.innerHTML = `<h3>Question ${index + 1}/${selectedQuestions.length}</h3><h4>What is the translation of "${question}"?</h4>`;

            if (isAdvanced) {
                const timerDisplay = document.createElement('div');
                timerDisplay.className = 'kizuna-timer-display';
                quizContainer.appendChild(timerDisplay);

                let timeLeft = 21;
                timerDisplay.textContent = `Time remaining: ${timeLeft}s`;
                timer = setInterval(() => {
                    timerDisplay.textContent = `Time remaining: ${timeLeft--}s`;
                    if (timeLeft < 1) {
                        clearInterval(timer);
                        results.push({ question, correctAnswer, result: "❌ Wrong (Time Out)" });
                        askQuestion(index + 1);
                    }
                }, 1000);
            }

            options.forEach(option => {
                const optionButton = document.createElement('button');
                optionButton.textContent = option;
                optionButton.className = 'kizuna-quiz-option';
                optionButton.addEventListener('click', () => {
                    clearTimeout(timer);
                    clearInterval(timer);
                    const isCorrect = option === cleanAnswer;
                    optionButton.style.backgroundColor = isCorrect ? "green" : "red";
                    optionButton.style.color = "white";

                    if (isCorrect) score++;

                    quizContainer.innerHTML += `<p>Correct answer: <strong>${correctAnswer}</strong></p>`;

                    results.push({ question, correctAnswer, result: isCorrect ? "✔️ Right" : "❌ Wrong" });
                    setTimeout(() => askQuestion(index + 1), 2000);
                });
                quizContainer.appendChild(optionButton);
            });
        }

        function showRecap() {
            quizContainer.innerHTML = "<h3>Quiz Recap</h3>";
            results.forEach((r, i) => {
                quizContainer.innerHTML += `<p><strong>${i + 1}.</strong> ${r.question} - <strong>${r.correctAnswer}</strong> - ${r.result}</p>`;
            });

            const percentage = Math.round((score / selectedQuestions.length) * 100);
            
            if (percentage >= 90) {
                quizContainer.innerHTML += `<div style='font-size: 48px; margin: 20px; color: gold;'>${score}/${selectedQuestions.length} (${percentage}%) 🎉🎊 Excellent! 🎊🎉</div>`;
            } else if (percentage >= 70) {
                quizContainer.innerHTML += `<div style='font-size: 36px; margin: 20px; color: green;'>${score}/${selectedQuestions.length} (${percentage}%) 🌟 Great Job! 🌟</div>`;
            } else if (percentage >= 50) {
                quizContainer.innerHTML += `<div style='font-size: 24px; margin: 20px; color: orange;'>${score}/${selectedQuestions.length} (${percentage}%) 👍 Good Effort! 👍</div>`;
            } else {
                quizContainer.innerHTML += `<div style='font-size: 24px; margin: 20px; color: red;'>${score}/${selectedQuestions.length} (${percentage}%) - You need more review</div>`;
            }

            const closeButton = document.createElement('button');
            closeButton.textContent = "Close";
            closeButton.className = 'kizuna-quiz-close';
            closeButton.addEventListener('click', () => quizContainer.remove());
            quizContainer.appendChild(closeButton);
        }

        askQuestion(0);
    }

    // Create menu
    function createMenu() {
        const burger = document.createElement('div');
        burger.id = 'kizuna-burger';
        burger.textContent = "☰";

        const menu = document.createElement('div');
        menu.id = 'kizuna-menu';

        function createButton(text, clickHandler) {
            const button = document.createElement('button');
            button.textContent = text;
            button.className = 'kizuna-menu-button';
            button.addEventListener('click', clickHandler);
            return button;
        }

        // Always add scroll buttons
        const startScrollButton = createButton("Start Scroll", () => zoomAwareScroll(50));
        const stopScrollButton = createButton("Stop Scroll", () => window.stopScroll && window.stopScroll());
        
        menu.appendChild(startScrollButton);
        menu.appendChild(stopScrollButton);

        // Add quiz buttons if enabled
        if (CONFIG.enableMdQuizz) {
            console.log('Adding quiz buttons');
            const beginnerQuizButton = createButton("Beginner Quiz", () => startQuiz(false));
            const advancedQuizButton = createButton("Advanced Quiz", () => startQuiz(true));
            menu.appendChild(beginnerQuizButton);
            menu.appendChild(advancedQuizButton);
        }

        // Add sandbox button if enabled
        if (CONFIG.enableJsSandbox) {
            console.log('Adding sandbox button');
            const sandboxButton = createButton("JS Sandbox", () => {
                const sandbox = createJsSandbox();
                if (sandbox) document.body.appendChild(sandbox);
            });
            menu.appendChild(sandboxButton);
        }

        // Add privacy button if enabled
        if (CONFIG.enablePrivacy) {
            console.log('Adding privacy button');
            const privacyButton = createButton("Privacy Info", showPrivacyPopup);
            menu.appendChild(privacyButton);
        }

        burger.addEventListener('click', () => {
            menu.style.display = menu.style.display === "none" || menu.style.display === "" ? "block" : "none";
        });

        document.body.appendChild(burger);
        document.body.appendChild(menu);
    }

    // Initialize Kizuna
    function init() {
        console.log('Initializing Kizuna...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                loadStyles();
                setTimeout(createMenu, 100);
                if (CONFIG.enablePrivacy) {
                    setTimeout(showPrivacyPopup, 1500);
                }
            });
        } else {
            loadStyles();
            setTimeout(createMenu, 100);
            if (CONFIG.enablePrivacy) {
                setTimeout(showPrivacyPopup, 1500);
            }
        }
    }

    init();
})();
