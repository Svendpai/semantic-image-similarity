export type FontSize = 'small' | 'medium' | 'large' | 'extraLarge';

export const fontSizes: { [key in FontSize]: number } = {
    small: 10,
    medium: 14,
    large: 18,
    extraLarge: 24,
};
