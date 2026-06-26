import * as migration_20260625_052351_first from './20260625_052351_first';

export const migrations = [
  {
    up: migration_20260625_052351_first.up,
    down: migration_20260625_052351_first.down,
    name: '20260625_052351_first'
  },
];
