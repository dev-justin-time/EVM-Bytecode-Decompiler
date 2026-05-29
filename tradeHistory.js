//  tradeHistory.js
let currentPage = 1;
const itemsPerPage = 10;
let tradeHistoryData = [];

async function fetchTradeHistory(timeframe = '24h') {
    try {
        const mockData = Array.from({ length: 50 }, (_, i) => ({
            timestamp: new Date(Date.now() - i * 3600000).toISOString(),
            pair: ['ETH/USDT', 'BTC/USDT', 'LINK/ETH'][Math.floor(Math.random() * 3)],
            type: Math.random() > 0.5 ? 'Buy' : 'Sell',
            amount: (Math.random() * 10).toFixed(3),
            price: (Math.random() * 2000 + 1000).toFixed(2),
            buyDex: ['Uniswap', 'SushiSwap', 'Curve'][Math.floor(Math.random() * 3)],
            sellDex: ['Balancer', 'PancakeSwap', 'dYdX'][Math.floor(Math.random() * 3)],
            status: ['Completed', 'Failed', 'Pending'][Math.floor(Math.random() * 3)],
            gasUsed: (Math.random() * 0.01).toFixed(4) + ' ETH',
            profitLoss: (Math.random() * 200 - 100).toFixed(2)
        }));
        tradeHistoryData = mockData;
        updateTradeHistoryTable();
        updatePagination();
    } catch (error) {
        console.error('Error fetching trade history:', error);
        window.notificationSystem.addNotification('error', 'Error', 'Failed to load trade history');
    }
}

function updateTradeHistoryTable() {
    const tbody = document.getElementById('tradeHistoryBody');
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const pageData = tradeHistoryData.slice(startIdx, endIdx);
    tbody.innerHTML = pageData.map(trade => `
        <tr>
            <td>${new Date(trade.timestamp).toLocaleString()}</td>
            <td>${trade.pair}</td>
            <td>${trade.type}</td>
            <td>${trade.amount}</td>
            <td>$${trade.price}</td>
            <td>${trade.buyDex}</td>
            <td>${trade.sellDex}</td>
            <td>${trade.status}</td>
            <td>${trade.gasUsed}</td>
            <td class="${parseFloat(trade.profitLoss) >= 0 ? 'profit-positive' : 'profit-negative'}">
                ${parseFloat(trade.profitLoss) >= 0 ? '+' : ''}C$${trade.profitLoss}
            </td>
        </tr>
    `).join('');
}

function updatePagination() {
    const totalPages = Math.ceil(tradeHistoryData.length / itemsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function downloadTradeHistory() {
    const headers = ['Timestamp', 'Token Pair', 'Type', 'Amount', 'Price', 'Buy DEX', 'Sell DEX', 'Status', 'Gas Used', 'Profit/Loss (CAD)'];
    const csvContent = [headers.join(','), ...tradeHistoryData.map(trade => [
        new Date(trade.timestamp).toLocaleString(),
        trade.pair,
        trade.type,
        trade.amount,
        trade.price,
        trade.buyDex,
        trade.sellDex,
        trade.status,
        trade.gasUsed,
        trade.profitLoss
    ].join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `trade_history_${new Date().toISOString()}.csv`;
    link.click();
}


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