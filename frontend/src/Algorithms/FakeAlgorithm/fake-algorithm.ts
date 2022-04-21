import {
    SimilarityAlgorithm,
    SimilarityResponse,
} from '../similiarty-algorithms';

const FakeAlgorithm: SimilarityAlgorithm = {
    isCalculating: false,
    latestSimilarityResponse: null,
    displayName: 'Fake Algorithm',
    calculateSimilarity: async (image1: any, image2: any) => {
        FakeAlgorithm.isCalculating = true;
        const simResponse: SimilarityResponse = await new Promise(
            (resolve, reject) => {
                const millis = Math.floor(Math.random() * 1000);
                setTimeout(() => {
                    resolve({
                        similarity: Math.random(),
                        responseTimeInMillis: millis,
                    });
                }, millis);
            }
        );
        FakeAlgorithm.isCalculating = false;

        FakeAlgorithm.latestSimilarityResponse = simResponse;
        return simResponse;
    },
};

export default FakeAlgorithm;
