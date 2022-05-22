import FakeAlgorithm from './FakeAlgorithm/fake-algorithm';
import SiameseDemoAlgorithm from './SiameseDemo/siamese-demo';

export type SimilarityResponse = {
    similarity: number;
    responseTimeInMillis: number;
};

export type SimilarityCalculatorData = {
    displayName: string;
    latestSimilarityResponse: SimilarityResponse | null;
    isCalculating: boolean;
    modelLoaded?: boolean;
    model?: any;
    modelLoading?: boolean;
};

export interface IImageSimilarityCalculator {
    algorithmData: SimilarityCalculatorData;
    calculateSimilarity: (
        image1: any,
        image2: any,
        model?: any
    ) => Promise<SimilarityResponse>;
    loadCalculator: () => Promise<any>;
}

const similarityAlgorithms: IImageSimilarityCalculator[] = [
    //register your similarity algorithms here
    FakeAlgorithm,
    SiameseDemoAlgorithm,
];

export const getAllAlgorithms = (): IImageSimilarityCalculator[] => {
    return similarityAlgorithms;
};
