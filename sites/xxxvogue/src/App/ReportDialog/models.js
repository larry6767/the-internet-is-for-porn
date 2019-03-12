import {Record} from 'immutable'
import {ImmutablePropTypes, PropTypes} from '../helpers'

export const
    model = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exact({
        isSending: PropTypes.bool,
        isSent: PropTypes.bool,
        isNotSent: PropTypes.bool,
        currentHref: PropTypes.string,
        currentTime: PropTypes.string,
        isOpen: PropTypes.bool,
    }),

    galleryModel = process.env.NODE_ENV === 'production' ? null :
        ImmutablePropTypes.exactRecordOf({
            id: PropTypes.number,
            classId: PropTypes.number,
            title: PropTypes.string,
            sponsorName: PropTypes.string,
            sponsorUrl: PropTypes.string,
            published: PropTypes.string,
            thumb: PropTypes.string,
            duration: PropTypes.string,
        }),

    GalleryRecord = Record({
        id: 0,
        classId: 0,
        title: '',
        sponsorName: '',
        sponsorUrl: '',
        published: '',
        thumb: '',
        duration: '',
    })
