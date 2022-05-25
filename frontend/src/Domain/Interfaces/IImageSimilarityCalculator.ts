import { SimilarityResponse } from '../Types/CalculationResponseObjects';

export interface IImageSimilarityCalculator {
    loadCalculator: () => Promise<boolean>;
    isCalculatorReady: () => boolean;
    calculateSimilarity: (
        image: string,
        image2: string
    ) => Promise<SimilarityResponse>;
}
