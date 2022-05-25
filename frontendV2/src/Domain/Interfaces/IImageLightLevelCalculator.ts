import { LightLevelResponse } from '../Types/CalculationResponseObjects';

export interface IImageLightLevelCalculator {
    calculator?: any;
    acceptedMeasureThresholds: { okay: number; good: number };
    acceptResponseTimeThresholds: { okay: number; good: number };
    loadCalculator: () => Promise<boolean>;
    isCalculatorReady: () => boolean;
    calculateLightLevel: (image: string) => Promise<LightLevelResponse>;
}
