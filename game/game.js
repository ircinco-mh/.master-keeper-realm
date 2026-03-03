// Master Keeper Realm Game Engine
class RealmGame {
  constructor() {
    this.gameState = {
      workers: [],
      totalHashrate: 0,
      activeCount: 0,
      systemHealth: 100,
      apiActive: false,
      realmLevel: 1,
      keysHeld: 0,
      alerts: []
    };
    
    this.config = {
      username: "Appleseed",
      apiKey: "738a48d70ba3ddc859e628b6bee5eba7",
      maxWorkers: 8,
      poolUrl: "https://kano.is/index.php",
      workerPattern: "Appleseed.worker{ID}",
      gameVersion: "4.0",
      apiEndpoint: "http://localhost:3001/api"
    };
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.loadConfig();
    this.startGameLoop();
    this.updateTimeDisplay();
    this.loadInitialData();
  }
  
  setupEventListeners() {
    document.getElementById('refresh-realm').addEventListener('click', () => this.refreshRealm());
    document.getElementById('toggle-key').addEventListener('click', () => this.toggleApiKey());
    document.getElementById('generate-keys').addEventListener('click', () => this.generateRealmKeys());
    document.getElementById('activate-realm').addEventListener('click', () => this.activateFullRealm());
    document.getElementById('diagnostic-scan').addEventListener('click', () => this.runDiagnostic());
    document.getElementById('emergency-protocol').addEventListener('click', () => this.emergencyProtocol());
  }
  
  loadConfig() {
    // In a real implementation, this would load from realm-config.json
    console.log("Game configuration loaded");
  }
  
  startGameLoop() {
    setInterval(() => {
      this.updateRealmStats();
      this.updateSystemHealth();
      this.checkAlerts();
    }, 5000);
    
    // Auto-refresh every 30 seconds
    setInterval(() => this.refreshRealm(), 30000);
  }
  
  updateTimeDisplay() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    document.getElementById('current-time').textContent = 
      `${displayHours}:${minutes} ${ampm}`;
      
    setTimeout(() => this.updateTimeDisplay(), 1000);
  }
  
  async loadInitialData() {
    showLoading();
    
    try {
      const response = await fetch(`${this.config.apiEndpoint}/workers`);
      const data = await response.json();
      
      this.gameState.workers = data.workers;
      this.gameState.totalHashrate = data.totalHashrate;
      this.gameState.activeCount = data.workers.filter(w => w.status === 'online').length;
      this.gameState.systemHealth = data.realmHealth;
      this.gameState.realmLevel = Math.floor(1 + (this.gameState.activeCount / 2));
      this.gameState.keysHeld = this.gameState.activeCount;
      
      this.renderWorkers();
      this.updateRealmStats();
      this.updateSystemHealth();
      
      hideLoading();
    } catch (error) {
      console.error("Failed to load initial data:", error);
      addAlert("Failed to connect to realm API - using cached data", "error");
      this.loadCachedData();
      hideLoading();
    }
  }
  
  async refreshRealm() {
    showLoading();
    
    try {
      const response = await fetch(`${this.config.apiEndpoint}/workers`);
      const data = await response.json();
      
      this.gameState.workers = data.workers;
      this.gameState.totalHashrate = data.totalHashrate;
      this.gameState.activeCount = data.workers.filter(w => w.status === 'online').length;
      this.gameState.systemHealth = data.realmHealth;
      
      this.renderWorkers();
      this.updateRealmStats();
      this.updateSystemHealth();
      
      addAlert("Realm refreshed successfully", "success");
    } catch (error) {
      console.error("Refresh failed:", error);
      addAlert("Failed to refresh realm - using cached data", "error");
    }
    
    hideLoading();
  }
  
  loadCachedData() {
    const cached = localStorage.getItem('realm-cache');
    if (cached) {
      const data = JSON.parse(cached);
      this.gameState.workers = data.workers;
      this.gameState.totalHashrate = data.totalHashrate;
      this.gameState.activeCount = data.activeCount;
      this.gameState.systemHealth = data.systemHealth;
      
      this.renderWorkers();
      this.updateRealmStats();
      this.updateSystemHealth();
    }
  }
  
  renderWorkers() {
    const container = document.getElementById('workers-container');
    container.innerHTML = '';
    
    this.gameState.workers.forEach((worker, index) => {
      const statusClass = worker.status === 'online' ? 'status-online' : 
                         worker.status === 'unstable' ? 'status-unstable' : 'status-dead';
      
      const workerCard = document.createElement('div');
      workerCard.className = `worker-card ${statusClass}`;
      workerCard.innerHTML = `
        <div class="worker-header">
          <div class="worker-name">${worker.name}</div>
          <div class="worker-id">ID: ${index + 1} | L${worker.gameLevel}</div>
        </div>
        
        <div class="worker-visual">
          <div class="mining-visual"></div>
        </div>
        
        <div class="worker-stats">
          <div class="stat">
            <div class="stat-label">Hashrate</div>
            <div class="stat-value">${worker.hashrate.toFixed(2)} H/s</div>
          </div>
          <div class="stat">
            <div class="stat-label">Accepted</div>
            <div class="stat-value">${worker.accepted}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Rejected</div>
            <div class="stat-value">${worker.rejected}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Last Share</div>
            <div class="stat-value">${this.formatLastShare(worker.lastShare)}</div>
          </div>
        </div>
        
        <div class="worker-actions">
          <button class="action-btn" data-action="details" data-worker="${index}">Details</button>
          <button class="action-btn" data-action="repair" data-worker="${index}">Repair</button>
        </div>
      `;
      
      container.appendChild(workerCard);
    });
    
    // Add event listeners to repair buttons
    document.querySelectorAll('[data-action="repair"]').forEach(button => {
      button.addEventListener('click', () => {
        const workerIndex = button.getAttribute('data-worker');
        this.repairWorker(workerIndex);
      });
    });
  }
  
  formatLastShare(timestamp) {
    if (!timestamp) return 'Never';
    
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  }
  
  updateRealmStats() {
    document.getElementById('total-hash').textContent = 
      `${this.gameState.totalHashrate.toFixed(2)} MH/s`;
      
    document.getElementById('active-workers').textContent = 
      `${this.gameState.activeCount}/${this.config.maxWorkers}`;
      
    document.getElementById('keys-held').textContent = 
      `${this.gameState.keysHeld}/${this.config.maxWorkers}`;
      
    document.getElementById('realm-level').textContent = 
      `Level ${this.gameState.realmLevel}`;
  }
  
  updateSystemHealth() {
    const healthElement = document.getElementById('system-health');
    healthElement.textContent = `${this.gameState.systemHealth}%`;
    
    if (this.gameState.systemHealth > 75) {
      healthElement.style.color = 'var(--worker-green)';
    } else if (this.gameState.systemHealth > 50) {
      healthElement.style.color = 'var(--warning-yellow)';
    } else {
      healthElement.style.color = 'var(--error-red)';
    }
  }
  
  checkAlerts() {
    const alerts = [];
    
    if (this.gameState.systemHealth < 40) {
      alerts.push({ type: 'error', message: 'Realm stability critically low! Activate emergency protocol' });
    } else if (this.gameState.systemHealth < 70) {
      alerts.push({ type: 'warning', message: 'Realm stability decreasing - monitor worker status' });
    }
    
    if (this.gameState.keysHeld < this.config.maxWorkers) {
      alerts.push({ type: 'info', message: `Missing ${this.config.maxWorkers - this.gameState.keysHeld} realm keys` });
    }
    
    // Display new alerts
    alerts.forEach(alert => {
      if (!this.gameState.alerts.some(a => a.message === alert.message)) {
        this.gameState.alerts.push(alert);
        addAlert(alert.message, alert.type);
      }
    });
    
    // Keep only the latest 5 alerts
    this.gameState.alerts = this.gameState.alerts.slice(-5);
  }
  
  toggleApiKey() {
    const keyDisplay = document.getElementById('api-key-display');
    const toggleBtn = document.getElementById('toggle-key');
    
    if (keyDisplay.textContent.includes('•')) {
      keyDisplay.textContent = this.config.apiKey;
      toggleBtn.textContent = "HIDE KEY";
      toggleBtn.style.background = 'var(--error-red)';
      toggleBtn.style.color = 'white';
    } else {
      keyDisplay.textContent = '••••••••••••••••••••••••••••••••';
      toggleBtn.textContent = "REVEAL KEY";
      toggleBtn.style.background = 'var(--warning-yellow)';
      toggleBtn.style.color = '#1e293b';
    }
  }
  
  async generateRealmKeys() {
    showLoading();
    addAlert('Generating realm keys...', 'info');
    
    try {
      const response = await fetch(`${this.config.apiEndpoint}/keys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workerId: 1 })
      });
      
      const data = await response.json();
      addAlert(`Realm key generated for worker 1: ${data.key.substring(0, 8)}...`, 'success');
      hideLoading();
    } catch (error) {
      addAlert('Failed to generate realm keys', 'error');
      hideLoading();
    }
  }
  
  async activateFullRealm() {
    showLoading();
    addAlert('Activating full realm protocols...', 'info');
    
    try {
      // Simulate activation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await fetch(`${this.config.apiEndpoint}/workers`);
      const data = await response.json();
      
      this.gameState.systemHealth = Math.min(100, this.gameState.systemHealth + 20);
      this.updateSystemHealth();
      
      addAlert('Realm fully activated - mining at maximum efficiency', 'success');
      hideLoading();
    } catch (error) {
      addAlert('Failed to activate realm', 'error');
      hideLoading();
    }
  }
  
  async runDiagnostic() {
    showLoading();
    addAlert('Starting realm diagnostic scan...', 'info');
    
    try {
      // Simulate scan
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addAlert('Diagnostic complete: All systems nominal', 'success');
      
      // Check for issues
      const deadWorkers = this.gameState.workers.filter(w => w.status === 'dead');
      
      if (deadWorkers.length > 0) {
        addAlert(`Found ${deadWorkers.length} unstable connections - repairing...`, 'info');
        
        // Simulate repair
        await new Promise(resolve => setTimeout(resolve, 1500));
        addAlert('Connections repaired - realm stability improved', 'success');
      }
      
      hideLoading();
    } catch (error) {
      addAlert('Diagnostic scan failed', 'error');
      hideLoading();
    }
  }
  
  async emergencyProtocol() {
    showLoading();
    addAlert('EMERGENCY PROTOCOL ENGAGED', 'error');
    
    try {
      // Simulate emergency actions
      await new Promise(resolve => setTimeout(resolve, 500));
      addAlert('Isolating unstable workers...', 'info');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      addAlert('Re-routing power to critical systems...', 'info');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Attempt to recover workers
      const recovered = Math.min(2, this.config.maxWorkers - this.gameState.activeCount);
      
      if (recovered > 0) {
        addAlert(`Recovered ${recovered} workers - realm stabilized`, 'success');
        
        // Update state
        this.gameState.activeCount += recovered;
        this.gameState.systemHealth = Math.min(100, this.gameState.systemHealth + (recovered * 15));
        this.updateSystemHealth();
        this.updateRealmStats();
      } else {
        addAlert('No workers to recover - realm already stable', 'info');
      }
      
      hideLoading();
    } catch (error) {
      addAlert('Emergency protocol failed', 'error');
      hideLoading();
    }
  }
  
  async repairWorker(workerIndex) {
    const worker = this.gameState.workers[workerIndex];
    addAlert(`Repairing ${worker.name}...`, 'info');
    
    showLoading();
    
    try {
      // Simulate repair
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update worker status
      this.gameState.workers[workerIndex].status = 'online';
      this.gameState.workers[workerIndex].hashrate = (Math.random() * 10 + 5).toFixed(2);
      this.gameState.workers[workerIndex].lastShare = Math.floor(Date.now() / 1000);
      
      this.renderWorkers();
      this.updateRealmStats();
      this.updateSystemHealth();
      
      addAlert(`${worker.name} repaired and back online`, 'success');
      hideLoading();
    } catch (error) {
      addAlert(`Failed to repair ${worker.name}`, 'error');
      hideLoading();
    }
  }
}

// Helper functions
function showLoading() {
  document.getElementById('loading-overlay').style.display = 'flex';
}

function hideLoading() {
  document.getElementById('loading-overlay').style.display = 'none';
}

function addAlert(message, type) {
  const alertContainer = document.getElementById('alert-container');
  const alert = document.createElement('div');
  
  let bgColor, borderColor;
  switch(type) {
    case 'success':
      bgColor = 'rgba(16, 185, 129, 0.2)';
      borderColor = 'var(--worker-green)';
      break;
    case 'error':
      bgColor = 'rgba(239, 68, 68, 0.2)';
      borderColor = 'var(--error-red)';
      break;
    default:
      bgColor = 'rgba(245, 158, 11, 0.2)';
      borderColor = 'var(--warning-yellow)';
  }
  
  alert.style.cssText = `
    background: ${bgColor};
    border-left: 4px solid ${borderColor};
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    animation: fadeAlert 3s forwards;
  `;
  
  alert.textContent = message;
  alertContainer.prepend(alert);
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (alert.parentNode) {
      alert.style.opacity = '0';
      setTimeout(() => {
        if (alert.parentNode) {
          alertContainer.removeChild(alert);
        }
      }, 500);
    }
  }, 5000);
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new RealmGame();
});
