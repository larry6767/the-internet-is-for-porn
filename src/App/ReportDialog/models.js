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
    // TODO get rid of 'isOptional'
    galleryModel = process.env.NODE_ENV === 'production' ? null : ImmutablePropTypes.exactRecordOf({
        id: PropTypes.number.isOptional,
        classId: PropTypes.number.isOptional,
        title: PropTypes.string.isOptional,
        sponsorName: PropTypes.string.isOptional,
        sponsorUrl: PropTypes.string.isOptional,
        published: PropTypes.string.isOptional,
        thumb: PropTypes.string.isOptional,
        duration: PropTypes.string.isOptional,
    }),

    GalleryRecord = Record({
        id: null,
        classId: null,
        title: null,
        sponsorName: null,
        sponsorUrl: null,
        published: null,
        thumb: null,
        duration: null,
    })
