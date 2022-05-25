import { RegisteredEvaluator } from '../../../EvaluatorAPI';
import { IImageBlurCalculator } from '../../../Interfaces/IImageBlurCalculator';
import { IImageLightLevelCalculator } from '../../../Interfaces/IImageLightLevelCalculator';
import { IImageSimilarityCalculator } from '../../../Interfaces/IImageSimilarityCalculator';
import DefaultEvaluator from '../../DefaultEvalutors';

class SiameseEvaluator extends DefaultEvaluator {
    constructor(
        name: RegisteredEvaluator,
        similarityCalculator: IImageSimilarityCalculator,
        lightLevelCalculator: IImageLightLevelCalculator,
        blurCalculator: IImageBlurCalculator
    ) {
        super(name, similarityCalculator, lightLevelCalculator, blurCalculator);
    }
}

export default SiameseEvaluator;
