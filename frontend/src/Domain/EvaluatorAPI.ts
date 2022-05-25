import { TestBlurCalculator } from './Calculators/BlurCalculators/TestBlurCalculator';
import { TestLightLevelCalculator } from './Calculators/LightLevelCalculators/TestLightLevelCalcualtors';
import SiameseSimilarityCalculator from './Calculators/SimilairtyCalculators/SiameseSimarityCalcualtor/SiameseCalculator';
import { TestSimilarityCalculator } from './Calculators/SimilairtyCalculators/TestModel/TestSimilarityCalculator';
import SiameseEvaluator from './Evaluators/SiameseEvaluator/SiameseDemo/SiameseEvaluator';
import { TestEvaluator } from './Evaluators/TestEvaluator';
import { IDocumentationImageEvaluator } from './Interfaces/IDocumentationImageEvaluator';
import { IImageBlurCalculator } from './Interfaces/IImageBlurCalculator';
import { IImageLightLevelCalculator } from './Interfaces/IImageLightLevelCalculator';
import { IImageSimilarityCalculator } from './Interfaces/IImageSimilarityCalculator';

export type RegisteredEvaluator = 'TestEvaluator' | 'SiameseEvaluator';
export type RegisteredSimilarityCalculator = 'TestSimilarityCalculator' | 'SiameseSimilarityCalculator';
export type RegisteredLightLevelCalculator = 'TestLightLevelCalculator';
export type RegisteredBlurCalculator = 'TestBlurCalculator';

/*const availableEvaluators: { [key in RegisteredEvaluator]: IDocumentationImageEvaluator } = {
    TestEvaluator: new TestEvaluator(),
};*/
const availableSimilarityCalculators: { [key in RegisteredSimilarityCalculator]: IImageSimilarityCalculator } = {
    TestSimilarityCalculator: new TestSimilarityCalculator(),
    SiameseSimilarityCalculator: new SiameseSimilarityCalculator(),
};
const availableLightLevelCalculators: { [key in RegisteredLightLevelCalculator]: IImageLightLevelCalculator } = {
    TestLightLevelCalculator: new TestLightLevelCalculator(),
};
const availableBlurCalculators: { [key in RegisteredBlurCalculator]: IImageBlurCalculator } = {
    TestBlurCalculator: new TestBlurCalculator(),
};

const EvaluatorAPI = {
    /*getEvaluator: (evaluator: RegisteredEvaluator) => {
        return availableEvaluators[evaluator];
    },
    getAllEvaluators: () => {
        return availableEvaluators;
    },*/
    getSimilarityCalculator: (calculator: RegisteredSimilarityCalculator) => {
        return availableSimilarityCalculators[calculator];
    },
    getLightLevelCalculator: (calculator: RegisteredLightLevelCalculator) => {
        return availableLightLevelCalculators[calculator];
    },
    getBlurCalculator: (calculator: RegisteredBlurCalculator) => {
        return availableBlurCalculators[calculator];
    },
    getAllSimilarityCalculators: () => {
        return availableSimilarityCalculators;
    },
    getAllLightLevelCalculators: () => {
        return availableLightLevelCalculators;
    },
    getAllBlurCalculators: () => {
        return availableBlurCalculators;
    },
    loadAllEvaluators: async (): Promise<IDocumentationImageEvaluator[]> => {
        const similairtyCalculators = EvaluatorAPI.getAllSimilarityCalculators();
        const lightLevelCalculators = EvaluatorAPI.getAllLightLevelCalculators();
        const blurCalculators = EvaluatorAPI.getAllBlurCalculators();
        for (let calculator in similairtyCalculators) {
            const calc = similairtyCalculators[calculator as RegisteredSimilarityCalculator];
            await calc.loadCalculator();
        }
        for (let calculator in lightLevelCalculators) {
            const calc = lightLevelCalculators[calculator as RegisteredLightLevelCalculator];
            await calc.loadCalculator();
        }
        for (let calculator in blurCalculators) {
            const calc = blurCalculators[calculator as RegisteredBlurCalculator];
            await calc.loadCalculator();
        }

        const evaluators: IDocumentationImageEvaluator[] = [
            new TestEvaluator(
                similairtyCalculators.TestSimilarityCalculator,
                lightLevelCalculators.TestLightLevelCalculator,
                blurCalculators.TestBlurCalculator,
                'TestEvaluator'
            ),
            new SiameseEvaluator(
                'SiameseEvaluator',
                similairtyCalculators.SiameseSimilarityCalculator,
                lightLevelCalculators.TestLightLevelCalculator,
                blurCalculators.TestBlurCalculator
            ),
        ];

        for (let evaluator of evaluators) {
            if (!evaluator.isEvaluatorReady()) {
                await evaluator.loadEvaluator();
            }
        }

        return evaluators;
    },
};

export { EvaluatorAPI };