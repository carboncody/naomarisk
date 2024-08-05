import { type Risk } from '@models';

export enum Thresholds {
  'GREEN',
  'YELLOW',
  'RED',
}

export function getThreshold(risk: Risk): Thresholds {
  const riskValue =
    risk.probability && risk.consequence
      ? risk.probability * risk.consequence
      : 0;

  const threshold = RiskMap[riskValue];
  return threshold ? threshold : Thresholds.GREEN;
}

export const RiskMap: Record<number, Thresholds> = {
  1: Thresholds.GREEN,
  2: Thresholds.GREEN,
  3: Thresholds.GREEN,
  4: Thresholds.GREEN,
  5: Thresholds.YELLOW,
  6: Thresholds.YELLOW,
  8: Thresholds.YELLOW,
  9: Thresholds.YELLOW,
  10: Thresholds.YELLOW,
  12: Thresholds.YELLOW,
  15: Thresholds.RED,
  16: Thresholds.RED,
  20: Thresholds.RED,
  25: Thresholds.RED,
};

export const ColorMap: Record<Thresholds, string> = {
  [Thresholds.GREEN]: 'lightgreen',
  [Thresholds.YELLOW]: 'yellow',
  [Thresholds.RED]: '#f54e42',
};
