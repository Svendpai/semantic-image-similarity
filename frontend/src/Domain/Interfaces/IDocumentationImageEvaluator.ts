import { SimilarityResponse } from '../Types/CalculationResponseObjects';
import { ImageEvaluation } from '../Types/ImageEvaluation';
import { IImageBlurCalculator } from './IImageBlurCalculator';
import { IImageLightLevelCalculator } from './IImageLightLevelCalculator';
import { IImageSimilarityCalculator } from './IImageSimilarityCalculator';

export interface IDocumentationImageEvaluator {
    similarityCalculator: IImageSimilarityCalculator;
    lightLevelCalculator: IImageLightLevelCalculator;
    blurCalculator: IImageBlurCalculator;

    loadEvaluator: () => Promise<boolean>;
    isEvaluatorReady: () => boolean;
    evaluateAsDocumentationImage: (
        documentationImage: string,
        instructionImage: string
    ) => Promise<ImageEvaluation>;
}
