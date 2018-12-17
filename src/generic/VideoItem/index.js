import React, {Component} from 'react'
import {replace} from 'lodash'
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
    VideoPreviewThumbs,
    LoadingProgress,
} from './assets'
import {muiStyles} from './assets/muiStyles'
import {setCookie} from '../../App/helpers'

class PreviewThumbs extends Component {
    state = {
        currentThumb: 0,
        showed: false,
    }

    mouseEnter = () => {
        const
            imageArray = [],
            {thumbsLinks} = this.props

        thumbsLinks.forEach(x => {
            const image = new Image()
            image.src = x
            imageArray.push(image)
        })

        this.timeoutTimer = setTimeout(() => {
            this.intervalTimer = setInterval(this.progress, 500)
            this.setState({showed: true})
        }, 1000)
    }

    mouseLeave = () => {
        clearInterval(this.timeoutTimer)
        clearInterval(this.intervalTimer)
        this.setState({
            currentThumb: 0,
            showed: false,
        })
    }

    progress = () => {
        const
            {currentThumb} = this.state,
            {thumbsLinks} = this.props

        this.setState({currentThumb: thumbsLinks.size - 1 > currentThumb
            ? currentThumb + 1
            : 0
        })
    }

    render() {
        const
            {thumbsLinks} = this.props

        return <VideoPreviewThumbs
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
            thumb={thumbsLinks.get(this.state.currentThumb)}
            showed={this.state.showed}
        />
    }
}

const
    VideoItem = ({
        classes,
        id,
        thumb,
        thumbMask,
        thumbs,
        title,
        sponsorId,
        tags,
        tagsShort,
        urlRegular,
        favorite,
        duration,
    }) => {
        const
            thumbsLinks = thumbs.map(x => replace(thumbMask, '{num}', x))

        return <Wrapper>
            <VideoPreview
                thumb={thumb}
            >
                <LoadingProgress/>
                <PreviewThumbs
                    thumbsLinks={thumbsLinks}
                />
                <VideoPreviewBar>
                    <Like onClick={setCookie('mcj_fav', `F${id}F`, 3600)}>
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
                    <Typography
                        variant="body2"
                        classes={{
                            root: classes.typographySource
                        }}
                    >
                        {sponsorId}
                    </Typography>
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
    }

export default withStyles(muiStyles)(VideoItem)
