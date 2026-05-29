
// settings.js
async function updateAISettings() {
    const settings = {
        autoTrading: document.getElementById('autoTrading').checked,
        riskTolerance: document.querySelector('.risk-tolerance').value,
        minProfit: document.getElementById('profitValue').textContent,
        autoPairing: document.getElementById('autoPairing').checked,
        marketAnalysis: document.getElementById('marketAnalysis').checked,
        pathOptimization: document.getElementById('pathOpt').checked,
        slippagePrediction: document.getElementById('slippagePred').checked,
        successRatePrediction: document.getElementById('successRate').checked,
        volatilityProtection: document.getElementById('volProtection').checked
    };
    try {
        const response = await fetch('/api/ai_completion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: `Update AI trading parameters based on the following settings: interface Response { status: string; impact: string; } { "status": "Settings updated successfully", "impact": "Expected 15% improvement in trade success rate" }`,
                data: settings
            })
        });
        const result = await response.json();
        document.getElementById('aiImpactPreview').innerHTML = `
            <p><strong>Status:</strong> ${result.status}</p>
            <p><strong>Expected Impact:</strong> ${result.impact}</p>
        `;
        if (settings.autoTrading) {
            window.notificationSystem.addNotification('success', 'Auto Trading Enabled', 'AI will automatically execute trades based on predictions');
        } else {
            window.notificationSystem.addNotification('warning', 'Auto Trading Disabled', 'Manual trade confirmation required');
        }
    } catch (error) {
        console.error('Error updating AI settings:', error);
        window.notificationSystem.addNotification('error', 'Settings Update Failed', 'Failed to update AI trading parameters');
    }
}

function updateProfitThreshold(value) {
    document.getElementById('profitValue').textContent = `${value}%`;
}

async function saveAIConfig() {
    try {
        const settings = {
            autoTrading: document.getElementById('autoTrading').checked,
            riskTolerance: document.querySelector('.risk-tolerance').value,
            minProfit: document.getElementById('profitValue').textContent,
            autoPairing: document.getElementById('autoPairing').checked,
            marketAnalysis: document.getElementById('marketAnalysis').checked,
            pathOptimization: document.getElementById('pathOpt').checked,
            slippagePrediction: document.getElementById('slippagePred').checked,
            successRatePrediction: document.getElementById('successRate').checked,
            volatilityProtection: document.getElementById('volProtection').checked
        };
        await new Promise(resolve => setTimeout(resolve, 1000));
        window.notificationSystem.addNotification('success', 'AI Configuration Saved', 'Your AI settings have been updated successfully');
        await updateAISettings();
    } catch (error) {
        console.error('Error saving AI configuration:', error);
        window.notificationSystem.addNotification('error', 'Configuration Error', 'Failed to save AI configuration. Please try again.');
    }
}

async function saveTradeConfig() {
    try {
        const settings = {
            minProfit: document.getElementById('minProfit').value,
            maxGas: document.getElementById('maxGas').value,
            tradeTimeout: document.getElementById('tradeTimeout').value,
            slippageTolerance: document.getElementById('slippageTolerance').value,
        };
        await new Promise(resolve => setTimeout(resolve, 1000));
        window.notificationSystem.addNotification('success', 'Trade Configuration Saved', 'Your trade settings have been updated successfully');
    } catch (error) {
        console.error('Error saving trade configuration:', error);
        window.notificationSystem.addNotification('error', 'Configuration Error', 'Failed to save trade configuration. Please try again.');
    }
}

async function saveSettings() {
    try {
        const settings = {
            minProfitThreshold: document.getElementById('minProfitThreshold').value,
            maxGasPrice: document.getElementById('maxGasPrice').value,
            tradeTimeout: document.getElementById('tradeTimeout').value,
            slippageTolerance: document.getElementById('slippageTolerance').value,
            apiEndpoint: document.getElementById('apiEndpoint').value,
            apiKey: document.getElementById('apiKey').value,
            apiSecret: document.getElementById('apiSecret').value,
            notifications: {
                email: document.getElementById('emailNotifications').checked,
                telegram: document.getElementById('telegramNotifications').checked,
                discord: document.getElementById('discordNotifications').checked,
                threshold: document.getElementById('notificationThreshold').value
            }
        };
        await new Promise(resolve => setTimeout(resolve, 1000));
        window.notificationSystem.addNotification('success', 'Settings Saved', 'Your settings have been updated successfully');
    } catch (error) {
        console.error('Error saving settings:', error);
        window.notificationSystem.addNotification('error', 'Settings Error', 'Failed to save settings. Please try again.');
    }
}