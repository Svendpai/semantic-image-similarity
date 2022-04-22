import {
    SimilarityAlgorithm,
    SimilarityResponse,
} from '../similiarty-algorithms';

const FakeAlgorithm: SimilarityAlgorithm = {
    algorithmData: {
        isCalculating: false,
        latestSimilarityResponse: null,
        displayName: 'Fake Algorithm',
        modelLoaded: true,
    },
    calculateSimilarity: async (image1: any, image2: any) => {
        FakeAlgorithm.algorithmData.isCalculating = true;
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
        FakeAlgorithm.algorithmData.isCalculating = false;
        return simResponse;
    },
    loadModel: async () => {
        return new Promise((resolve, reject) => {
            const millis = Math.floor(Math.random() * 2000 + 1000);
            setTimeout(() => {
                resolve(true);
                FakeAlgorithm.algorithmData.modelLoaded = true;
            }, millis);
        });
    },
};

export default FakeAlgorithm;
