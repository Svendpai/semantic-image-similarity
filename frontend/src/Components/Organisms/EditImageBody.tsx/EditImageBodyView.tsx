import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { IDocumentationImageEvaluator } from '../../../Domain/Interfaces/IDocumentationImageEvaluator';
import { ImageEvaluation } from '../../../Domain/Types/ImageEvaluation';
import { RootState } from '../../../Redux/store';
import ContainerCenteringContent from '../../Atoms/ContainerCenteringContent';
import ContainerVerticalAlign from '../../Atoms/ContainerVerticalAlign';
import TextComponent from '../../Atoms/TextComponent';
import ProgressbarLabeled from '../../Molecules/ProgressbarLabeled';
import { evaluateColorFromMeasureGivenThresholds } from '../ModelResponseTable';

const EditImageBodyView: React.FC<{ evaluator: IDocumentationImageEvaluator; documentationImage: string }> = ({
    evaluator,
    documentationImage,
}) => {
    return (
        <ContainerVerticalAlign justifyContent='flex-start'>
            <ContainerCenteringContent height='60%'>
                <Image
                    source={{ uri: documentationImage }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                    }}
                />
            </ContainerCenteringContent>

            <ContainerVerticalAlign height='20%'>
                {evaluator.latestEvaluation && (
                    <ProgressbarLabeled
                        progress={Math.round(evaluator.latestEvaluation.similarity.similarity * 100)}
                        color={evaluateColorFromMeasureGivenThresholds(
                            evaluator.latestEvaluation.similarity.similarity,
                            evaluator.similarityCalculator.acceptedMeasureThresholds
                        )}
                        measure={'Similarity'}
                    />
                )}
                {evaluator.latestEvaluation?.warnings.map((warning, index) => (
                    <React.Fragment key={index}>
                        <TextComponent key={index} color='white'>
                            {warning.warning}
                        </TextComponent>
                    </React.Fragment>
                ))}
            </ContainerVerticalAlign>
        </ContainerVerticalAlign>
    );
};

export default EditImageBodyView;
