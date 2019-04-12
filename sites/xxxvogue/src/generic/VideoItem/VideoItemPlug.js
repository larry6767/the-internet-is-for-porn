import React from 'react'

//local libs
import {plainProvedGet as g} from 'src/App/helpers'

import {
    Wrapper,
    InfoBlock,
    InfoBlockInner,
    VideoPreviewPlug,
    TitlePlug,
    ProviderLinkPlug,
    TagsPlug,
} from 'src/generic/VideoItem/assets'

const
    VideoItemPlug = props => <Wrapper style={g(props, 'style')}>
        <VideoPreviewPlug/>
        <InfoBlock>
            <TitlePlug/>
            <InfoBlockInner>
                <ProviderLinkPlug/>
                <TagsPlug/>
            </InfoBlockInner>
        </InfoBlock>
    </Wrapper>

export default VideoItemPlug
