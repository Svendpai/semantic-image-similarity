export type BorderRadius = 'small' | 'medium' | 'large' | 'full' | 'default';

export const borderRadiusDict: { [key in BorderRadius]: number } = {
    small: 2,
    medium: 4,
    large: 8,
    full: 1000,
    default: 0,
};
