import { SimilarityResponse } from '../Types/CalculationResponseObjects';

export interface IImageSimilarityCalculator {
    acceptedMeasureThresholds: { okay: number; good: number };
    acceptResponseTimeThresholds: { okay: number; good: number };
    loadCalculator: () => Promise<boolean>;
    isCalculatorReady: () => boolean;
    calculateSimilarity: (image: string, image2: string) => Promise<SimilarityResponse>;
}
