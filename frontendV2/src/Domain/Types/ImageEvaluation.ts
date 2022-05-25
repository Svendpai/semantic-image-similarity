import { RegisteredEvaluator } from '../EvaluatorAPI';
import { BlurResponse, LightLevelResponse, SimilarityResponse } from './CalculationResponseObjects';

export type ImageEvaluation = {
    producer: RegisteredEvaluator;
    warnings: Warning[];
    documentationIsValid: boolean;
    similarity: SimilarityResponse;
    blurred: BlurResponse;
    lightLevel: LightLevelResponse;
};

export type Warning = {
    type: 'Blur' | 'LightLevel' | 'Similarity';
    warning: string;
};
