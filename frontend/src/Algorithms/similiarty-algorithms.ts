import FakeAlgorithm from './FakeAlgorithm/fake-algorithm';

export type SimilarityResponse = {
    similarity: number;
    responseTimeInMillis: number;
};

export interface SimilarityAlgorithm {
    displayName: string;
    latestSimilarityResponse: SimilarityResponse | null;
    isCalculating: boolean;
    calculateSimilarity: (
        image1: any,
        image2: any
    ) => Promise<SimilarityResponse>;
}

const similarityAlgorithms: SimilarityAlgorithm[] = [
    //register your similarity algorithms here
    FakeAlgorithm,
];

export const getAllAlgorithms = (): SimilarityAlgorithm[] => {
    return similarityAlgorithms;
};
