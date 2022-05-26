import { calculateLightLevel, decodeImage } from '../../../Utils/SimilarityCalculatorUtils';
import { IImageBlurCalculator } from '../../Interfaces/IImageBlurCalculator';
import { IImageLightLevelCalculator } from '../../Interfaces/IImageLightLevelCalculator';
import { BlurResponse, LightLevelResponse } from '../../Types/CalculationResponseObjects';

class TestLightLevelCalculator implements IImageLightLevelCalculator {
    calculator?: any;
    loadCalculator: () => Promise<boolean>;
    isCalculatorReady: () => boolean;
    calculateLightLevel: (image: string) => Promise<LightLevelResponse>;

    constructor() {
        this.acceptResponseTimeThresholds = { okay: 0.33, good: 0.65 };
        this.acceptedMeasureThresholds = { okay: 0.33, good: 0.65 };
        this.loadCalculator = async () => {
            this.calculator = 'light level model';
            return true;
        };
        this.isCalculatorReady = () => {
            return true;
        };
        this.calculateLightLevel = async (image: string) => {
            const startTime = new Date().getTime();
            const lightLevel = await calculateLightLevel(await decodeImage(image));
            const endTime = new Date().getTime();
            const lightLevelResponse: LightLevelResponse = {
                lightLevel: lightLevel,
                responseTime: endTime - startTime,
            };
            return lightLevelResponse;
        };
    }
    acceptResponseTimeThresholds: { okay: number; good: number };
    acceptedMeasureThresholds: { okay: number; good: number };
}

export { TestLightLevelCalculator };
