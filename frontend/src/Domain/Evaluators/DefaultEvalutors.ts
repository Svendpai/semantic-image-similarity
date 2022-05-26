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
                warnings.push({
                    type: 'Similarity',
                    warning: `The images are not similar enough.`,
                });
            }
            if (evaluation.lightLevel.lightLevel < this.lightLevelCalculator.acceptedMeasureThresholds.okay) {
                warnings.push({
                    type: 'LightLevel',
                    warning: `Light level to low: try turning on flash`,
                });
            }
            return warnings;
        };

        this.evaluateAsDocumentationImage = async (documentationImage: string, instructionImage: string) => {
            const similarity = await this.similarityCalculator.calculateSimilarity(
                documentationImage,
                instructionImage
            );
            const blur = await this.blurCalculator.calculateDegreeOfBlur(documentationImage);
            const lightLevel1 = await this.lightLevelCalculator.calculateLightLevel(documentationImage);
            const lightLevel2 = await this.lightLevelCalculator.calculateLightLevel(instructionImage);
            const lightLevelDistance = Math.abs(lightLevel1.lightLevel - lightLevel2.lightLevel);

            const evaluation: ImageEvaluation = {
                similarity: similarity,
                blurred: blur,
                lightLevel: {
                    lightLevel: lightLevelDistance,
                    responseTime: lightLevel1.responseTime + lightLevel2.responseTime,
                },
                producer: this.name,
                documentationIsValid: similarity.similarity > this.similarityCalculator.acceptedMeasureThresholds.okay,
                warnings: [],
            };
            if (!evaluation.documentationIsValid) {
                evaluation.warnings = this.getWarnings(evaluation);
            }
            this.latestEvaluation = evaluation;
            return evaluation;
        };
    }
}

export default DefaultEvaluator;
