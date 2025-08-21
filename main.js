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
                <p>This website (${CONFIG.websiteUrl}) uses the Kizuna feature enhancement service.</p>
                <p><strong>Personal Information Storage:</strong> ${CONFIG.personalInfoStored === 'yes' ? 'This website stores personal information' : 'This website does not store personal information'}.</p>
                <p>By continuing to use this website, you consent to our data processing practices in accordance with GDPR regulations.</p>
                <p>For more information, please contact the website administrator.</p>
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

    function startQuiz(isAdvanced) {
        if (!CONFIG.enableMdQuizz) {
            alert('Quiz feature is disabled for this website.');
            return;
        }
        
        const rows = Array.from(document.querySelectorAll("table tbody tr"));
        if (rows.length === 0) {
            alert('No table data found on this page. The quiz feature requires a table with questions and answers.');
            return;
        }

        console.log(`Found ${rows.length} table rows for quiz`);

        const maxQuestions = Math.min(20, rows.length);
        let selectedQuestions = [];
        let usedIndices = new Set();

        // Select random questions
        let attempts = 0;
        while (selectedQuestions.length < maxQuestions && attempts < rows.length * 3) {
            attempts++;
            const randomRowIndex = Math.floor(Math.random() * rows.length);
            
            if (usedIndices.has(randomRowIndex)) continue;
            
            const row = rows[randomRowIndex];
            const cells = row.querySelectorAll("td");

            if (!cells || cells.length < 2) continue;

            // For this demo, use column 1 as the answer
            const questionText = cells[0]?.textContent?.trim();
            const correctAnswer = cells[1]?.textContent?.trim();

            // Basic validation - just check if we have content
            if (questionText && correctAnswer && 
                questionText.length > 0 && correctAnswer.length > 0) {
                selectedQuestions.push({
                    question: questionText,
                    correctAnswer: correctAnswer,
                    rowIndex: randomRowIndex
                });
                usedIndices.add(randomRowIndex);
            }
        }

        if (selectedQuestions.length === 0) {
            alert('Could not generate quiz questions from the table data. Please ensure the table has valid question-answer pairs.');
            return;
        }

        console.log(`Generated ${selectedQuestions.length} quiz questions`);

        let score = 0;
        let timer;
        let results = [];

        // Remove existing quiz if any
        const existingQuiz = document.getElementById('kizuna-quiz-container');
        if (existingQuiz) existingQuiz.remove();

        const quizContainer = document.createElement('div');
        quizContainer.id = 'kizuna-quiz-container';
        document.body.appendChild(quizContainer);

        function askQuestion(index) {
            if (index >= selectedQuestions.length) {
                showRecap();
                return;
            }

            const currentQuestion = selectedQuestions[index];
            const { question, correctAnswer } = currentQuestion;

            // Get other answers from column 1 of other rows
            const allAnswers = [];
            rows.forEach((row, idx) => {
                if (idx !== currentQuestion.rowIndex) {
                    const answer = row.querySelectorAll("td")[1]?.textContent?.trim();
                    if (answer && answer !== correctAnswer) {
                        allAnswers.push(answer);
                    }
                }
            });

            // Select 3 random incorrect answers
            const incorrectAnswers = allAnswers
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);

            // If we don't have enough incorrect answers, add some dummy ones
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
                            correctAnswer, 
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
                    
                    // Show feedback
                    document.querySelectorAll('.kizuna-quiz-option').forEach(btn => {
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
                        correctAnswer,
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
            if (percentage >= 90) {
                emoji = '🎉🎊';
                message = 'Excellent!';
            } else if (percentage >= 70) {
                emoji = '🌟';
                message = 'Great Job!';
            } else if (percentage >= 50) {
                emoji = '👍';
                message = 'Good Effort!';
            } else {
                emoji = '📚';
                message = 'Keep Practicing!';
            }

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
    }

    // Create menu
    function createMenu() {
        console.log('Creating Kizuna menu...');
        
        const burger = document.createElement('div');
        burger.id = 'kizuna-burger';
        burger.textContent = '☰';

        const menu = document.createElement('div');
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

    // Start initialization
    init();
})();
