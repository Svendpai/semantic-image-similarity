import FakeAlgorithm from './FakeAlgorithm/fake-algorithm';
import SiameseDemoAlgorithm from './SiameseDemo/siamese-demo';

export type SimilarityResponse = {
    similarity: number;
    responseTimeInMillis: number;
};

export type SimilarityAlgorithmData = {
    displayName: string;
    latestSimilarityResponse: SimilarityResponse | null;
    isCalculating: boolean;
    modelLoaded?: boolean;
    model?: any;
    modelLoading?: boolean;
};

export interface SimilarityAlgorithm {
    algorithmData: SimilarityAlgorithmData;
    calculateSimilarity: (
        image1: any,
        image2: any,
        model?: any
    ) => Promise<SimilarityResponse>;
    loadModel: () => Promise<any>;
}

const similarityAlgorithms: SimilarityAlgorithm[] = [
    //register your similarity algorithms here
    FakeAlgorithm,
    SiameseDemoAlgorithm,
];

export const getAllAlgorithms = (): SimilarityAlgorithm[] => {
    return similarityAlgorithms;
};
