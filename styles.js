/* Kizuna Styles - All CSS for the application */

:root {
    --primary-color: #007bff;
    --primary-hover: #0056b3;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    --white: #ffffff;
    --border-radius: 5px;
    --border-radius-circle: 50%;
    --transition: all 0.3s ease;
    --shadow: 0 2px 10px rgba(0,0,0,0.1);
    --z-index-high: 2000;
    --z-index-medium: 1000;
}

* {
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    color: var(--dark-color);
}

/* Main Kizuna Container */
#kizuna-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

#kizuna-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 40px 0;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
    color: var(--white);
    border-radius: var(--border-radius);
}

#kizuna-header h1 {
    margin: 0;
    font-size: 3rem;
    font-weight: 300;
}

#kizuna-header p {
    margin: 10px 0 0 0;
    font-size: 1.2rem;
    opacity: 0.9;
}

/* Feature Cards */
#kizuna-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.feature-card {
    background: var(--white);
    padding: 30px 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    text-align: center;
    transition: var(--transition);
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.feature-card h3 {
    color: var(--primary-color);
    margin-bottom: 15px;
}

/* Integration Section */
#kizuna-integration {
    background: var(--light-color);
    padding: 30px;
    border-radius: var(--border-radius);
    margin-bottom: 40px;
}

#integration-code {
    display: block;
    background: var(--dark-color);
    color: var(--light-color);
    padding: 20px;
    border-radius: var(--border-radius);
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    white-space: pre-wrap;
    overflow-x: auto;
    margin-top: 15px;
}

/* Footer */
#kizuna-footer {
    text-align: center;
    padding: 20px 0;
    border-top: 1px solid #eee;
    color: var(--secondary-color);
}

/* Injected Components - Hamburger Menu */
.kizuna-burger {
    position: fixed !important;
    bottom: 20px !important;
    right: 20px !important;
    font-size: 24px !important;
    cursor: pointer !important;
    z-index: var(--z-index-medium) !important;
    background-color: var(--primary-color) !important;
    color: var(--white) !important;
    width: 50px !important;
    height: 50px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border: none !important;
    border-radius: var(--border-radius-circle) !important;
    box-shadow: var(--shadow) !important;
    transition: var(--transition) !important;
}

.kizuna-burger:hover {
    background-color: var(--primary-hover) !important;
    transform: scale(1.1) !important;
}

/* Injected Menu */
.kizuna-menu {
    position: fixed !important;
    bottom: 80px !important;
    right: 20px !important;
    background-color: var(--white) !important;
    border: 1px solid var(--primary-color) !important;
    border-radius: var(--border-radius) !important;
    padding: 15px !important;
    display: none !important;
    z-index: var(--z-index-medium) !important;
    box-shadow: var(--shadow) !important;
    min-width: 180px !important;
}

.kizuna-menu button {
    display: block !important;
    width: 100% !important;
    margin-bottom: 8px !important;
    background-color: var(--primary-color) !important;
    color: var(--white) !important;
    border: none !important;
    border-radius: var(--border-radius) !important;
    padding: 8px 12px !important;
    cursor: pointer !important;
    transition: var(--transition) !important;
    font-size: 14px !important;
}

.kizuna-menu button:last-child {
    margin-bottom: 0 !important;
}

.kizuna-menu button:hover {
    background-color: var(--primary-hover) !important;
    transform: translateX(-2px) !important;
}

.kizuna-menu button:active {
    transform: scale(0.95) !important;
}

/* Quiz Styles */
.kizuna-quiz-container {
    position: fixed !important;
    top: 5% !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    background-color: var(--white) !important;
    padding: 25px !important;
    border: 2px solid var(--primary-color) !important;
    border-radius: 10px !important;
    z-index: var(--z-index-high) !important;
    width: 90% !important;
    max-width: 600px !important;
    max-height: 85vh !important;
    overflow-y: auto !important;
    text-align: center !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
}

.kizuna-quiz-container h3 {
    color: var(--primary-color) !important;
    margin-bottom: 20px !important;
    font-size: 1.3rem !important;
}

.kizuna-quiz-button {
    margin: 8px !important;
    padding: 12px 20px !important;
    border: 2px solid var(--primary-color) !important;
    border-radius: var(--border-radius) !important;
    cursor: pointer !important;
    background-color: var(--white) !important;
    color: var(--primary-color) !important;
    transition: var(--transition) !important;
    font-size: 14px !important;
    min-width: 120px !important;
}

.kizuna-quiz-button:hover {
    background-color: var(--primary-color) !important;
    color: var(--white) !important;
}

.kizuna-timer {
    margin-top: 15px !important;
    font-size: 18px !important;
    color: var(--danger-color) !important;
    font-weight: bold !important;
}

/* Modal Styles */
.modal {
    display: none;
    position: fixed;
    z-index: var(--z-index-high);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.modal-content {
    background-color: var(--white);
    margin: 5% auto;
    padding: 30px;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
}

.close {
    color: var(--secondary-color);
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 15px;
}

.close:hover {
    color: var(--dark-color);
}

.modal-buttons {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: center;
}

.btn-primary {
    background-color: var(--primary-color);
    color: var(--white);
    border: none;
    padding: 10px 20px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
}

.btn-primary:hover {
    background-color: var(--primary-hover);
}

.btn-secondary {
    background-color: var(--secondary-color);
    color: var(--white);
    border: none;
    padding: 10px 20px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
}

.btn-secondary:hover {
    background-color: #5a6268;
}

/* JS Sandbox Styles */
#js-input {
    width: 100%;
    height: 200px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
    padding: 10px;
    resize: vertical;
    margin-bottom: 15px;
}

#js-output {
    background-color: var(--dark-color);
    color: var(--light-color);
    padding: 15px;
    border-radius: var(--border-radius);
    font-family: 'Courier New', monospace;
    font-size: 12px;
    white-space: pre-wrap;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 15px;
    min-height: 60px;
}

/* Privacy Notice Styles */
#privacy-content {
    text-align: left;
    line-height: 1.6;
    margin-bottom: 20px;
}

#privacy-content h3 {
    color: var(--primary-color);
    margin-top: 20px;
    margin-bottom: 10px;
}

#privacy-content ul {
    padding-left: 20px;
}

#privacy-content li {
    margin-bottom: 5px;
}

/* Responsive Design */
@media (max-width: 768px) {
    #kizuna-container {
        padding: 10px;
    }
    
    #kizuna-header h1 {
        font-size: 2rem;
    }
    
    .kizuna-menu {
        right: 10px !important;
        bottom: 70px !important;
        min-width: 160px !important;
    }
    
    .kizuna-burger {
        right: 10px !important;
        bottom: 10px !important;
    }
    
    .modal-content {
        margin: 10% auto;
        padding: 20px;
        width: 95%;
    }
    
    .kizuna-quiz-container {
        width: 95% !important;
        padding: 20px !important;
        top: 2% !important;
    }
}

/* Success/Error States */
.success {
    background-color: var(--success-color) !important;
    color: var(--white) !important;
}

.error {
    background-color: var(--danger-color) !important;
    color: var(--white) !important;
}

.warning {
    background-color: var(--warning-color) !important;
    color: var(--dark-color) !important;
}

/* Animation Classes */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-in {
    animation: fadeIn 0.3s ease-out;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.pulse {
    animation: pulse 0.6s ease-in-out;
}
