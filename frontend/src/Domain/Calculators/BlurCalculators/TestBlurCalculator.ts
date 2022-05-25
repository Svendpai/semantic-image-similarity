import { IImageBlurCalculator } from '../../Interfaces/IImageBlurCalculator';
import { BlurResponse } from '../../Types/CalculationResponseObjects';

class TestBlurCalculator implements IImageBlurCalculator {
    calculateDegreeOfBlur: (image: string) => Promise<BlurResponse>;
    calculator?: any;
    loadCalculator: () => Promise<boolean>;
    isCalculatorReady: () => boolean;

    constructor() {
        this.acceptResponseTimeThresholds = { okay: 0.33, good: 0.65 };
        this.acceptedMeasureThresholds = { okay: 0.33, good: 0.65 };
        this.calculateDegreeOfBlur = async () => {
            const blurResponse: BlurResponse = { degreeOfBlur: 0, responseTime: 0 };
            return blurResponse;
        };
        this.loadCalculator = async () => {
            this.calculator = 'blur model';
            return true;
        };
        this.isCalculatorReady = () => {
            return true;
        };
    }
    acceptedMeasureThresholds: { okay: number; good: number };
    acceptResponseTimeThresholds: { okay: number; good: number };
}

export { TestBlurCalculator };
