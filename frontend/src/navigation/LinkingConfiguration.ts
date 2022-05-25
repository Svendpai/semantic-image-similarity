import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './NavigationTypes';

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [],
    config: {
        screens: {
            Home: 'home',
            Editimage: 'editimage',
            InstructionCamera: 'instructioncamera',
            DocumentationCamera: 'documentationcamera',
        },
    },
};

export default linking;
