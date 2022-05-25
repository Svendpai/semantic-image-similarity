import { BlurResponse } from '../Types/CalculationResponseObjects';

export interface IImageBlurCalculator {
    loadCalculator: () => Promise<boolean>;
    isCalculatorReady: () => boolean;
    calculateDegreeOfBlur: (image: string) => Promise<BlurResponse>;
}
