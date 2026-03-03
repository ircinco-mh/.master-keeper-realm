master-keeper-realm/
├── core/ (Master Keeper Engine)
│   ├── keeper-core.exe
│   ├── api-server/
│   │   ├── server.js          # Game-integrated API proxy
│   │   ├── worker-engine.js   # Worker status translator
│   │   └── game-logic.js      # Core game mechanics
│   └── config/
│       ├── realm-config.json  # Master realm settings
│       └── identity.json      # Enforced identity separation
│
├── game/ (Immersive Interface)
│   ├── index.html             # Main game interface
│   ├── game.js                # Core game engine
│   ├── master-keeper.js       # Keeper character controller
│   ├── workers/
│   │   ├── worker-core.js     # Base worker module
│   │   ├── miner-1.js         # Worker 1 game module
│   │   ├── miner-2.js         # Worker 2 game module
│   │   └── ... (up to miner-8)
│   ├── assets/
│   │   ├── images/
│   │   │   ├── background.jpg
│   │   │   ├── keeper.png
│   │   │   ├── worker-idle.png
│   │   │   └── worker-mining.png
│   │   └── sounds/
│   │       ├── mining.wav
│   │       └── alert.wav
│   └── styles/
│       └── game-theme.css     # Game visual styling
│
├── builder/ (Key Management)
│   ├── kano-builder.exe
│   ├── key-realm.js           # Game-integrated key management
│   └── api-vault-8.enc
│
└── docs/
    ├── REALM-ARCHITECTURE.md  # Complete system documentation
    ├── MASTER-KEEPER-LEGEND.md # Game narrative
    └── 8-WORKER-OPERATIONS.md
