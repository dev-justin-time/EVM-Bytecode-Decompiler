  document.addEventListener('DOMContentLoaded', async () => {
    // Initialize the notification system
   // In startChartUpdates or other functions
const notificationSystem = new NotificationSystem();
notificationSystem.addNotification('warning', 'RSI Alert', message);
    // Initialize trading chart
    initTradingChart();

    // Initialize page navigation
    initializePageNavigation();

    // Initialize predicted opportunities chart
    initPredictedOpportunitiesChart();

    // Update recommendations and arb table at intervals
    setInterval(updateRecommendations, 30000);
    setInterval(updateArbTable, 15000);

    // Fetch and display trade history
    fetchTradeHistory();

    // Update dashboard trade history
    updateDashboardTradeHistory();
    setInterval(updateDashboardTradeHistory, 30000);

    // Add event listeners for trade history pagination
    document.getElementById('historyTimeframe').addEventListener('change', e => {
        fetchTradeHistory(e.target.value);
    });

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateTradeHistoryTable();
            updatePagination();
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        const totalPages = Math.ceil(tradeHistoryData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateTradeHistoryTable();
            updatePagination();
        }
    });

    // Add event listener for notification dropdown
    document.querySelector('.notification-icon').addEventListener('click', e => {
        e.stopPropagation();
        document.getElementById('notificationsDropdown').classList.toggle('show');
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.notification-icon')) {
            document.getElementById('notificationsDropdown').classList.remove('show');
        }
    });

    // Add event listener for saving flashloan configuration
    const saveFlashloanConfigBtn = document.getElementById('saveFlashloanConfig');
    if (saveFlashloanConfigBtn) {
        saveFlashloanConfigBtn.addEventListener('click', saveFlashloanConfig);
    }

    // Add event listener for toggling AI Auto
    const aiAutoBtn = document.getElementById('aiAuto');
    if (aiAutoBtn) {
        aiAutoBtn.addEventListener('click', toggleAIAuto);
    }
});

// Dashboard logic
function updateDashboardTradeHistory() {
    const tradeHistory = [
        {
            time: new Date(Date.now() - 1000 * 60 * 5),
            pair: "ETH/USDT",
            type: "Buy",
            amount: "1.5 ETH",
            price: "$1,850.25",
            buyDex: "Uniswap",
            sellDex: "SushiSwap",
            status: "Completed",
            gasUsed: "0.005 ETH",
            profitAfterFees: "+$245.50"
        },
        {
            time: new Date(Date.now() - 1000 * 60 * 15),
            pair: "BTC/USDT",
            type: "Sell",
            amount: "0.25 BTC",
            price: "$27,350.00",
            buyDex: "Curve",
            sellDex: "Balancer",
            status: "Completed",
            gasUsed: "0.008 ETH",
            profitAfterFees: "+$785.25"
        },
        {
            time: new Date(Date.now() - 1000 * 60 * 45),
            pair: "LINK/ETH",
            type: "Buy",
            amount: "100 LINK",
            price: "0.075 ETH",
            buyDex: "Uniswap",
            sellDex: "PancakeSwap",
            status: "Completed",
            gasUsed: "0.003 ETH",
            profitAfterFees: "+$125.75"
        }
    ];
    const tbody = document.getElementById('dashboardTradeHistory');
    tbody.innerHTML = '';
    tradeHistory.forEach(trade => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trade.time.toLocaleTimeString()}</td>
            <td>${trade.pair}</td>
            <td>${trade.type}</td>
            <td>${trade.amount}</td>
            <td>${trade.price}</td>
            <td>${trade.buyDex}</td>
            <td>${trade.sellDex}</td>
            <td>${trade.status}</td>
            <td>${trade.gasUsed}</td>
            <td class="profit-positive">${trade.profitAfterFees}</td>
        `;
        tbody.appendChild(row);
    });
}

// Recommendations and Arb Table
function updateRecommendations() {
    const recommendationsBody = document.getElementById('recommendationsBody');
    const recommendations = [
        {
            pair: "ETH/USDT",
            confidence: 85,
            expectedReturn: 2.5,
            risk: "low"
        },
        {
            pair: "BTC/USDT",
            confidence: 75,
            expectedReturn: 3.2,
            risk: "medium"
        },
        {
            pair: "LINK/ETH",
            confidence: 65,
            expectedReturn: 4.1,
            risk: "high"
        }
    ];
    recommendationsBody.innerHTML = recommendations.map(rec => `
        <tr>
            <td>${rec.pair}</td>
            <td>${rec.confidence}%</td>
            <td class="profit-positive">+${rec.expectedReturn}%</td>
            <td class="risk-${rec.risk}">${rec.risk.charAt(0).toUpperCase() + rec.risk.slice(1)}</td>
        </tr>
    `).join('');
}

function updateArbTable() {
    const arbTableBody = document.getElementById('arbTableBody');
    const opportunities = [
        {
            pair: "ETH/USDT",
            dexs: "Uniswap ➔ SushiSwap",
            profitability: 1.8,
            gasFees: "0.012 ETH",
            risk: "low"
        },
        {
            pair: "BTC/USDT",
            dexs: "PancakeSwap ➔ Curve",
            profitability: 2.3,
            gasFees: "0.015 ETH",
            risk: "medium"
        },
        {
            pair: "LINK/ETH",
            dexs: "Uniswap ➔ Balancer",
            profitability: 3.1,
            gasFees: "0.008 ETH",
            risk: "high"
        }
    ];
    arbTableBody.innerHTML = opportunities.map(opp => `
        <tr>
            <td>${opp.pair}</td>
            <td>${opp.dexs}</td>
            <td class="profit-positive">+${opp.profitability}%</td>
            <td>${opp.gasFees}</td>
            <td class="risk-${opp.risk}">${opp.risk.charAt(0).toUpperCase() + opp.risk.slice(1)}</td>
        </tr>
    `).join('');
}

// Page navigation logic
function initializePageNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            item.classList.add('active');
            const pageId = item.dataset.page;
            document.querySelector(`#${pageId}`).classList.add('active');
        });
    });
}

// General logic
function filterTable(value) {
    // Implement filtering logic based on value
    console.log(`Filtering by: ${value}`);
    // This function should implement the actual filtering logic
}

function logout() {
    window.location.href = "https://example.com/logout";
}

// Simulation logic
function updateSimulationChart(history) {
    const ctx = document.getElementById('simProfitChart').getContext('2d');
    const data = history.reverse().reduce((acc, trade) => {
        acc.labels.push(trade.timestamp);
        acc.data.push(parseFloat(trade.profit));
        return acc;
    }, { labels: [], data: [] });

    if (window.simChart) {
        window.simChart.destroy();
    }

    window.simChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Cumulative P/L',
                    data: data.data.reduce((acc, val, i) => {
                        acc.push((acc[i - 1] || 0) + val);
                        return acc;
                    }, []),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb',
                        callback: value => `C$${value.toFixed(2)}`
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb',
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e5e7eb'
                    }
                }
            }
        }
    });
}
function fetchTradeHistory(timeframe) {
    const url = `https://example.com/api/trade-history?timeframe=${timeframe}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            tradeHistoryData = data;
            updateTradeHistoryTable();
            updatePagination();
        })
        .catch(error => console.error('Error fetching trade history:', error));
}

function updateTradeHistoryTable() {
    const tbody = document.getElementById('tradeHistoryTableBody');
    tbody.innerHTML = '';
    tradeHistoryData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).forEach(trade => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trade.time.toLocaleTimeString()}</td>
            <td>${trade.pair}</td>
            <td>${trade.type}</td>
            <td>${trade.amount}</td>
            <td>${trade.price}</td>
            <td>${trade.buyDex}</td>
            <td>${trade.sellDex}</td>
            <td>${trade.status}</td>
            <td>${trade.gasUsed}</td>
            <td class="profit-positive">${trade.profitAfterFees}</td>
            </tr>
            `;
            tbody.appendChild(row);
        });
    }
    function updatePagination() {
        const totalPages = Math.ceil(tradeHistoryData.length / itemsPerPage);
        document.getElementById('totalPages').textContent = totalPages;
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === totalPages;
    }
    function toggleAIAuto() {
        const aiAutoBtn = document.getElementById('aiAuto');
        if (aiAutoBtn.textContent === 'AI Auto Off') {
            aiAutoBtn.textContent = 'AI Auto On';
            // Implement AI Auto logic
        } else {
            aiAutoBtn.textContent = 'AI Auto Off';
            // Implement AI Auto logic
        }
    }
    function saveFlashloanConfig() {
        const flashloanConfig = {
            // Implement flashloan configuration logic
        };
        // Implement saving flashloan configuration logic
    }
    function initTradingChart() {
        const ctx = document.getElementById('tradingChart').getContext('2d');
        const data = {
            labels: ['ETH/USDT', 'BTC/USDT', 'LINK/ETH'],
            datasets: [
                {
                    label: 'Predicted Returns',
                    data: [2.5, 3.2, 4.1],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.1)'
                }
            ]
        };
        document.addEventListener('DOMContentLoaded', async () => {
    // Import scripts
    import('./notificationSystem.js');
    import('./chartUtils.js');
    import('./botControls.js');
    import('./tradeHistory.js');
    import('./settings.js');
    import('./backtesting.js');
    import('./simulation.js');

    // Initialize the notification system
   
const notificationSystem = new NotificationSystem();
notificationSystem.addNotification('warning', 'RSI Alert', message);;

    // Initialize trading chart
    initTradingChart();

    // Initialize page navigation
    initializePageNavigation();

    // Initialize predicted opportunities chart
    initPredictedOpportunitiesChart();

    // Update recommendations and arb table at intervals
    setInterval(updateRecommendations, 30000);
    setInterval(updateArbTable, 15000);

    // Fetch and display trade history
    fetchTradeHistory();

    // Update dashboard trade history
    updateDashboardTradeHistory();
    setInterval(updateDashboardTradeHistory, 30000);

    // Add event listeners for trade history pagination
    document.getElementById('historyTimeframe').addEventListener('change', e => {
        fetchTradeHistory(e.target.value);
    });

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateTradeHistoryTable();
            updatePagination();
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        const totalPages = Math.ceil(tradeHistoryData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateTradeHistoryTable();
            updatePagination();
        }
    });

    // Add event listener for notification dropdown
    document.querySelector('.notification-icon').addEventListener('click', e => {
        e.stopPropagation();
        document.getElementById('notificationsDropdown').classList.toggle('show');
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.notification-icon')) {
            document.getElementById('notificationsDropdown').classList.remove('show');
        }
    });

    // Add event listener for saving flashloan configuration
    const saveFlashloanConfigBtn = document.getElementById('saveFlashloanConfig');
    if (saveFlashloanConfigBtn) {
        saveFlashloanConfigBtn.addEventListener('click', saveFlashloanConfig);
    }

    // Add event listener for toggling AI Auto
    const aiAutoBtn = document.getElementById('aiAuto');
    if (aiAutoBtn) {
        aiAutoBtn.addEventListener('click', toggleAIAuto);
    }
});

// Dashboard logic
function updateDashboardTradeHistory() {
    const tradeHistory = [
        {
            time: new Date(Date.now() - 1000 * 60 * 5),
            pair: "ETH/USDT",
            type: "Buy",
            amount: "1.5 ETH",
            price: "$1,850.25",
            buyDex: "Uniswap",
            sellDex: "SushiSwap",
            status: "Completed",
            gasUsed: "0.005 ETH",
            profitAfterFees: "+$245.50"
        },
        {
            time: new Date(Date.now() - 1000 * 60 * 15),
            pair: "BTC/USDT",
            type: "Sell",
            amount: "0.25 BTC",
            price: "$27,350.00",
            buyDex: "Curve",
            sellDex: "Balancer",
            status: "Completed",
            gasUsed: "0.008 ETH",
            profitAfterFees: "+$785.25"
        },
        {
            time: new Date(Date.now() - 1000 * 60 * 45),
            pair: "LINK/ETH",
            type: "Buy",
            amount: "100 LINK",
            price: "0.075 ETH",
            buyDex: "Uniswap",
            sellDex: "PancakeSwap",
            status: "Completed",
            gasUsed: "0.003 ETH",
            profitAfterFees: "+$125.75"
        }
    ];
    const tbody = document.getElementById('dashboardTradeHistory');
    tbody.innerHTML = '';
    tradeHistory.forEach(trade => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trade.time.toLocaleTimeString()}</td>
            <td>${trade.pair}</td>
            <td>${trade.type}</td>
            <td>${trade.amount}</td>
            <td>${trade.price}</td>
            <td>${trade.buyDex}</td>
            <td>${trade.sellDex}</td>
            <td>${trade.status}</td>
            <td>${trade.gasUsed}</td>
            <td class="profit-positive">${trade.profitAfterFees}</td>
        `;
        tbody.appendChild(row);
    });
}

// Recommendations and Arb Table
function updateRecommendations() {
    const recommendationsBody = document.getElementById('recommendationsBody');
    const recommendations = [
        {
            pair: "ETH/USDT",
            confidence: 85,
            expectedReturn: 2.5,
            risk: "low"
        },
        {
            pair: "BTC/USDT",
            confidence: 75,
            expectedReturn: 3.2,
            risk: "medium"
        },
        {
            pair: "LINK/ETH",
            confidence: 65,
            expectedReturn: 4.1,
            risk: "high"
        }
    ];
    recommendationsBody.innerHTML = recommendations.map(rec => `
        <tr>
            <td>${rec.pair}</td>
            <td>${rec.confidence}%</td>
            <td class="profit-positive">+${rec.expectedReturn}%</td>
            <td class="risk-${rec.risk}">${rec.risk.charAt(0).toUpperCase() + rec.risk.slice(1)}</td>
        </tr>
    `).join('');
}

function updateArbTable() {
    const arbTableBody = document.getElementById('arbTableBody');
    const opportunities = [
        {
            pair: "ETH/USDT",
            dexs: "Uniswap ➔ SushiSwap",
            profitability: 1.8,
            gasFees: "0.012 ETH",
            risk: "low"
        },
        {
            pair: "BTC/USDT",
            dexs: "PancakeSwap ➔ Curve",
            profitability: 2.3,
            gasFees: "0.015 ETH",
            risk: "medium"
        },
        {
            pair: "LINK/ETH",
            dexs: "Uniswap ➔ Balancer",
            profitability: 3.1,
            gasFees: "0.008 ETH",
            risk: "high"
        }
    ];
    arbTableBody.innerHTML = opportunities.map(opp => `
        <tr>
            <td>${opp.pair}</td>
            <td>${opp.dexs}</td>
            <td class="profit-positive">+${opp.profitability}%</td>
            <td>${opp.gasFees}</td>
            <td class="risk-${opp.risk}">${opp.risk.charAt(0).toUpperCase() + opp.risk.slice(1)}</td>
        </tr>
    `).join('');
}

// Page navigation logic
function initializePageNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            item.classList.add('active');
            const pageId = item.dataset.page;
            document.querySelector(`#${pageId}`).classList.add('active');
        });
    });
}

// General logic
function filterTable(value) {
    // Implement filtering logic based on value
    console.log(`Filtering by: ${value}`);
    // This function should implement the actual filtering logic
}

function logout() {
    window.location.href = "https://example.com/logout";
}


        if (window.tradingChart) {
            window.tradingChart.destroy();
        }
        window.tradingChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 0.1)'
                        },
                        ticks: {
                            color: '#e5e7eb',
                            callback: value => `${value}%`
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 0.1)'
                        },
                        ticks: {
                            color: '#e5e7eb'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#e5e7eb'
                        }
                    }
                }
            }
        });
    }









