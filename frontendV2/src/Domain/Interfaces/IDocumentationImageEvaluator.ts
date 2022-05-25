import {
    RegisteredBlurCalculator,
    RegisteredLightLevelCalculator,
    RegisteredSimilarityCalculator,
} from '../EvaluatorAPI';
import { SimilarityResponse } from '../Types/CalculationResponseObjects';
import { ImageEvaluation } from '../Types/ImageEvaluation';
import { IImageBlurCalculator } from './IImageBlurCalculator';
import { IImageLightLevelCalculator } from './IImageLightLevelCalculator';
import { IImageSimilarityCalculator } from './IImageSimilarityCalculator';

export interface IDocumentationImageEvaluator {
    name: string;
    similarityCalculator: IImageSimilarityCalculator;
    lightLevelCalculator: IImageLightLevelCalculator;
    blurCalculator: IImageBlurCalculator;
    isLoading: boolean;
    latestEvaluation: ImageEvaluation | undefined;

    loadEvaluator: () => Promise<boolean>;
    isEvaluatorReady: () => boolean;
    evaluateAsDocumentationImage: (documentationImage: string, instructionImage: string) => Promise<ImageEvaluation>;
}
