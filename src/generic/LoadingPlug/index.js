import {range} from 'lodash'
import React, {Fragment} from 'react'

import PornstarListPlug from '../PornstarList/PornstarListPlug'
import HomePlug from '../../App/Home/HomePlug'
import AllNichesPlug from '../../App/AllNiches/AllNichesPlug'
import PornstarInfoPlug from '../../App/Pornstars/Pornstar/Info/PornstarInfoPlug'
import ControlBarPlug from '../ControlBar/ControlBarPlug'
import VideoItemPlug from '../VideoItem/VideoItemPlug'

import {Content, PageWrapper} from '../assets'
import {VideoPlayerPlug} from '../../App/VideoPage/assets'
import {ListsPlug} from '../Lists/assets'
import {PageTitlePlug} from './assets'
import {VideoListPlug} from '../VideoList/assets'

const
    LoadingPlug = ({
        isHome, isAllNiches,
        withLists, withPlayer, withPornstarInfo, withControlBar, withMoviesList, withPornstarList,
    }) => <Content>
        {withLists ? <ListsPlug/> : null}
        <PageWrapper>
            <PageTitlePlug/>

            {/* specific pages */}
            {isHome ? <HomePlug/> : null}
            {isAllNiches ? <AllNichesPlug/> : null}

            {/* common pages with custom parameters */}
            {withPornstarList && withControlBar ? <ControlBarPlug/> : null}
            {withPornstarList ? <PornstarListPlug/> : null}
            {!withMoviesList ? null :
                <Fragment>
                    {withPlayer ? <VideoPlayerPlug/> : null}
                    {withPornstarInfo ? <PornstarInfoPlug/> : null}
                    {withControlBar ? <ControlBarPlug/> : null}
                    <VideoListPlug>
                        {range(0, 20).map(x => <VideoItemPlug key={`${x}-VideoItemPlug`}/>)}
                    </VideoListPlug>
                </Fragment>}
        </PageWrapper>
    </Content>

export default LoadingPlug
