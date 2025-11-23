(function() {
    'use strict';

     let deferredPrompt; // shared for both auto and manual install
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('PWA install prompt captured early');
});

    
    
    // Configuration from server injection - NO QUOTES around placeholders!
    const CONFIG = {
        websiteUrl: '{{WEBSITE_URL}}',
        personalInfoStored: '{{PERSONAL_INFO_STORED}}',
        enableMdQuizz: {{ENABLE_MD_QUIZZ}},
        enableJsSandbox: {{ENABLE_JS_SANDBOX}},
        enablePrivacy: {{ENABLE_PRIVACY}}
    };

    console.log('Kizuna initialized with config:', CONFIG);

// Spawn Timer

function spawnTimer() {
  const timerBox = document.createElement('div');
  timerBox.className = 'kizuna-timer-box';

  timerBox.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
      <strong>Timer</strong>
      <button style="background:red;color:white;border:none;border-radius:4px;cursor:pointer;font-size:14px;">✖</button>
    </div>
    <div style="flex-grow:1;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:6px;">
      <div>
        <label><input type="radio" name="mode" value="timer" checked> Timer</label>
        <label><input type="radio" name="mode" value="chrono"> Chrono</label>
      </div>
      <div id="timeInput">
        <input type="number" min="1" value="3" style="width:60px;text-align:center;"> <span>min</span>
      </div>
      <div id="display" style="font-size:42px;text-align:center;font-weight:bold;margin-top:4px;">00:00</div>
    </div>
    <button id="startBtn" style="width:100%;background:#007bff;color:white;border:none;border-radius:5px;padding:6px;font-size:15px;cursor:pointer;">Start</button>
  `;

  document.body.appendChild(timerBox);

  const closeBtn = timerBox.querySelector('button');
  const startBtn = timerBox.querySelector('#startBtn');
  const display = timerBox.querySelector('#display');
  const inputDiv = timerBox.querySelector('#timeInput');
  const input = inputDiv.querySelector('input');
  const radios = timerBox.querySelectorAll('input[name=mode]');
  let interval, seconds = 0;

  closeBtn.onclick = () => timerBox.remove();

  radios.forEach(radio => {
    radio.onchange = () => {
      inputDiv.style.display = (radio.value === 'chrono' && radio.checked) ? 'none' : 'block';
    };
  });

  startBtn.onclick = () => {
    clearInterval(interval);
    const mode = [...radios].find(r => r.checked).value;
    if (mode === 'timer') {
      seconds = Number(input.value) * 60;
      updateDisplay();
      interval = setInterval(() => {
        seconds--;
        updateDisplay();
        if (seconds <= 0) {
          clearInterval(interval);
          display.textContent = 'Done';
        }
      }, 1000);
    } else {
      seconds = 0;
      interval = setInterval(() => {
        seconds++;
        updateDisplay();
      }, 1000);
    }
  };

  function updateDisplay() {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    display.textContent = `${m}:${s}`;
  }

  makeDraggable(timerBox);
}


function makeDraggable(el) {
    let isDown = false, offset = [0,0];
    el.addEventListener('mousedown', e => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        isDown = true;
        offset = [el.offsetLeft - e.clientX, el.offsetTop - e.clientY];
    });
    document.addEventListener('mouseup', () => isDown = false);
    document.addEventListener('mousemove', e => {
        if (!isDown) return;
        el.style.left = (e.clientX + offset[0]) + 'px';
        el.style.top = (e.clientY + offset[1]) + 'px';
    });
}


// Load PinyinPro dynamically
function loadPinyinPro(callback) {
    // Avoid loading twice
    if (window.PinyinPro) {
        callback();
        return;
    }

    const script = document.createElement('script');
    script.src = '/pinyin-pro@3.12.0.js';
    script.onload = () => {
        console.log('PinyinPro loaded successfully');
        // Small delay to ensure the script is fully initialized
        setTimeout(() => {
            if (callback && typeof window.PinyinPro !== 'undefined') {
                callback();
            } else {
                console.error('PinyinPro failed to initialize properly');
            }
        }, 100);
    };
    script.onerror = () => console.error('Failed to load PinyinPro');
    document.head.appendChild(script);
}



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

    // Clear All Data functionality
    async function clearAllData() {
        try {
            // Clear localStorage
            if (typeof(Storage) !== "undefined" && localStorage) {
                localStorage.clear();
                console.log('LocalStorage cleared');
            }

            // Clear sessionStorage
            if (typeof(Storage) !== "undefined" && sessionStorage) {
                sessionStorage.clear();
                console.log('SessionStorage cleared');
            }

            // Clear IndexedDB
            if ('indexedDB' in window) {
                try {
                    const databases = await indexedDB.databases();
                    await Promise.all(
                        databases.map(db => {
                            return new Promise((resolve, reject) => {
                                const deleteReq = indexedDB.deleteDatabase(db.name);
                                deleteReq.onsuccess = () => resolve();
                                deleteReq.onerror = () => reject(deleteReq.error);
                            });
                        })
                    );
                    console.log('IndexedDB cleared');
                } catch (error) {
                    console.warn('Could not clear IndexedDB:', error);
                }
            }

            // Clear Cache API
            if ('caches' in window) {
                try {
                    const cacheNames = await caches.keys();
                    await Promise.all(
                        cacheNames.map(cacheName => caches.delete(cacheName))
                    );
                    console.log('Cache API cleared');
                } catch (error) {
                    console.warn('Could not clear Cache API:', error);
                }
            }

            // Unregister Service Workers
            if ('serviceWorker' in navigator) {
                try {
                    const registrations = await navigator.serviceWorker.getRegistrations();
                    await Promise.all(
                        registrations.map(registration => registration.unregister())
                    );
                    console.log('Service Workers unregistered');
                } catch (error) {
                    console.warn('Could not unregister Service Workers:', error);
                }
            }

            // Clear cookies (best effort - same origin only)
            try {
                document.cookie.split(";").forEach(cookie => {
                    const eqPos = cookie.indexOf("=");
                    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname;
                });
                console.log('Cookies cleared');
            } catch (error) {
                console.warn('Could not clear cookies:', error);
            }

            console.log('All data clearing completed');
            return true;
        } catch (error) {
            console.error('Error during data clearing:', error);
            return false;
        }
    }

    // Show clear data confirmation popup
    function showClearDataConfirmation() {
        const popup = document.createElement('div');
        popup.id = 'kizuna-clear-data-popup';
        popup.innerHTML = `
            <div class="kizuna-clear-data-content">
                <h3>⚠️ Clear All Local Data</h3>
                <p><strong>WARNING:</strong> This action will permanently delete ALL local data stored in your browser for this website, including:</p>
                <ul>
                    <li>📦 Local Storage data</li>
                    <li>💾 Session Storage data</li>
                    <li>🗃️ IndexedDB databases</li>
                    <li>📄 Browser cache</li>
                    <li>🔧 Service Workers</li>
                    <li>🍪 Cookies (same origin)</li>
                </ul>
                <p><strong>This action cannot be undone!</strong></p>
                <p>Are you sure you want to proceed?</p>
                <div class="kizuna-clear-data-buttons">
                    <button onclick="window.kizunaConfirmClearData()" class="kizuna-clear-data-confirm">🗑️ Yes, Clear All Data</button>
                    <button onclick="window.kizunaCancelClearData()" class="kizuna-clear-data-cancel">❌ Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(popup);
    }

    // Global functions for clear data confirmation
    window.kizunaConfirmClearData = async function() {
        const popup = document.getElementById('kizuna-clear-data-popup');
        const content = popup.querySelector('.kizuna-clear-data-content');
        
        // Show loading state
        content.innerHTML = `
            <h3>🔄 Clearing Data...</h3>
            <p>Please wait while we clear all local data...</p>
            <div class="kizuna-loading-spinner"></div>
        `;

        try {
            const success = await clearAllData();
            
            if (success) {
                content.innerHTML = `
                    <h3>✅ Data Cleared Successfully</h3>
                    <p>All local data has been cleared. The page will reload in 3 seconds...</p>
                `;
                
                setTimeout(() => {
                    window.location.reload(true);
                }, 3000);
            } else {
                content.innerHTML = `
                    <h3>⚠️ Partial Success</h3>
                    <p>Some data may not have been cleared completely. The page will reload in 3 seconds...</p>
                `;
                
                setTimeout(() => {
                    window.location.reload(true);
                }, 3000);
            }
        } catch (error) {
            content.innerHTML = `
                <h3>❌ Error</h3>
                <p>An error occurred while clearing data: ${error.message}</p>
                <button onclick="window.kizunaCancelClearData()" class="kizuna-clear-data-cancel">Close</button>
            `;
        }
    };

    window.kizunaCancelClearData = function() {
        const popup = document.getElementById('kizuna-clear-data-popup');
        if (popup) popup.remove();
    };

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
                <p><strong>Website:</strong> ${CONFIG.websiteUrl}</p>
                <p><strong>Personal Information Stored:</strong> ${CONFIG.personalInfoStored === 'yes' ? 'This website stores personal information' : 'This website does not store personal information'}</p>
            </div>
            <div class="kizuna-privacy-buttons">
                <button onclick="this.closest('#kizuna-privacy-popup').remove(); document.body.classList.remove('no-scroll');">Close</button>
            </div>
        `;

        document.body.appendChild(popup);
    }

    // JavaScript 
    function createJsSandbox() {
        if (!CONFIG.enableJsSandbox) return null;
        
        const existing = document.getElementById('kizuna-js-sandbox');
        if (existing) existing.remove();
        
        const sandbox = document.createElement('div');
        sandbox.id = 'kizuna-js-sandbox';
        sandbox.innerHTML = `
            <div class="kizuna-sandbox-content">
                <h3>JavaScript </h3>
                <textarea placeholder="Paste your JavaScript code here..." rows="10"></textarea>
                <div class="kizuna-sandbox-buttons">
                    <button onclick="window.kizunaExecuteScript(this)">Execute</button>
                    <button onclick="window.kizunaClearSandbox(this)">Clear</button>
                    <button onclick="window.kizunaCloseSandbox(this)">Close</button>
                    <button onclick="window.kizunaAddPinyin(this)">Add Pinyin</button>
                    <button onclick="window.kizunaCopyOutput(this)">Copy Console Output</button>
                </div>
                <div class="kizuna-sandbox-output"></div>
            </div>
        `;
        return sandbox;
    }


    // Add pinyin to all Chinese characters on the page
window.kizunaAddPinyin = function(btn) {
    // Check if PinyinPro is available (should be loaded at init)
    if (typeof window.PinyinPro === 'undefined') {
        console.error('PinyinPro not loaded - please wait for initialization');
        return;
    }

    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];

    // Collect all text nodes containing Chinese characters
    while (walk.nextNode()) {
        const node = walk.currentNode;
        if (/[一-龥]/.test(node.textContent)) {
            textNodes.push(node);
        }
    }

    textNodes.forEach(node => {
        const parent = node.parentNode;

        // Skip script/style tags to avoid breaking the page
        if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return;

        // Create a span wrapper with pinyin
        const span = document.createElement('span');
        span.innerHTML = window.PinyinPro.spell(node.textContent, { toneType: 'num' });

        // Replace only the text node with the new span
        parent.replaceChild(span, node);
    });

    console.log('Pinyin added safely to all Chinese characters');
};
    // Copy sandbox output to clipboard
    window.kizunaCopyOutput = function(btn) {
        const sandbox = btn.closest('#kizuna-js-sandbox');
        const outputDiv = sandbox.querySelector('.kizuna-sandbox-output');
        if (!outputDiv) return;
        navigator.clipboard.writeText(outputDiv.innerText)
            .then(() => console.log('Sandbox output copied to clipboard'))
            .catch(err => console.error('Copy failed:', err));
    };


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

        // Sanitizer for advanced mode
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

        // Randomly pick rows; for each, choose a valid answer column (1..colCount-1)
        let guard = rows.length * 4; // avoid infinite loops on sparse tables
        while (selectedQuestions.length < maxQuestions && guard-- > 0) {
            const randomRowIndex = Math.floor(Math.random() * rows.length);
            if (usedRows.has(randomRowIndex)) continue;

            const row = rows[randomRowIndex];
            const cells = row.querySelectorAll("td");
            if (!cells || cells.length < 2) continue;

            const questionText = (cells[0]?.textContent || '').trim();
            if (!questionText) continue;

            // Find answer columns that have valid content
            const validCols = [];
            for (let c = 1; c < cells.length; c++) {
                const raw = cells[c]?.textContent || '';
                if (isValidCell(sanitize(raw))) validCols.push(c);
            }
            if (validCols.length === 0) continue;

            // Choose a random valid answer column for this row
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

        // Remove existing quiz if any
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

            // Gather distractors from the SAME column in other rows
            const pool = [];
            rows.forEach((r, i) => {
                if (i === rowIndex) return;
                const cell = r.querySelectorAll("td")[answerCol];
                if (!cell) return;
                const raw = (cell.textContent || '').trim();
                const val = sanitize(raw);
                if (isValidCell(val) && val !== correctAnswer) pool.push(val);
            });

            // Unique + pick up to 3
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

                    // Lock + color feedback
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
    }

    // Create menu
    function createMenu() {
        console.log('Creating Kizuna menu...');
        
        const burger = document.createElement('div');
        burger.id = 'kizuna-burger';
        burger.textContent = '☰';

        const menu = document.createElement('div');
        menu.id = 'kizuna-menu';


        
        // Add Timer button
        const timerBtn = document.createElement('button');
        timerBtn.textContent = 'Timer';
        timerBtn.className = 'kizuna-menu-button';
        timerBtn.addEventListener('click', () => {
            spawnTimer();
            menu.style.display = 'none';
        });
        menu.appendChild(timerBtn);


        
        const installBtn = document.createElement('button');
        installBtn.textContent = 'INSTALL';
        installBtn.className = 'kizuna-menu-button';
        installBtn.addEventListener('click', async () => {
            if (window.matchMedia('(display-mode: standalone)').matches) {
                alert('App is already installed.');
                return;
            }
            if (!deferredPrompt) {
                alert('App may already be installed or this website is not installable as a PWA.');
                return;
            }
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User choice: ${outcome}`);
            deferredPrompt = null;
        });
        menu.appendChild(installBtn);

        
        // Reload current page
        const reloadBtn = document.createElement('button');
        reloadBtn.textContent = 'Reload Page';
        reloadBtn.className = 'kizuna-menu-button';
        reloadBtn.addEventListener('click', () => {
          window.location.reload(); // soft reload; use location.replace(location.href) for a "harder" refresh
          menu.style.display = 'none';
        });
        menu.appendChild(reloadBtn);
    
        // About → kahiether.com
        const aboutBtn = document.createElement('button');
        aboutBtn.textContent = 'Kahiether';
        aboutBtn.className = 'kizuna-menu-button';
        aboutBtn.addEventListener('click', () => {
          // Open in same tab:
         // window.location.href = 'https://kahiether.com/';
        
          // If you prefer a new tab instead, use:
           const w = window.open('https://kahiether.com/', '_blank');
           if (w) w.opener = null; // security: prevent reverse tabnabbing
          menu.style.display = 'none';
        });
        menu.appendChild(aboutBtn);

        
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

        // Add quiz buttons if enabled
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

        // --- Auto-install proposal (independent, uses same deferredPrompt) ---
        window.addEventListener('load', async () => {
          try {
            const manifestTag = document.querySelector('link[rel="manifest"]');
            if (!manifestTag) {
              console.log('[PWA] No manifest detected — auto proposal skipped');
              return;
            }
        
            // Check manifest availability
            const res = await fetch(manifestTag.href, { method: 'HEAD' });
            if (!res.ok) {
              console.log('[PWA] Manifest fetch failed');
              return;
            }
        
            // Wait briefly to ensure beforeinstallprompt fired
            setTimeout(() => {
              if (typeof deferredPrompt !== 'undefined' && deferredPrompt && !window.matchMedia('(display-mode: standalone)').matches) {
                showKizunaAutoInstallPopup();
              }
            }, 2000);
          } catch (err) {
            console.warn('[PWA] Auto install check failed:', err);
          }
        });
        
        function showKizunaAutoInstallPopup() {
          if (document.getElementById('kizuna-auto-install-popup')) return;
        
          const popup = document.createElement('div');
          popup.id = 'kizuna-auto-install-popup';
          popup.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85);
            display: flex; align-items: center; justify-content: center;
            z-index: 999999;
          `;
        
          popup.innerHTML = `
            <div id="kizuna-auto-install-box"
              style="
                background: #111;
                color: #f8f9fa;
                border: 2px solid #007bff;
                border-radius: 12px;
                padding: 20px 24px;
                text-align: center;
                max-width: 360px;
                width: 90%;
                box-shadow: 0 0 25px rgba(0,123,255,0.6);
                font-family: system-ui, sans-serif;
              ">
              <h3 style="margin:0 0 12px 0;font-size:20px;color:#00aaff;">Install this App?</h3>
              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.4;">
                Add this Progressive Web App to your home screen for faster access and an app-like experience.
              </p>
              <div style="display:flex;justify-content:center;gap:10px;">
                <button id="kizuna-auto-yes"
                  style="background:#007bff;color:#fff;border:none;border-radius:6px;
                         padding:8px 16px;cursor:pointer;font-size:15px;">
                  Install
                </button>
                <button id="kizuna-auto-no"
                  style="background:#333;color:#ccc;border:1px solid #555;
                         border-radius:6px;padding:8px 16px;cursor:pointer;font-size:15px;">
                  Later
                </button>
              </div>
            </div>
          `;
          document.body.appendChild(popup);
        
          popup.querySelector('#kizuna-auto-yes').onclick = async () => {
            popup.remove();
            if (typeof deferredPrompt !== 'undefined' && deferredPrompt) {
              deferredPrompt.prompt();
              const { outcome } = await deferredPrompt.userChoice;
              console.log('[PWA] Auto install choice:', outcome);
              deferredPrompt = null;
            } else {
              alert('Install not available right now.');
            }
          };
        
          popup.querySelector('#kizuna-auto-no').onclick = () => popup.remove();
        }


        
        // ALWAYS add Clear All Data button (new feature)
        const clearDataBtn = document.createElement('button');
        clearDataBtn.textContent = 'Clear All Data';
        clearDataBtn.className = 'kizuna-menu-button kizuna-clear-data-button';
        clearDataBtn.addEventListener('click', () => {
            showClearDataConfirmation();
            menu.style.display = 'none';
        });
        menu.appendChild(clearDataBtn);

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
                loadPinyinPro(); // Load PinyinPro at startup
                setTimeout(createMenu, 100);
            });
        } else {
            loadStyles();
            loadPinyinPro(); // Load PinyinPro at startup
            setTimeout(createMenu, 100);
        }
    }

    // Start initialization
    init();
})();

















