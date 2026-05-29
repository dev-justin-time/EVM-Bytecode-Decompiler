
//  chartUtils.js
function generateInitialData() {
    const data = {
        labels: [],
        values: [],
        volume: [],
        volatility: [],
        rsi: [],
        macd: [],
        signal: [],
        support: [],
        resistance: []
    };
    const now = Date.now();
    const baseValue = 10000;
    const baseVolume = 50000;
    const baseVolatility = 2;
    const baseRSI = 50;
    const baseMacd = 0;
    const baseSignal = 0;
    const baseSupport = 9500;
    const baseResistance = 10500;
    for (let i = 60; i >= 0; i--) {
        const time = new Date(now - i * 60000);
        const randomChange = (Math.random() - 0.48) * 100;
        const value = baseValue + randomChange;
        const volumeChange = (Math.random() - 0.5) * 10000;
        const volatilityChange = (Math.random() - 0.5) * 0.5;
        const rsiChange = (Math.random() - 0.5) * 10;
        const macdChange = (Math.random() - 0.5) * 2;
        const signalChange = (Math.random() - 0.5) * 1.5;
        data.labels.push(time);
        data.values.push(value);
        data.volume.push(baseVolume + volumeChange);
        data.volatility.push(baseVolatility + volatilityChange);
        data.rsi.push(baseRSI + rsiChange);
        data.macd.push(baseMacd + macdChange);
        data.signal.push(baseSignal + signalChange);
        data.support.push(baseSupport);
        data.resistance.push(baseResistance);
    }
    return data;
}

function startChartUpdates(chart) {
    if (!chart) return;
    let lastValue = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1];
    let lastVolume = chart.data.datasets[1].data[chart.data.datasets[1].data.length - 1];
    let lastVolatility = chart.data.datasets[2].data[chart.data.datasets[2].data.length - 1];
    let lastRSI = chart.data.datasets[3].data[chart.data.datasets[3].data.length - 1];
    let lastMACD = chart.data.datasets[4].data[chart.data.datasets[4].data.length - 1];
    let lastSignal = chart.data.datasets[5].data[chart.data.datasets[5].data.length - 1];
    let support = chart.data.datasets[6].data[chart.data.datasets[6].data.length - 1];
    let resistance = chart.data.datasets[7].data[chart.data.datasets[7].data.length - 1];
    setInterval(() => {
        chart.data.labels.shift();
        chart.data.datasets.forEach(dataset => dataset.data.shift());
        const now = new Date();
        const randomChange = (Math.random() - 0.48) * 20;
        const volumeChange = (Math.random() - 0.5) * 10000;
        const volatilityChange = (Math.random() - 0.5) * 0.5;
        const rsiChange = (Math.random() - 0.5) * 5;
        const macdChange = (Math.random() - 0.5) * 1;
        const signalChange = (Math.random() - 0.5) * 0.8;
        lastValue = lastValue + randomChange;
        lastVolume = 50000 + volumeChange;
        lastVolatility = 2 + volatilityChange;
        lastRSI = Math.max(0, Math.min(100, lastRSI + rsiChange));
        lastMACD = lastMACD + macdChange;
        lastSignal = lastSignal + signalChange;
        if (lastValue < support) {
            support = lastValue - 200;
        } else if (lastValue > resistance) {
            resistance = lastValue + 200;
        }
        chart.data.labels.push(now);
        chart.data.datasets[0].data.push(lastValue);
        chart.data.datasets[1].data.push(lastVolume);
        chart.data.datasets[2].data.push(lastVolatility);
        chart.data.datasets[3].data.push(lastRSI);
        chart.data.datasets[4].data.push(lastMACD);
        chart.data.datasets[5].data.push(lastSignal);
        chart.data.datasets[6].data.push(support);
        chart.data.datasets[7].data.push(resistance);
        chart.update('quiet');
        if (lastRSI > 70 || lastRSI < 30) {
            const message = `RSI ${lastRSI > 70 ? 'overbought' : 'oversold'} at ${lastRSI.toFixed(2)}`;
            window.notificationSystem.addNotification('warning', 'RSI Alert', message);
        }
        if (Math.abs(lastMACD - lastSignal) < 0.1 && lastMACD !== lastSignal) {
            const crossType = lastMACD > lastSignal ? 'bullish' : 'bearish';
            window.notificationSystem.addNotification('info', 'MACD Cross', `MACD showing ${crossType} cross`);
        }
        if (Math.abs(randomChange) > 15) {
            const changeType = randomChange > 0 ? 'success' : 'error';
            const message = `Portfolio value ${randomChange > 0 ? 'increased' : 'decreased'} by C$${Math.abs(randomChange).toFixed(2)}`;
            window.notificationSystem.addNotification(changeType, 'Portfolio Update', message);
        }
    }, 5000);
}

function initTradingChart() {
    const ctx = document.getElementById('tradingChart').getContext('2d');
    if (!ctx) return null;
    const initialData = generateInitialData();
    const tradingChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: initialData.labels,
            datasets: [
                {
                    label: 'Portfolio Value (CAD)',
                    data: initialData.values,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Trading Volume (CAD)',
                    data: initialData.volume,
                    borderColor: 'rgb(255, 159, 64)',
                    backgroundColor: 'rgba(255, 159, 64, 0.1)',
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y1'
                },
                {
                    label: 'Volatility Index',
                    data: initialData.volatility,
                    borderColor: 'rgb(153, 102, 255)',
                    backgroundColor: 'rgba(153, 102, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'y2'
                },
                {
                    label: 'RSI',
                    data: initialData.rsi,
                    borderColor: 'rgb(255, 99, 132)',
                    borderDash: [5, 5],
                    tension: 0.4,
                    yAxisID: 'y3'
                },
                {
                    label: 'MACD',
                    data: initialData.macd,
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.4,
                    yAxisID: 'y4'
                },
                {
                    label: 'Signal Line',
                    data: initialData.signal,
                    borderColor: 'rgb(255, 206, 86)',
                    tension: 0.4,
                    yAxisID: 'y4'
                },
                {
                    label: 'Support',
                    data: initialData.support,
                    borderColor: 'rgb(75, 192, 75)',
                    borderDash: [10, 5],
                    tension: 0,
                    yAxisID: 'y'
                },
                {
                    label: 'Resistance',
                    data: initialData.resistance,
                    borderColor: 'rgb(255, 99, 132)',
                    borderDash: [10, 5],
                    tension: 0,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb',
                        callback: function (value) {
                            return 'C$' + value.toLocaleString();
                        }
                    },
                    title: {
                        display: true,
                        text: 'Portfolio Value',
                        color: '#e5e7eb'
                    }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#e5e7eb',
                        callback: function (value) {
                            return 'C$' + value.toLocaleString();
                        }
                    },
                    title: {
                        display: true,
                        text: 'Trading Volume',
                        color: '#e5e7eb'
                    }
                },
                y2: {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#e5e7eb'
                    },
                    title: {
                        display: true,
                        text: 'Volatility Index',
                        color: '#e5e7eb'
                    }
                },
                y3: {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: false,
                    min: 0,
                    max: 100,
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#e5e7eb'
                    },
                    title: {
                        display: true,
                        text: 'RSI',
                        color: '#e5e7eb'
                    }
                },
                y4: {
                    type: 'linear',
                    position: 'right',
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#e5e7eb'
                    },
                    title: {
                        display: true,
                        text: 'MACD',
                        color: '#e5e7eb'
                    }
                },
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'HH:mm'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb',
                        maxRotation: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#e5e7eb',
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.datasetIndex === 0 || context.datasetIndex === 1 || context.datasetIndex === 7 || context.datasetIndex === 8) {
                                label += 'C$' + context.parsed.y.toLocaleString();
                            } else if (context.datasetIndex === 2) {
                                label += context.parsed.y.toFixed(2);
                            } else if (context.datasetIndex === 3) {
                                label += context.parsed.y.toFixed(2);
                            } else {
                                label += context.parsed.y.toFixed(2);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
    startChartUpdates(tradingChart);
    return tradingChart;
}

function initPredictedOpportunitiesChart() {
    const ctx = document.getElementById('predictedOpportunitiesChart')?.getContext('2d');
    if (!ctx) return;
    return new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Predicted Opportunities',
                    data: Array.from({ length: 20 }, () => ({
                        x: new Date(Date.now() - Math.random() * 3600000 * 4),
                        y: Math.random() * 5
                    })),
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgb(75, 192, 192)'
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
                        color: '#e5e7eb'
                    }
                },
                x: {
                    adapters: {
                        date: {
                            locale: 'en'
                        }
                    },
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: 'HH:mm'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb',
                        autoSkip: true,
                        maxTicksLimit: 4
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