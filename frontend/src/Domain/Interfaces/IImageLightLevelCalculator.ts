import { LightLevelResponse } from '../Types/CalculationResponseObjects';

export interface IImageLightLevelCalculator {
    loadCalculator: () => Promise<boolean>;
    isCalculatorReady: () => boolean;
    calculateLightLevel: (
        image: string,
        image2: string
    ) => Promise<LightLevelResponse>;
}
