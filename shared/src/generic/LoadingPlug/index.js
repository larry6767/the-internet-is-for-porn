import {range} from 'lodash'
import React, {Fragment} from 'react'

// local libs
import PornstarListPlug from 'src/generic/PornstarList/PornstarListPlug'
import HomePlug from 'src/App/Home/HomePlug'
import AllNichesPlug from 'src/App/AllNiches/AllNichesPlug'
import PornstarInfoPlug from 'src/App/Pornstar/Info/PornstarInfoPlug'
import ControlBarPlug from 'src/generic/ControlBar/ControlBarPlug'
import VideoItemPlug from 'src/generic/VideoItem/VideoItemPlug'

import {Content, PageWrapper} from 'src/generic/assets'
import {VideoPlayerPlug} from 'src/App/VideoPage/assets'
import {ListsPlug} from 'src/generic/Lists/assets'
import {PageTitlePlug} from 'src/generic/LoadingPlug/assets'
import {VideoListPlug} from 'src/generic/VideoList/assets'

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
