import {ImmutablePropTypes, PropTypes} from 'src/App/helpers'

const
    pornstarItemModelBuilder = process.env.NODE_ENV === 'production' ? null : isImmutable => {
        const
            exact = isImmutable ? ImmutablePropTypes.exact : PropTypes.exact

        return exact({
            id: PropTypes.number,
            name: PropTypes.string,
            subPage: PropTypes.string,
            thumb: PropTypes.string,
            itemsCount: PropTypes.number,
        })
    }

export const
    pornstarItemModel = process.env.NODE_ENV === 'production' ? null :
        pornstarItemModelBuilder(false),
    immutablePornstarItemModel = process.env.NODE_ENV === 'production' ? null :
        pornstarItemModelBuilder(true)
