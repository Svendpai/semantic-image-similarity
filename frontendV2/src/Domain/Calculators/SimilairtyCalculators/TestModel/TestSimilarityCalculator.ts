import { IImageBlurCalculator } from '../../../Interfaces/IImageBlurCalculator';
import { IImageLightLevelCalculator } from '../../../Interfaces/IImageLightLevelCalculator';
import { IImageSimilarityCalculator } from '../../../Interfaces/IImageSimilarityCalculator';
import { BlurResponse, LightLevelResponse, SimilarityResponse } from '../../../Types/CalculationResponseObjects';

class TestSimilarityCalculator implements IImageSimilarityCalculator {
    calculator?: any;
    loadCalculator: () => Promise<boolean>;
    isCalculatorReady: () => boolean;
    calculateSimilarity: (image: string, image2: string) => Promise<SimilarityResponse>;
    constructor() {
        this.acceptResponseTimeThresholds = { okay: 0.33, good: 0.65 };
        this.acceptedMeasureThresholds = { okay: 0.33, good: 0.65 };
        this.calculateSimilarity = async () => {
            const similairtyResponse: SimilarityResponse = { similarity: 0, responseTime: 0 };
            return similairtyResponse;
        };
        this.loadCalculator = async () => {
            this.calculator = 'similarity model';
            return true;
        };
        this.isCalculatorReady = () => {
            return true;
        };
    }
    acceptedMeasureThresholds: { okay: number; good: number };
    acceptResponseTimeThresholds: { okay: number; good: number };
}

export { TestSimilarityCalculator };
