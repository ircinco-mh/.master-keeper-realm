class RealmGameLogic {
    constructor() {
      this.realmLevel = 1;
      this.realmHealth = 100;
      this.keysHeld = 0;
      this.maxWorkers = 8;
    }
  
    updateRealmState(workersData) {
      const onlineCount = workersData.workers.filter(w => w.status === 'online').length;
      this.keysHeld = onlineCount;
      
      // Update realm health (0-100)
      this.realmHealth = Math.max(25, 100 - (this.maxWorkers - onlineCount) * 10);
      
      // Update realm level (1-10)
      this.realmLevel = 1 + Math.floor(onlineCount / 2);
    }
  
    getRealmStatus() {
      return {
        realmLevel: this.realmLevel,
        realmHealth: this.realmHealth,
        keysHeld: this.keysHeld,
        maxKeys: this.maxWorkers,
        status: this.realmHealth > 75 ? 'stable' : 
                this.realmHealth > 50 ? 'caution' : 'critical'
      };
    }
  
    activateRealm() {
      if (this.keysHeld >= 5) {
        this.realmHealth = Math.min(100, this.realmHealth + 20);
        return true;
      }
      return false;
    }
  
    emergencyProtocol() {
      // Simulate recovery - bring back 1-2 dead workers
      const recoveryCount = Math.floor(Math.random() * 2) + 1;
      this.realmHealth = Math.min(100, this.realmHealth + (recoveryCount * 15));
      return recoveryCount;
    }
  
    getAlerts() {
      const alerts = [];
      
      if (this.realmHealth < 40) {
        alerts.push({
          type: 'critical',
          message: 'Realm stability critically low! Activate emergency protocol'
        });
      } else if (this.realmHealth < 70) {
        alerts.push({
          type: 'warning',
          message: 'Realm stability decreasing - monitor worker status'
        });
      }
      
      if (this.keysHeld < this.maxWorkers) {
        alerts.push({
          type: 'info',
          message: `Missing ${this.maxWorkers - this.keysHeld} realm keys`
        });
      }
      
      return alerts;
    }
  }
  
  module.exports = { RealmGameLogic };
  