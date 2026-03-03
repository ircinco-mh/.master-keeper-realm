// Master Keeper Character Controller
class MasterKeeper {
  constructor() {
    this.el = document.querySelector('.keeper-avatar');
    this.statusEl = document.querySelector('.keeper-status');
    this.statsEl = document.querySelector('.keeper-stats');
    this.level = 1;
    this.energy = 100;
    this.realmHealth = 100;
    
    this.init();
  }
  
  init() {
    this.updateVisuals();
    this.setupEventListeners();
    this.animate();
  }
  
  setupEventListeners() {
    // Add any keeper-specific interactions here
    this.el.addEventListener('click', () => {
      addAlert("The Master Keeper stands ready to command the realm", "info");
    });
  }
  
  updateVisuals() {
    // Update keeper appearance based on realm health
    if (this.realmHealth < 40) {
      this.el.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.7)';
    } else if (this.realmHealth < 70) {
      this.el.style.boxShadow = '0 0 30px rgba(245, 158, 11, 0.5)';
    } else {
      this.el.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
    }
    
    // Update status
    const statusText = this.realmHealth > 75 ? 'Realm Guardian' :
                      this.realmHealth > 50 ? 'Realm Defender' : 'Realm Protector';
    
    this.statusEl.innerHTML = `
      <span class="status-dot" style="background: ${this.realmHealth > 75 ? 'var(--worker-green)' : 
        this.realmHealth > 50 ? 'var(--warning-yellow)' : 'var(--error-red)'};"></span>
      <span>${statusText}</span>
    `;
    
    // Update stats
    this.statsEl.innerHTML = `
      <div class="stat-box">
        <div class="stat-label">Realm Level</div>
        <div class="stat-value">${this.level}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">Energy</div>
        <div class="stat-value">${Math.floor(this.energy)}%</div>
      </div>
    `;
  }
  
  animate() {
    // Subtle keeper animation
    let pulse = 0;
    
    const animate = () => {
      pulse = (pulse + 0.01) % (Math.PI * 2);
      const scale = 1 + 0.03 * Math.sin(pulse);
      
      this.el.style.transform = `scale(${scale})`;
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  updateState(realmData) {
    this.realmHealth = realmData.realmHealth;
    this.level = realmData.realmLevel;
    this.energy = Math.min(100, realmData.keysHeld * 12.5);
    
    this.updateVisuals();
  }
}

// Initialize keeper when the page loads
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.keeper-avatar')) {
    window.masterKeeper = new MasterKeeper();
  }
});
