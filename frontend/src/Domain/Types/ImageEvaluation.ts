export type ImageEvaluation = {
    warnings: Warning[];
    documentationIsValid: boolean;
};

export type Warning = {
    type: 'Blur' | 'LightLevel' | 'Similarity';
    warning: string;
};
