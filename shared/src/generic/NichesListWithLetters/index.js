import React, {Fragment} from 'react'
import {compose, withHandlers, withPropsOnChange} from 'recompose'

// local libs
import {plainProvedGet as g, immutableProvedGet as ig} from 'src/App/helpers'
import routerGetters from 'src/App/routerGetters'

import {
    NichesList,
    Letter,
    Niche,
    NicheLink,
    Name,
    Quantity,
} from 'src/generic/NichesListWithLetters/assets'


const
    renderNiche = (x, nicheLinkBuilder, withKey = false) =>
        <Niche key={withKey ? `${ig(x, 'id')}-niche` : null}>
            <NicheLink to={nicheLinkBuilder(ig(x, 'subPage'))}>
                <Name>{ig(x, 'name')}</Name>
                <Quantity>{ig(x, 'itemsCount')}</Quantity>
            </NicheLink>
        </Niche>,

    renderNicheOrLetter = (x, idx, arr, nicheLinkBuilder) =>
        (idx === 0 || (idx !== 0 && ig(x, 'letter') !== ig(arr, [(idx - 1), 'letter'])))
            ? <Fragment key={`${ig(x, 'id')}-letter`}>
                <Letter>{ig(x, 'letter')}</Letter>
                {renderNiche(x, nicheLinkBuilder)}
            </Fragment>
            : renderNiche(x, nicheLinkBuilder, true),

    NicheListWithLetters = props =>
        <NichesList itemsQuantity={g(props, 'nichesAndLettersQuantity')}>
            {g(props, 'nichesListWithLetter').map((x, idx) => renderNicheOrLetter(
                x,
                idx,
                g(props, 'nichesListWithLetter'),
                g(props, 'nicheLinkBuilder'),
            ))}
        </NichesList>

export default compose(
    withPropsOnChange(['nichesListWithLetter'], props => {
        const
            nichesList = g(props, 'nichesListWithLetter'),
            lettersQuantity = g(
                nichesList.map(x => ig(x, 'letter')).toSet(),
                'size'
            )

        return {
            nichesAndLettersQuantity: g(nichesList, 'size') + lettersQuantity
        }
    }),
    withHandlers({
        nicheLinkBuilder: props => child => routerGetters.niche.link(
            g(props, 'routerContext'),
            g(child, []),
            null
        ),
    })
)(NicheListWithLetters)
