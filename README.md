# EVM Bytecode Decompiler & Trading Bot

A comprehensive web-based platform combining EVM bytecode decompilation tools with an AI-powered cryptocurrency trading bot. This unified application provides smart contract analysis capabilities alongside automated trading features.

## Features

### EVM Bytecode Decompiler
- **Bytecode Decompilation**: Converts hex EVM bytecode into readable opcode instructions with definitions
- **Interactive Workflow Visualization**: Mermaid flowchart showing contract execution flow with stage-by-stage highlighting
- **Security Analysis**: Built-in pentest simulations for common vulnerabilities:
  - Reentrancy attacks
  - Integer overflow/underflow
  - Front-running susceptibility
  - Access control issues
  - Transaction ordering dependencies (MEV)
- **Wallet Integration**: Connect Ethereum wallets via MetaMask/Web3 providers
- **Contract Analysis**: Identifies contract type, features, and security properties
- **External Tool Integration**: Send bytecode to external converters (EVM to RISC-V, etc.)

### TokenMonster Trading Bot
- **AI-Powered Trading**: Automated trading with AI predictions and market analysis
- **Bot Controls**: Start, pause, and stop trading operations with real-time status monitoring
- **Live Trading Charts**: Real-time visualization of portfolio performance and market data
- **AI Market Predictions**: Machine learning-based opportunity identification and risk assessment
- **Trade History**: Complete tracking of all trading activities with detailed metrics
- **AI Configuration**: Customizable settings for risk tolerance, profit thresholds, and trading strategies
- **Notification System**: Real-time alerts for trading events and system updates
- **Multi-DEX Support**: Arbitrage opportunities across multiple decentralized exchanges

## Project Structure

```
.
├── index.html              # Main application interface (combined Decompiler + Trading Bot)
├── mermaid.js              # Mermaid initialization and stage control logic
├── mermaid.css             # Styling for Mermaid diagrams and UI components
├── pentest.js              # Security simulation functions
├── main.js                 # Main trading bot logic and dashboard updates
├── botControls.js          # Bot control functions (start, pause, stop, AI auto)
├── chartUtils.js           # Chart.js initialization and trading chart utilities
├── simulation.js           # Trading simulation and backtesting logic
├── tradeHistory.js         # Trade history management and pagination
├── settings.js             # AI configuration and settings management
├── notificationSystem.js   # Notification system for alerts and updates
├── .vscode/                # VS Code settings
└── README.md               # This file
```

## How to Use

### Navigation
The application features a tab-based interface to switch between the two main tools:
- **Bytecode Decompiler**: For smart contract analysis and security testing
- **Trading Bot**: For automated cryptocurrency trading

### EVM Bytecode Decompiler

1. **Decompile Bytecode**:
   - Paste EVM bytecode (hex format, with or without `0x` prefix) into the "Input Bytecode" textarea
   - Click the "Decompile" button to see the decompiled output
   - View analysis in the "Bytecode Analysis" and "Contract Information" panels

2. **Visualize Contract Flow**:
   - The Mermaid flowchart shows the typical contract execution flow
   - Use the stage buttons (►) to highlight different execution phases:
     1. Call Received
     2. Read / Validate
     3. State Change
     4. External Call
     5. Return / Emit

3. **Run Security Tests**:
   - Use the pentest suite buttons to analyze bytecode for vulnerabilities:
     - Simulate Reentrancy
     - Simulate Integer Overflow
     - Simulate Front-running
     - Simulate Access Control Bypass
     - Simulate Tx-Ordering (Nonce/MEV)

4. **Connect Wallet** (Optional):
   - Click "Connect Wallet" to link your Ethereum wallet (requires MetaMask)
   - Enter a contract address and click "Get Bytecode" to fetch from blockchain

### TokenMonster Trading Bot

1. **Bot Controls**:
   - Click "Start Bot" to begin automated trading
   - Use "Pause Bot" to temporarily halt operations
   - Click "Stop Bot" to completely stop trading
   - Toggle "AI Auto" for AI-driven trading decisions

2. **Monitor Performance**:
   - View live trading charts showing portfolio value and market data
   - Check bot status details: active time, today's trades, profit/loss
   - Review AI market predictions and confidence scores

3. **Configure AI Settings**:
   - Adjust risk tolerance (Conservative, Balanced, Aggressive)
   - Set minimum profit threshold for trades
   - Enable/disable features: auto trading, automatic token pairing, market trend analysis
   - Configure trade path optimization, slippage prediction, and volatility protection

4. **View Trade History**:
   - Access complete trading history with timestamps
   - Filter by timeframe and navigate through pages
   - Review individual trade details including DEX, gas used, and profit

## Technical Details

- **Dependencies**: 
  - Web3.js (CDN) for Ethereum blockchain interaction
  - Chart.js (CDN) for trading charts and data visualization
  - Mermaid.js (ES module) for flowchart visualization
  - No build process or Node.js dependencies - pure client-side web app

- **Browser Support**: 
  - Modern browsers with ES6 module support
  - Tested in Chrome, Firefox, Safari, and Edge

- **Security Note**: 
  - All bytecode processing happens client-side
  - Trading bot operates in simulation mode by default
  - Infura URL requires your own project ID for blockchain lookups

## Recent Updates

- **Combined Application**: Merged Trading Bot with Bytecode Decompiler in single interface
- **Tab Navigation**: Added seamless switching between Decompiler and Trading Bot
- **Scoped Styling**: Prevented CSS conflicts between the two applications
- **Enhanced Trading Features**: Added AI configuration, notification system, and comprehensive trade history

## Customization

- Modify `mermaid.css` to change flowchart and UI appearance
- Update opcode definitions in `index.html` (follows Ethereum Yellow Paper standards)
- Adjust Mermaid flowchart in `index.html` for different contract patterns
- Customize trading bot parameters in `settings.js`
- Modify chart configurations in `chartUtils.js`

## Development

This is a static web application - no special setup required. Simply edit files and refresh browser to see changes.

For VS Code users, the `.vscode` directory contains recommended settings.

## License

MIT License - feel free to use, modify, and distribute this tool as needed.

## Acknowledgments

- Based on Ethereum Yellow Paper opcode definitions
- Uses Mermaid.js for diagram rendering
- Web3.js for Ethereum blockchain interaction
- Chart.js for trading data visualization