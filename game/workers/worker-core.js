// Base Worker Module
class BaseWorker {
  constructor(data) {
    this.id = data.id || Math.floor(Math.random() * 1000);
    this.name = data.name || `Worker-${this.id}`;
    this.status = data.status || 'offline';
    this.hashrate = data.hashrate || 0;
    this.accepted = data.accepted || 0;
    this.rejected = data.rejected || 0;
    this.lastShare = data.lastShare || 0;
    this.gameLevel = data.gameLevel || 1;
    
    this.element = null;
  }
  
  render() {
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.className = `worker-card status-${this.status}`;
      this.element.dataset.workerId = this.id;
      
      this.updateVisuals();
    }
    
    return this.element;
  }
  
  updateVisuals() {
    if (!this.element) return;
    
    this.element.innerHTML = `
      <div class="worker-header">
        <div class="worker-name">${this.name}</div>
        <div class="worker-id">ID: ${this.id} | L${this.gameLevel}</div>
      </div>
      
      <div class="worker-visual">
        <div class="mining-visual"></div>
      </div>
      
      <div class="worker-stats">
        <div class="stat">
          <div class="stat-label">Hashrate</div>
          <div class="stat-value">${this.hashrate.toFixed(2)} H/s</div>
        </div>
        <div class="stat">
          <div class="stat-label">Accepted</div>
          <div class="stat-value">${this.accepted}</div>
        </div>
        <div class="stat">
          <div class="stat-label">Rejected</div>
          <div class="stat-value">${this.rejected}</div>
        </div>
        <div class="stat">
          <div class="stat-label">Last Share</div>
          <div class="stat-value">${this.formatLastShare(this.lastShare)}</div>
        </div>
      </div>
      
      <div class="worker-actions">
        <button class="action-btn" data-action="details">Details</button>
        <button class="action-btn" data-action="repair">Repair</button>
      </div>
    `;
    
    // Update animation based on status
    const visual = this.element.querySelector('.mining-visual');
    if (visual) {
      visual.className = 'mining-visual';
      if (this.status === 'online') {
        visual.style.animation = 'mining-pulse 3s infinite';
      } else if (this.status === 'unstable') {
        visual.style.animation = 'unstable-pulse 4s infinite';
      } else {
        visual.style.animation = 'none';
        visual.style.opacity = '0.5';
      }
    }
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
  
  update(data) {
    Object.assign(this, data);
    this.updateVisuals();
  }
}
