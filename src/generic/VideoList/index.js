import React from 'react'
import VideoItem from '../VideoItem'
import {
    List,
} from './assets'

const
    VideoList = ({videoList}) => {
        return <List>
            {videoList.map(x =>
                <VideoItem
                    key={x.get('id')}
                    x={x}
                />
            )}
        </List>
    }

export default VideoList
