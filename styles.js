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
            max-height: min(80vh,
