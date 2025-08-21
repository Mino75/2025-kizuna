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

        /* Quiz Styles */
        #kizuna-quiz-container {
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            background-color: white;
            padding: 20px;
            border: 2px solid #007bff;
            border-radius: 10px;
            z-index: 20000;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: kizuna-zoomIn 0.3s ease;
            font-family: Arial, sans-serif;
        }

        @keyframes kizuna-zoomIn {
            from { opacity: 0; transform: translateX(-50%) scale(0.8); }
            to { opacity: 1; transform: translateX(-50%) scale(1); }
        }

        #kizuna-quiz-container h3 {
            color: #007bff;
            margin: 0 0 15px 0;
            font-size: 1.5em;
        }

        #kizuna-quiz-container h4 {
            color: #333;
            margin: 0 0 20px 0;
            font-size: 1.2em;
        }

        #kizuna-quiz-container p {
            margin: 15px 0;
            color: #333;
        }

        .kizuna-quiz-option {
            margin: 10px;
            padding: 10px 20px;
            border: 2px solid #007bff;
            border-radius: 5px;
            cursor: pointer;
            background-color: white;
            color: #007bff;
            transition: all 0.3s ease;
            font-size: 16px;
            font-family: Arial, sans-serif;
        }

        .kizuna-quiz-option:hover {
            background-color: #007bff;
            color: white;
            transform: translateY(-2px);
        }

        .kizuna-quiz-close {
            margin-top: 20px;
            padding: 10px 20px;
            border: 2px solid #007bff;
            border-radius: 5px;
            cursor: pointer;
            background-color: #007bff;
            color: white;
            font-size: 16px;
            transition: all 0.3s ease;
            font-family: Arial, sans-serif;
        }

        .kizuna-quiz-close:hover {
            background-color: #0056b3;
        }

        .kizuna-timer-display {
            margin-top: 10px;
            font-size: 18px;
            color: #dc3545;
            font-weight: bold;
            animation: kizuna-pulse 1s infinite;
            font-family: Arial, sans-serif;
        }

        @keyframes kizuna-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        /* Privacy Popup Styles */
        #kizuna-privacy-popup {
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

        @keyframes kizuna-fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .kizuna-privacy-content {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            animation: kizuna-slideDown 0.3s ease;
             /*  hauteur + overflow */
              max-height: min(80vh, 90dvh);     /* vh + dvh  */
              overflow: auto;                   /* scroll */
            
              /* overflow flex/grid */
              min-height: 0;
            
              /* Smooth scroll iOS */
              -webkit-overflow-scrolling: touch;
            
              /* scroll intern (mobile) */
              overscroll-behavior: contain;
        }

        @keyframes kizuna-slideDown {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .kizuna-privacy-content h3 {
            color: #007bff;
            margin-bottom: 20px;
            font-size: 1.5em;
        }

        .kizuna-privacy-content p {
            margin: 15px 0;
            line-height: 1.6;
            color: #333;
        }

        .kizuna-privacy-buttons {
            margin-top: 25px;
        }

        .kizuna-privacy-buttons button {
            margin: 0 10px;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
            font-family: Arial, sans-serif;
           
        }

        .kizuna-privacy-buttons button:first-child {
            background-color: #28a745;
            color: white;
        }

        .kizuna-privacy-buttons button:first-child:hover {
            background-color: #218838;
        }

        .kizuna-privacy-buttons button:last-child {
            background-color: #dc3545;
            color: white;
        }

        .kizuna-privacy-buttons button:last-child:hover {
            background-color: #c82333;
        }

        /* JavaScript Sandbox Styles */
        #kizuna-js-sandbox {
            position: fixed;
            top: 5%;
            left: 50%;
            transform: translateX(-50%);
            background-color: white;
            padding: 20px;
            border: 2px solid #007bff;
            border-radius: 10px;
            z-index: 20000;
            width: 90%;
            max-width: 700px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: kizuna-zoomIn 0.3s ease;
            font-family: Arial, sans-serif;
        }

        .kizuna-sandbox-content h3 {
            color: #007bff;
            margin-bottom: 15px;
            text-align: center;
            font-size: 1.5em;
        }

        .kizuna-sandbox-content textarea {
            width: 100%;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            resize: vertical;
            min-height: 200px;
            box-sizing: border-box;
        }

        .kizuna-sandbox-content textarea:focus {
            border-color: #007bff;
            outline: none;
        }

        .kizuna-sandbox-buttons {
            margin: 15px 0;
            text-align: center;
        }

        .kizuna-sandbox-buttons button {
            margin: 0 10px;
            padding: 10px 20px;
            border: 2px solid #007bff;
            border-radius: 5px;
            cursor: pointer;
            background-color: white;
            color: #007bff;
            transition: all 0.3s ease;
            font-family: Arial, sans-serif;
        }

        .kizuna-sandbox-buttons button:hover {
            background-color: #007bff;
            color: white;
        }

        .kizuna-sandbox-buttons button:first-child {
            background-color: #28a745;
            border-color: #28a745;
            color: white;
        }

        .kizuna-sandbox-buttons button:first-child:hover {
            background-color: #218838;
        }

        .kizuna-sandbox-buttons button:last-child {
            background-color: #dc3545;
            border-color: #dc3545;
            color: white;
        }

        .kizuna-sandbox-buttons button:last-child:hover {
            background-color: #c82333;
        }

        .kizuna-sandbox-output {
            margin-top: 15px;
            padding: 15px;
            background-color: #f8f9fa;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            min-height: 50px;
            max-height: 200px;
            overflow-y: auto;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            #kizuna-quiz-container,
            #kizuna-js-sandbox {
                width: 95%;
                padding: 15px;
            }

            .kizuna-privacy-content {
                margin: 20px;
                padding: 20px;
            }

            .kizuna-quiz-option,
            .kizuna-menu-button {
                font-size: 14px;
                padding: 8px 16px;
            }

            #kizuna-burger {
                width: 45px;
                height: 45px;
                font-size: 20px;
            }
        }

        /* REMOVED: All global styles that could conflict with host website */
        /* NO MORE: body, .container, .hero, .features, header, footer, h3, table styles */
    `;

    // Create and inject style element
    const styleElement = document.createElement('style');
    styleElement.id = 'kizuna-styles';
    styleElement.textContent = styles;
    
    // Remove existing styles if present
    const existingStyles = document.getElementById('kizuna-styles');
    if (existingStyles) {
        existingStyles.remove();
    }
    
    document.head.appendChild(styleElement);
};


