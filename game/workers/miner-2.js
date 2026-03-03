// Worker 2 - Specialized Module
class Miner2 extends BaseWorker {
  constructor(data) {
    super(data);
    this.specialty = 'High Efficiency';
    this.energyConsumption = 'Low';
  }
  
  render() {
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.className = `worker-card status-${this.status} worker-type-miner1`;
      this.element.dataset.workerId = this.id;
      
      this.updateVisuals();
    }
    
    return this.element;
  }
  
  updateVisuals() {
    super.updateVisuals();
    
    if (this.element) {
      // Add specialty indicator
      const specialtyEl = document.createElement('div');
      specialtyEl.className = 'worker-specialty';
      specialtyEl.textContent = `Specialty: ${this.specialty}`;
      
      const statsEl = this.element.querySelector('.worker-stats');
      if (statsEl) {
        statsEl.insertAdjacentElement('beforebegin', specialtyEl);
      }
      
      // Add energy indicator
      const energyEl = document.createElement('div');
      energyEl.className = 'worker-energy';
      energyEl.innerHTML = `<span>Energy:</span> ${this.energyConsumption}`;
      
      const actionsEl = this.element.querySelector('.worker-actions');
      if (actionsEl) {
        actionsEl.insertAdjacentElement('beforebegin', energyEl);
      }
    }
  }
  
  activateBoost() {
    if (this.status === 'online') {
      // Simulate boost effect
      this.hashrate *= 1.15;
      this.updateVisuals();
      
      addAlert(`${this.name} boost activated - +15% hashrate`, 'success');
      return true;
    }
    return false;
  }
}
