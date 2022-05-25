import { TestBlurCalculator } from './Calculators/BlurCalculators/TestBlurCalculator';
import { TestLightLevelCalculator } from './Calculators/LightLevelCalculators/TestLightLevelCalcualtors';
import { TestSimilarityCalculator } from './Calculators/SimilairtyCalculators/TestSimilarityCalculator';
import { TestEvaluator } from './Evaluators/TestEvaluator';
import { IDocumentationImageEvaluator } from './Interfaces/IDocumentationImageEvaluator';
import { IImageBlurCalculator } from './Interfaces/IImageBlurCalculator';
import { IImageLightLevelCalculator } from './Interfaces/IImageLightLevelCalculator';
import { IImageSimilarityCalculator } from './Interfaces/IImageSimilarityCalculator';

export type RegisteredEvaluator = 'TestEvaluator';
export type RegisteredSimilarityCalculator = 'TestSimilarityCalculator';
export type RegisteredLightLevelCalculator = 'TestLightLevelCalculator';
export type RegisteredBlurCalculator = 'TestBlurCalculator';

/*const availableEvaluators: { [key in RegisteredEvaluator]: IDocumentationImageEvaluator } = {
    TestEvaluator: new TestEvaluator(),
};*/
const availableSimilarityCalculators: { [key in RegisteredSimilarityCalculator]: IImageSimilarityCalculator } = {
    TestSimilarityCalculator: new TestSimilarityCalculator(),
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
};

export { EvaluatorAPI };
