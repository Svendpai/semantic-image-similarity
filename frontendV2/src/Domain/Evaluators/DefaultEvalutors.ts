import { ImageEvaluation, Warning } from '../Types/ImageEvaluation';
import { RegisteredEvaluator } from '../EvaluatorAPI';
import { IDocumentationImageEvaluator } from '../Interfaces/IDocumentationImageEvaluator';
import { IImageBlurCalculator } from '../Interfaces/IImageBlurCalculator';
import { IImageLightLevelCalculator } from '../Interfaces/IImageLightLevelCalculator';
import { IImageSimilarityCalculator } from '../Interfaces/IImageSimilarityCalculator';
import { SimilarityResponse } from '../Types/CalculationResponseObjects';

class DefaultEvaluator implements IDocumentationImageEvaluator {
    name: RegisteredEvaluator;
    similarityCalculator: IImageSimilarityCalculator;
    lightLevelCalculator: IImageLightLevelCalculator;
    blurCalculator: IImageBlurCalculator;
    isLoading: boolean;
    latestEvaluation: ImageEvaluation | undefined;
    loadEvaluator: () => Promise<boolean>;
    isEvaluatorReady: () => boolean;
    evaluateAsDocumentationImage: (documentationImage: string, instructionImage: string) => Promise<ImageEvaluation>;
    getWarnings: (evaluation: ImageEvaluation) => Warning[];

    constructor(
        name: RegisteredEvaluator,
        similarityCalculator: IImageSimilarityCalculator,
        lightLevelCalculator: IImageLightLevelCalculator,
        blurCalculator: IImageBlurCalculator
    ) {
        this.name = name;
        this.similarityCalculator = similarityCalculator;
        this.lightLevelCalculator = lightLevelCalculator;
        this.blurCalculator = blurCalculator;
        this.isLoading = false;
        this.latestEvaluation = undefined;
        this.loadEvaluator = async () => {
            return true;
        };
        this.isEvaluatorReady = () => {
            return true;
        };
        this.getWarnings = (evaluation: ImageEvaluation) => {
            const warnings: Warning[] = [];
            if (evaluation.similarity.similarity < this.similarityCalculator.acceptedMeasureThresholds.okay) {
            }
            return warnings;
        };

        this.evaluateAsDocumentationImage = async (documentationImage: string, instructionImage: string) => {
            console.log('calculating similarity with: ' + this.name);
            const similarity = await this.similarityCalculator.calculateSimilarity(
                documentationImage,
                instructionImage
            );
            console.log(similarity.similarity);
            const blur = await this.blurCalculator.calculateDegreeOfBlur(documentationImage);
            const lightLevel = await this.lightLevelCalculator.calculateLightLevel(documentationImage);

            const evaluation: ImageEvaluation = {
                similarity: similarity,
                blurred: blur,
                lightLevel: lightLevel,
                producer: this.name,
                documentationIsValid: similarity.similarity > this.similarityCalculator.acceptedMeasureThresholds.okay,
                warnings: [],
            };
            evaluation.warnings = this.getWarnings(evaluation);
            this.latestEvaluation = evaluation;
            return evaluation;
        };
    }
}

export default DefaultEvaluator;
