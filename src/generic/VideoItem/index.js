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
        },
        typographyTitle: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            cursor: 'help',
        },
        typographyTags: {
            cursor: 'help',
        },
        favoriteIcon: {
            transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
            '&:hover': {
                color: 'red',
                width: '1.1em',
                height: '1.1em',
                position: 'relative',
                top: '-0.05em',
                left: '-0.05em',
            }
        }
    }),

    VideoItem = ({
        classes,
        thumb,
        title,
        sponsorid,
        tags,
        tagsShort,
        urlRegular,
        favorite,
        duration,
    }) => <Wrapper>
        <VideoPreview thumb={thumb}>
            <VideoPreviewBar>
                <Like>
                    <Favorite classes={{root: classes.favoriteIcon}}/>
                </Like>
                <Duration>
                    <Typography
                        variant="body2"
                        classes={{
                            root: classes.typography
                        }}
                    >
                        {`${Math.floor(duration / 60)}:${
                            duration % 60 < 10 ? '0' + duration % 60 : duration % 60}`}
                    </Typography>
                </Duration>
            </VideoPreviewBar>
        </VideoPreview>
        <InfoBlock>
            <Typography
                variant="body1"
                classes={{
                    root: classes.typographyTitle
                }}
                title={title}
            >
                {title}
            </Typography>
            <InfoBlockInner>
                <Typography variant="body2">pornSharing</Typography>
                <Typography
                    variant="body2"
                    classes={{
                        root: classes.typographyTags
                    }}
                    title={tags.join(', ')}
                >
                    {tagsShort}
                </Typography>
            </InfoBlockInner>
        </InfoBlock>
    </Wrapper>

export default withStyles(styles)(VideoItem)
