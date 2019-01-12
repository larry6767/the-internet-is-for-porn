import React from 'react'

import {immutableProvedGet as ig} from '../../App/helpers'
import VideoItem from '../VideoItem'
import {List} from './assets'

const
    VideoList = ({videoList}) => <List>
        {videoList.map(x => <VideoItem key={ig(x, 'id')} x={x}/>)}
    </List>

export default VideoList
