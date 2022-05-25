import { BlurResponse } from '../Types/CalculationResponseObjects';

export interface IImageBlurCalculator {
    calculator?: any;
    acceptedMeasureThresholds: { okay: number; good: number };
    acceptResponseTimeThresholds: { okay: number; good: number };
    loadCalculator: () => Promise<boolean>;
    isCalculatorReady: () => boolean;
    calculateDegreeOfBlur: (image: string) => Promise<BlurResponse>;
}
