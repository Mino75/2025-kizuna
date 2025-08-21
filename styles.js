window.applyKizunaStyles = function() {
    const styles = `
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
            animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .menu-button {
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
        }

        .menu-button:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,123,255,0.3);
        }

        .menu-button:active {
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
            animation: zoomIn 0.3s ease;
        }

        @keyframes zoomIn {
            from { opacity: 0; transform: translateX(-50%) scale(0.8); }
            to { opacity: 1; transform: translateX(-50%) scale(1); }
        }

        .quiz-option {
            margin: 10px;
            padding: 10px 20px;
            border: 2px solid #007bff;
            border-radius: 5px;
            cursor: pointer;
            background-color: white;
            color: #007bff;
            transition: all 0.3s ease;
            font-size: 16px;
        }

        .quiz-option:hover {
            background-color: #007bff;
            color: white;
            transform: translateY(-2px);
        }

        .quiz-close {
            margin-top: 20px;
            padding: 10px 20px;
            border: 2px solid #007bff;
            border-radius: 5px;
            cursor: pointer;
            background-color: #007bff;
            color: white;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        .quiz-close:hover {
            background-color: #0056b3;
        }

        .timer-display {
            margin-top: 10px;
            font-size: 18px;
            color: #dc3545;
            font-weight: bold;
            animation: pulse 1s infinite;
        }

        @keyframes pulse {
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
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .privacy-content {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .privacy-content h3 {
            color: #007bff;
            margin-bottom: 20px;
        }

        .privacy-content p {
            margin: 15px 0;
            line-height: 1.6;
            color: #333;
        }

        .privacy-buttons {
            margin-top: 25px;
        }

        .privacy-buttons button {
            margin: 0 10px;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        .privacy-buttons button:first-child {
            background-color: #28a745;
            color: white;
        }

        .privacy-buttons button:first-child:hover {
            background-color: #218838;
        }

        .privacy-buttons button:last-child {
            background-color: #dc3545;
            color: white;
        }

        .privacy-buttons button:last-child:hover {
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
            animation: zoomIn 0.3s ease;
        }

        .sandbox-content h3 {
            color: #007bff;
            margin-bottom: 15px;
            text-align: center;
        }

        .sandbox-content textarea {
            width: 100%;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            resize: vertical;
            min-height: 200px;
        }

        .sandbox-content textarea:focus {
            border-color: #007bff;
            outline: none;
        }

        .sandbox-buttons {
            margin: 15px 0;
            text-align: center;
        }

        .sandbox-buttons button {
            margin: 0 10px;
            padding: 10px 20px;
            border: 2px solid #007bff;
            border-radius: 5px;
            cursor: pointer;
            background-color: white;
            color: #007bff;
            transition: all 0.3s ease;
        }

        .sandbox-buttons button:hover {
            background-color: #007bff;
            color: white;
        }

        .sandbox-buttons button:first-child {
            background-color: #28a745;
            border-color: #28a745;
            color: white;
        }

        .sandbox-buttons button:first-child:hover {
            background-color: #218838;
        }

        .sandbox-buttons button:last-child {
            background-color: #dc3545;
            border-color: #dc3545;
            color: white;
        }

        .sandbox-buttons button:last-child:hover {
            background-color: #c82333;
        }

        .sandbox-output {
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

            .privacy-content {
                margin: 20px;
                padding: 20px;
            }

            .quiz-option,
            .menu-button {
                font-size: 14px;
                padding: 8px 16px;
            }

            #kizuna-burger {
                width: 45px;
                height: 45px;
                font-size: 20px;
            }
        }
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

