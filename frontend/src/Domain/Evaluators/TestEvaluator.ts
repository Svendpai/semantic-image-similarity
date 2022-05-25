import { TestBlurCalculator } from '../Calculators/BlurCalculators/TestBlurCalculator';
import { TestLightLevelCalculator } from '../Calculators/LightLevelCalculators/TestLightLevelCalcualtors';
import { TestSimilarityCalculator } from '../Calculators/SimilairtyCalculators/TestModel/TestSimilarityCalculator';
import { EvaluatorAPI, RegisteredEvaluator } from '../EvaluatorAPI';
import { IDocumentationImageEvaluator } from '../Interfaces/IDocumentationImageEvaluator';
import { IImageBlurCalculator } from '../Interfaces/IImageBlurCalculator';
import { IImageLightLevelCalculator } from '../Interfaces/IImageLightLevelCalculator';
import { IImageSimilarityCalculator } from '../Interfaces/IImageSimilarityCalculator';
import { ImageEvaluation } from '../Types/ImageEvaluation';

class TestEvaluator implements IDocumentationImageEvaluator {
    similarityCalculator: IImageSimilarityCalculator;
    lightLevelCalculator: IImageLightLevelCalculator;
    blurCalculator: IImageBlurCalculator;
    name: RegisteredEvaluator;
    isLoading: boolean;
    latestEvaluation: ImageEvaluation | undefined;
    loadEvaluator: () => Promise<boolean>;
    isEvaluatorReady: () => boolean;
    evaluateAsDocumentationImage: (documentationImage: string, instructionImage: string) => Promise<ImageEvaluation>;

    ready: boolean;
    constructor(
        similarityCalculator: IImageSimilarityCalculator,
        lightLevelCalculator: IImageLightLevelCalculator,
        blurCalculator: IImageBlurCalculator,
        name: RegisteredEvaluator
    ) {
        this.ready = false;
        this.isLoading = false;
        this.name = name;
        this.similarityCalculator = similarityCalculator;
        this.lightLevelCalculator = lightLevelCalculator;
        this.blurCalculator = blurCalculator;
        this.latestEvaluation = undefined;
        this.loadEvaluator = async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.ready = true;
                    resolve(true);
                }, 1000);
            });
        };
        this.isEvaluatorReady = () => {
            return (
                this.ready &&
                similarityCalculator.isCalculatorReady() &&
                lightLevelCalculator.isCalculatorReady() &&
                blurCalculator.isCalculatorReady()
            );
        };
        this.evaluateAsDocumentationImage = async (documentationImage: string, instructionImage: string) => {
            this.isLoading = true;
            const ImageEvaluation: ImageEvaluation = {
                producer: 'TestEvaluator',
                blurred: { degreeOfBlur: Math.random(), responseTime: Math.random() },
                lightLevel: { lightLevel: Math.random(), responseTime: Math.random() },
                similarity: { similarity: Math.random(), responseTime: Math.random() },
                documentationIsValid: true,
                warnings: [
                    { type: 'Similarity', warning: 'similarity warning test' },
                    { type: 'LightLevel', warning: 'light warning test' },
                    { type: 'Blur', warning: 'blur warning test' },
                ],
            };
            const evaluation: ImageEvaluation = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(ImageEvaluation);
                }, 1000);
            });
            this.isLoading = false;
            this.latestEvaluation = evaluation;
            if (evaluation.similarity.similarity > similarityCalculator.acceptedMeasureThresholds.okay) {
                evaluation.documentationIsValid = true;
            } else {
                evaluation.documentationIsValid = false;
            }
            return evaluation;
        };
    }
}

export { TestEvaluator };
