import React from 'react';
import HomeTemplate from '../TemplateLayout/HomeTemplate';

type Props = {};

const Home: React.FC<Props> = () => {
    return (
        <HomeTemplate
            HeaderComponent={<></>}
            ImageContainer1={<></>}
            ImageContainer2={<></>}
            FeedbackMethodSelector={<></>}
            FeedbackScoreOverview={<></>}
        />
    );
};

export default Home;
