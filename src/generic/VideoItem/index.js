import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {
    Typography
} from '@material-ui/core'
import Favorite from '@material-ui/icons/FavoriteBorder'
import {
    Wrapper,
    VideoPreview,
    VideoPreviewBar,
    InfoBlock,
    InfoBlockInner,
    Like,
    Duration,
} from './assets'

const
    styles = theme => ({
        typography: {
            color: theme.palette.primary.contrastText
        }
    }),

    VideoItem = ({classes}) => <Wrapper>
        <VideoPreview>
            <VideoPreviewBar>
                <Like>
                    <Favorite/>
                </Like>
                <Duration>
                    <Typography
                        variant="body2"
                        classes={{
                            root: classes.typography
                        }}
                    >
                        12:23
                    </Typography>
                </Duration>
            </VideoPreviewBar>
        </VideoPreview>
        <InfoBlock>
            <Typography variant="body1">some name</Typography>
            <InfoBlockInner>
                <Typography variant="body2">resourse</Typography>
                <Typography variant="body2">category</Typography>
            </InfoBlockInner>
        </InfoBlock>
    </Wrapper>

export default withStyles(styles)(VideoItem)
