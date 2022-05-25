import { Box, HStack, VStack } from 'native-base';
import { ItemClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';

import React from 'react';
import { RegisteredEvaluator } from '../../Domain/EvaluatorAPI';
import { IDocumentationImageEvaluator } from '../../Domain/Interfaces/IDocumentationImageEvaluator';
import { SimilarityResponse } from '../../Domain/Types/CalculationResponseObjects';
import { ImageEvaluation } from '../../Domain/Types/ImageEvaluation';
import { Color, colors } from '../Atoms/Colors';
import TextComponent from '../Atoms/TextComponent';
import ColorMarkedTextBox from '../Molecules/ColorMarkedTextBox';
import TextBox from '../Molecules/TextBox';

type Props = {};

const columnOneWidth = '42%';
const otherColumnWidth = '27%';

const TableHeaderItem: React.FC<{
    text: string;
    width: string | number;
}> = ({ text, width }) => {
    return (
        <TextBox
            text={text}
            fontWeight={'bold'}
            width={width}
            backgroundColor='dark'
            borderRadius={'large'}
            color={'white'}
            xPos='left'
            extraStyles={{ paddingLeft: 10 }}
        />
    );
};

const TableHeader: React.FC<Props> = ({}) => {
    return (
        <HStack justifyContent={'space-between'} height={8}>
            <TableHeaderItem text='Method' width={columnOneWidth} />
            <TableHeaderItem text='Similarity' width={otherColumnWidth} />
            <TableHeaderItem text='Latency' width={otherColumnWidth} />
        </HStack>
    );
};

type MeasurementColumn = {
    colorMarking: Color;
    text: string;
};

const TableRow: React.FC<{
    itemOne: string;
    itemTwo: MeasurementColumn;
    itemThree: MeasurementColumn;
}> = ({ itemOne, itemTwo, itemThree }) => {
    return (
        <HStack justifyContent={'space-between'} height={7} my={2}>
            <TextBox
                text={itemOne}
                width={columnOneWidth}
                backgroundColor='black'
                borderRadius={'large'}
                color={'white'}
                xPos='left'
                extraStyles={{ paddingLeft: 10 }}
            />
            <ColorMarkedTextBox
                text={itemTwo.text}
                width={otherColumnWidth}
                backgroundColor='white'
                colorMarking={itemTwo.colorMarking}
                borderRadius={'large'}
                color={'black'}
            />
            <ColorMarkedTextBox
                text={itemThree.text}
                width={otherColumnWidth}
                backgroundColor='white'
                colorMarking={itemThree.colorMarking}
                borderRadius={'large'}
                color={'black'}
            />
        </HStack>
    );
};
export const evaluateColorFromMeasureGivenThresholds = (
    measure: number | undefined,
    thresholds: { okay: number; good: number },
    reversed?: boolean
): 'danger' | 'warn' | 'success' | 'light' => {
    if (!measure) {
        return 'light';
    }
    if (reversed) {
        measure *= -1;
        thresholds.good *= -1;
        thresholds.okay *= -1;
    }
    if (measure > thresholds.good) {
        return 'success';
    } else if (measure > thresholds.okay) {
        return 'warn';
    }
    return 'danger';
};

const ModelReponseTable: React.FC<{ evaluators: IDocumentationImageEvaluator[] }> = ({ evaluators }) => {
    return (
        <React.Fragment>
            <TextComponent color='white' fontWeight='bold'>
                Score
            </TextComponent>
            <TableHeader />
            {evaluators.map((evaluator, index) => {
                return (
                    <React.Fragment key={index}>
                        <TableRow
                            itemOne={evaluator.name}
                            itemTwo={{
                                text: evaluator.latestEvaluation
                                    ? Math.round(evaluator.latestEvaluation.similarity.similarity * 100) + '%'
                                    : '--%',
                                colorMarking: evaluateColorFromMeasureGivenThresholds(
                                    evaluator?.latestEvaluation?.similarity?.similarity,
                                    evaluator.similarityCalculator.acceptedMeasureThresholds
                                ),
                            }}
                            itemThree={{
                                text: evaluator.latestEvaluation
                                    ? Math.round(evaluator.latestEvaluation.similarity.responseTime) + 'ms'
                                    : '--ms',
                                colorMarking: evaluateColorFromMeasureGivenThresholds(
                                    evaluator?.latestEvaluation?.similarity?.responseTime,
                                    evaluator.similarityCalculator.acceptResponseTimeThresholds,
                                    true
                                ),
                            }}
                        />
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );
};

export default ModelReponseTable;
