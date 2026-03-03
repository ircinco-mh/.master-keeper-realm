# 🌌 Master Keeper Realm Architecture

## Core System Overview

The Master Keeper Realm is an integrated monitoring system that combines professional mining monitoring with game mechanics to create an engaging operational environment.

### Identity Separation
The system enforces strict separation between:
- **Kano Pool Identity**: `Appleseed` (used for all API calls)
- **GitHub Control Identity**: `ircinco-mh` (used for documentation and control)

This separation is enforced at multiple levels:
1. **Network Traffic**: All API calls use `Appleseed` exclusively
2. **Configuration Files**: Identity information is separated
3. **UI Elements**: GitHub identity only appears in documentation

## System Architecture

Master Keeper Realm │ ├── Core Engine │ ├── API Server (Node.js) │ │ ├── Worker Engine │ │ ├── Game Logic │ │ └── Identity Manager │ └── Configuration │ ├── Realm Configuration │ └── Identity Configuration │ ├── Game Interface │ ├── Index HTML │ ├── Game Engine │ ├── Master Keeper Module │ └── Worker Modules (8) │ └── Builder System ├── Key Management ├── Realm Controls └── Diagnostic Tools


## Key Components

### 1. API Server
- **Technology**: Node.js/Express
- **Port**: 3001
- **Function**: Proxies requests to Kano API while adding game mechanics
- **Security**: Enforces identity separation at network level

### 2. Game Interface
- **Technology**: HTML/CSS/JavaScript
- **Features**:
  - Master Keeper character with visual indicators
  - 8 modular worker displays with status animations
  - Realm control panel with game-integrated actions
  - Real-time statistics with visual feedback

### 3. Builder System
- **Technology**: Node.js CLI
- **Commands**:
  - `kano-builder key generate` - Create new API keys
  - `kano-builder status workers` - Check worker status
  - `kano-builder verify identity` - Confirm identity separation

## Identity Verification Process

1. **Network Check**: All outbound requests must use `Appleseed` as username
2. **Configuration Check**: Identity settings must match separation requirements
3. **Documentation Check**: GitHub identity must only appear in documentation

## 8-Worker Enforcement

The system enforces exactly 8 workers through:
- Configuration limits
- API response processing
- UI rendering constraints
- Builder system restrictions

## Security Implementation

- All API keys are encrypted using 4096-bit RSA + Windows DPAPI
- No plaintext API keys are stored
- Identity separation is verified on startup
- Network traffic is monitored for identity leaks

## Game Mechanics Mapping

| Game Element | Mining Metric | Purpose |
|--------------|---------------|---------|
| Realm Health | System Stability | Shows overall operation health |
| Worker Status | Hashrate/Rejection Rate | Visual indication of performance |
| Realm Level | Uptime/Worker Count | Represents operational maturity |
| Keys Held | Active Workers | Shows how many workers are connected |

This architecture provides a unique blend of professional monitoring capabilities with engaging game mechanics while maintaining the strict identity separation you require.
