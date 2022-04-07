import PHash from './Phash';
interface AlgorithmResponse {
    latency: number;
    similarity: number;
}

interface AlgorithmInstance {
    name: string;
    desc: string;
    calculateSimilarity: (
        img1: string,
        img2: string
    ) => Promise<AlgorithmResponse>;
}

const algorithmDictionary: { [name: string]: AlgorithmInstance } = {};
algorithmDictionary.pHash = {
    name: 'pHash',
    desc: 'calculates images similarity by...',
    calculateSimilarity: async (
        img1: string,
        img2: string
    ): Promise<AlgorithmResponse> => {
        const startTime = new Date().getTime();
        PHash(img1);
        const finishTime = new Date().getTime();

        return { similarity: 0, latency: finishTime - startTime };
    },
};

export default algorithmDictionary;
