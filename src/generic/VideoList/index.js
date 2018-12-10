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
                    id={x.get('id')}
                    thumb={x.get('thumb')}
                    title={x.get('title')}
                    sponsorId={x.get('sponsorId')}
                    tags={x.get('tags')}
                    tagsShort={x.get('tagsShort')}
                    urlRegular={x.get('urlRegular')}
                    favorite={x.get('favorite')}
                    duration={x.get('duration')}
                />
            )}
        </List>
    }

export default VideoList
