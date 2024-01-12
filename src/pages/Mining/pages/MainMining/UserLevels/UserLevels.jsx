import React from 'react';

import '../../../assets/fonts/benzin-bold.ttf'
import '../../../assets/fonts/benzin-semibold.ttf'

import Stories from 'react-insta-stories';
import frame1 from '../../../assets/UserLevels/laptop.mp4'
import frame2 from '../../../assets/UserLevels/phone.mp4'
import frame3 from '../../../assets/UserLevels/stas.png'
import frame4 from '../../../assets/UserLevels/dsar.png'
import frame5_1 from '../../../assets/UserLevels/Frame 1.png'
import frame5_2 from '../../../assets/UserLevels/Frame 2.png'

const StoryComponent = () => {
    const storyData = [
        {url: frame1, type: 'video', duration: 10000},
        {url: frame2, type: 'video', duration: 10000},
        {url: frame3, duration: 10000},
        {url: frame4, duration: 10000}
    ];

    return (
        <>
            <Stories
                stories={storyData}
                defaultInterval={1500}
                width={'100%'}
                height={'100%'}
            />
        </>
    );
}

export default StoryComponent;
