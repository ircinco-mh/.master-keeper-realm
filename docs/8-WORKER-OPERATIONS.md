# 🧱 8-Worker Operations Manual

## System Overview

The Master Keeper Realm is specifically designed for **exactly 8 mining workers**. This document explains how to operate and manage all 8 workers within the game-integrated monitoring system.

## Worker Configuration

### Required Settings for Each Worker

Pool: stratum+tcp://stratum.kano.is:3333 Username: Appleseed.worker[1-8] Password: x


### Worker ID Mapping
| Worker ID | Username Format | Purpose |
|-----------|-----------------|---------|
| 1 | Appleseed.worker1 | Primary mining node |
| 2 | Appleseed.worker2 | Secondary mining node |
| 3 | Appleseed.worker3 | Tertiary mining node |
| 4 | Appleseed.worker4 | Backup mining node |
| 5 | Appleseed.worker5 | High-efficiency node |
| 6 | Appleseed.worker6 | Stable operation node |
| 7 | Appleseed.worker7 | Maximum hashrate node |
| 8 | Appleseed.worker8 | Final security node |

## Key Management

### Generating Keys for All Workers
```bash
kano-builder key generate --all
