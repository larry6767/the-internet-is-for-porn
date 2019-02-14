import {range} from 'lodash'
import React from 'react'

import ControlBarPlug from '../ControlBar/ControlBarPlug'
import VideoItemPlug from '../VideoItem/VideoItemPlug'

import {Content, PageWrapper} from '../assets'
import {ListsPlug} from '../Lists/assets'
import {PageTitlePlug} from './assets'
import {VideoListPlug} from '../VideoList/assets'

const
    LoadingPlug = ({withLists}) => <Content>
        {!withLists ? null : <ListsPlug/>}
        <PageWrapper>
            <PageTitlePlug/>
            <ControlBarPlug/>
            <VideoListPlug>
                {range(0, 20).map(x => <VideoItemPlug key={`${x}-VideoItemPlug`}/>)}
            </VideoListPlug>
        </PageWrapper>
    </Content>

export default LoadingPlug
