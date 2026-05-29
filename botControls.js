// botControls.js
let botStartTime = null;
let todayTradesCount = 0;
let todayPnL = 0;

function updateBotStatusIndicator(status) {
    const indicator = document.querySelector('.status-indicator');
    indicator.classList.remove('running', 'paused', 'stopped');
    indicator.classList.add(status);
    const statusText = document.querySelector('.bot-status span');
    statusText.textContent = `Bot ${status.charAt(0).toUpperCase() + status.slice(1)}`;
}

function updateBotStatusDetails() {
    const activeTimeSpan = document.getElementById('activeTime');
    const todayTradesSpan = document.getElementById('todayTrades');
    const todayPnLSpan = document.getElementById('todayPnL');
    if (botStartTime) {
        const duration = Math.floor((Date.now() - botStartTime) / 1000);
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor(duration % 3600 / 60);
        activeTimeSpan.textContent = `${hours}h ${minutes}m`;
    } else {
        activeTimeSpan.textContent = 'Not Started';
    }
    todayTradesSpan.textContent = todayTradesCount;
    todayPnLSpan.textContent = `C$${todayPnL.toFixed(2)}`;
}

function startBot() {
    document.getElementById('startBot').disabled = true;
    document.getElementById('pauseBot').disabled = false;
    document.getElementById('stopBot').disabled = false;
    updateBotStatusIndicator('running');
    window.notificationSystem.addNotification('success', 'Bot Started', 'Trading bot is now active');
    botStartTime = Date.now();
    setInterval(updateBotStatusDetails, 1000);
}

function pauseBot() {
    document.getElementById('startBot').disabled = false;
    document.getElementById('pauseBot').disabled = true;
    document.getElementById('stopBot').disabled = false;
    updateBotStatusIndicator('paused');
    window.notificationSystem.addNotification('warning', 'Bot Paused', 'Trading bot has been paused');
}

function stopBot() {
    document.getElementById('startBot').disabled = false;
    document.getElementById('pauseBot').disabled = true;
    document.getElementById('stopBot').disabled = true;
    updateBotStatusIndicator('stopped');
    window.notificationSystem.addNotification('warning', 'Bot Stopped', 'Trading bot has been stopped');
    botStartTime = null;
    updateBotStatusDetails();
}

function toggleAIAuto() {
    const aiAutoBtn = document.getElementById('aiAuto');
    const currentText = aiAutoBtn.querySelector('.ai-auto-text').textContent;
    const isOff = currentText === 'AI Auto: Off';
    if (isOff) {
        aiAutoBtn.innerHTML = `
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/>
            </svg>
            <span class="ai-auto-text">AI Auto: On</span>`;
        aiAutoBtn.classList.add('ai-active');
        window.notificationSystem.addNotification('success', 'AI Auto Enabled', 'Bot will now use AI for automated trading decisions');
    } else {
        aiAutoBtn.innerHTML = `
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/>
            </svg>
            <span class="ai-auto-text">AI Auto: Off</span>`;
        aiAutoBtn.classList.remove('ai-active');
        window.notificationSystem.addNotification('warning', 'AI Auto Disabled', 'Bot will now require manual trade confirmation');
    }
}
 
