export type Color =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warn'
    | 'info'
    | 'light'
    | 'dark'
    | 'white'
    | 'black';

export const colors: { [key in Color]: string } = {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#93E486',
    danger: '#E33554',
    warn: '#FFD338',
    info: '#17a2b8',
    light: '#A8A8A8',
    dark: '#262626',
    white: '#fff',
    black: '#000',
};
