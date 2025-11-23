window.applyKizunaStyles = function() {
    const styles = `
        /* Only style Kizuna-specific elements - no global overrides */
        
        /* Kizuna Menu Styles */
        #kizuna-burger {
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 24px;
            cursor: pointer;
            z-index: 10000;
            background-color: transparent;
            color: #007bff;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #007bff;
            border-radius: 50%;
            transition: all 0.3s ease;
            user-select: none;
            font-family: Arial, sans-serif;
        }

        #kizuna-burger:hover {
            background-color: #007bff;
            color: white;
            transform: scale(1.1);
        }

        #kizuna-menu {
            position: fixed;
            bottom: 70px;
            right: 20px;
            background-color: transparent;
            border: none;
            padding: 0;
            display: none;
            z-index: 10000;
            animation: kizuna-slideUp 0.3s ease;
            font-family: Arial, sans-serif;
        }

        @keyframes kizuna-slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .kizuna-menu-button {
            display: block;
            margin-bottom: 10px;
            background-color: #007bff;
            color: white;
            border: 2px solid #007bff;
            border-radius: 5px;
            padding: 8px 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
            min-width: 120px;
            font-family: Arial, sans-serif;
        }

        .kizuna-menu-button:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,123,255,0.3);
        }

        .kizuna-menu-button:active {
            transform: scale(0.95);
        }

        /* Clear Data Button Special Styling */
        .kizuna-clear-data-button {
            background-color: #dc3545 !important;
            border-color: #dc3545 !important;
            color: white !important;
        }

        .kizuna-clear-data-button:hover {
            background-color: #c82333 !important;
            border-color: #c82333 !important;
        }

        /* Clear All Data Popup Styles */
        #kizuna-clear-data-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            z-index: 30000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: kizuna-fadeIn 0.3s ease;
            font-family: Arial, sans-serif;
        }

        .kizuna-clear-data-content {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 550px;
            text-align: left;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            animation: kizuna-slideDown 0.3s ease;
            max-height: 80vh;
            overflow-y: auto;
        }

        .kizuna-clear-data-content h3 {
            color: #dc3545;
            margin-bottom: 15px;
            text-align: center;
        }

        .kizuna-clear-data-content ul {
            margin: 15px 0;
            padding-left: 20px;
        }

        .kizuna-clear-data-content li {
            margin: 8px 0;
        }

        .kizuna-clear-data-buttons {
            text-align: center;
            margin-top: 25px;
        }

        .kizuna-clear-data-confirm,
        .kizuna-clear-data-cancel {
            margin: 0 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        }

        .kizuna-clear-data-confirm {
            background-color: #dc3545;
            color: white;
        }

        .kizuna-clear-data-confirm:hover {
            background-color: #c82333;
        }

        .kizuna-clear-data-cancel {
            background-color: #6c757d;
            color: white;
        }

        .kizuna-clear-data-cancel:hover {
            background-color: #5a6268;
        }

        .kizuna-loading-spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #007bff;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: kizuna-spin 1s linear infinite;
            margin: 20px auto;
        }

        @keyframes kizuna-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes kizuna-fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes kizuna-slideDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Privacy Popup Styles */
        #kizuna-privacy-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            z-index: 25000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: kizuna-fadeIn 0.3s ease;
            font-family: Arial, sans-serif;
        }

        .kizuna-privacy-content {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            animation: kizuna-slideDown 0.3s ease;
        }

        .kizuna-privacy-content h3 {
            color: #007bff;
            margin-bottom: 20px;
            text-align: center;
        }

        .kizuna-privacy-content p {
            margin-bottom: 15px;
            line-height: 1.6;
        }

        .kizuna-privacy-buttons {
            text-align: center;
            margin-top: 25px;
        }

        .kizuna-privacy-buttons button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 25px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            font-family: Arial, sans-serif;
            transition: background-color 0.3s ease;
        }

        .kizuna-privacy-buttons button:hover {
            background-color: #0056b3;
        }

        /* JavaScript Sandbox Styles */
        #kizuna-js-sandbox {
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            background-color: white;
            border: 2px solid #007bff;
            border-radius: 10px;
            padding: 20px;
            z-index: 20000;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            animation: kizuna-slideDown 0.3s ease;
            font-family: Arial, sans-serif;
        }

        .kizuna-sandbox-content h3 {
            color: #007bff;
            margin-bottom: 15px;
            text-align: center;
        }

        .kizuna-sandbox-content textarea {
            width: 100%;
            min-height: 200px;
            border: 2px solid #ddd;
            border-radius: 5px;
            padding: 10px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            resize: vertical;
            margin-bottom: 15px;
        }

        .kizuna-sandbox-buttons {
            text-align: center;
            margin-bottom: 15px;
        }

        .kizuna-sandbox-buttons button {
            margin: 0 5px;
            padding: 8px 15px;
            border: 2px solid #007bff;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        }

        .kizuna-sandbox-buttons button:first-child {
            background-color: #007bff;
            color: white;
        }

        .kizuna-sandbox-buttons button:first-child:hover {
            background-color: #0056b3;
        }

        .kizuna-sandbox-buttons button:not(:first-child) {
            background-color: white;
            color: #007bff;
        }

        .kizuna-sandbox-buttons button:not(:first-child):hover {
            background-color: #f8f9fa;
        }

        .kizuna-sandbox-output {
            background-color: #f8f9fa;
            border: 2px solid #ddd;
            border-radius: 5px;
            padding: 10px;
            min-height: 100px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            white-space: pre-wrap;
            overflow-x: auto;
        }

        /* Quiz Styles */
        #kizuna-quiz-container {
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            background-color: white;
            border: 2px solid #007bff;
            border-radius: 10px;
            padding: 20px;
            z-index: 15000;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            text-align: center;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            animation: kizuna-slideDown 0.3s ease;
            font-family: Arial, sans-serif;
        }

        #kizuna-quiz-container h3 {
            color: #007bff;
            margin-bottom: 15px;
        }

        #kizuna-quiz-container h4 {
            color: #333;
            margin-bottom: 20px;
            font-size: 18px;
        }

        .kizuna-quiz-option {
            display: block;
            width: 100%;
            margin: 10px 0;
            padding: 12px 20px;
            border: 2px solid #007bff;
            border-radius: 5px;
            background-color: white;
            color: #007bff;
            cursor: pointer;
            font-size: 16px;
            font-family: Arial, sans-serif;
            transition: all 0.3s ease;
        }

        .kizuna-quiz-option:hover:not(:disabled) {
            background-color: #007bff;
            color: white;
        }

        .kizuna-quiz-option:disabled {
            cursor: not-allowed;
        }

        .kizuna-quiz-close {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 25px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            font-family: Arial, sans-serif;
            margin-top: 20px;
            transition: background-color 0.3s ease;
        }

        .kizuna-quiz-close:hover {
            background-color: #0056b3;
        }

        .kizuna-timer-display {
            margin: 15px 0;
            font-size: 18px;
            color: #dc3545;
            font-weight: bold;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
            #kizuna-burger {
                bottom: 15px;
                right: 15px;
                width: 45px;
                height: 45px;
                font-size: 20px;
            }

            #kizuna-menu {
                bottom: 65px;
                right: 15px;
            }

            .kizuna-menu-button {
                font-size: 12px;
                padding: 6px 10px;
                min-width: 100px;
            }

            .kizuna-clear-data-content,
            .kizuna-privacy-content,
            #kizuna-js-sandbox,
            #kizuna-quiz-container {
                width: 95%;
                margin: 0 auto;
                padding: 20px;
            }

            .kizuna-sandbox-content textarea {
                min-height: 150px;
                font-size: 12px;
            }

            .kizuna-quiz-option {
                font-size: 14px;
                padding: 10px 15px;
            }
        }

        /* Prevent body scroll when popups are open */
        .no-scroll {
            overflow: hidden;
        }
        /* ============================
       TIMER BOX
    ============================ */
    .kizuna-timer-box {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(var(--kizuna-bg-rgb), 0.85);
        color: var(--kizuna-text);
        padding: 12px 16px;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 500;
        box-shadow: 0px 4px 12px rgba(0,0,0,0.15);
        backdrop-filter: blur(8px);
        z-index: 9999;
        user-select: none;
    }
    
    /* ============================
       AUTO-INSTALL POPUP BACKDROP
    ============================ */
    #kizuna-auto-install-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(6px);
        background: rgba(0,0,0,0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        animation: kizuna-fadeIn 0.3s ease;
    }
    
    /* ============================
       AUTO-INSTALL BOX
    ============================ */
    #kizuna-auto-install-box {
        background: var(--kizuna-bg);
        color: var(--kizuna-text);
        padding: 24px;
        border-radius: 16px;
        max-width: 380px;
        width: 90%;
        box-shadow: 0 6px 18px rgba(0,0,0,0.25);
        text-align: center;
        animation: kizuna-slideDown 0.25s ease;
    }
    
    /* Popup title */
    #kizuna-auto-install-box h3 {
        margin-top: 0;
        font-size: 20px;
        font-weight: 600;
    }
    
    /* Popup description */
    #kizuna-auto-install-box p {
        font-size: 15px;
        line-height: 1.5;
        margin-bottom: 20px;
    }

    /* ============================
       AUTO-INSTALL BUTTONS
    ============================ */
    .kizuna-auto-install-buttons {
        display: flex;
        gap: 12px;
        justify-content: center;
    }
    
    .kizuna-auto-install-buttons button {
        padding: 8px 16px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        transition: all 0.25s ease;
    }
    
    /* Primary Confirm Button */
    .kizuna-auto-install-confirm {
        background: var(--kizuna-accent);
        color: #ffffff;
    }
    .kizuna-auto-install-confirm:hover {
        opacity: 0.85;
    }
    
    /* Secondary Cancel Button */
    .kizuna-auto-install-cancel {
        background: rgba(var(--kizuna-bg-rgb), 0.7);
        color: var(--kizuna-text);
    }
    .kizuna-auto-install-cancel:hover {
        background: rgba(var(--kizuna-bg-rgb), 0.9);
    }

        
    `;

    // Remove existing Kizuna styles if any
    const existingStyles = document.getElementById('kizuna-styles');
    if (existingStyles) {
        existingStyles.remove();
    }

    // Add the new styles
    const styleElement = document.createElement('style');
    styleElement.id = 'kizuna-styles';
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    console.log('Kizuna styles applied successfully');
};

