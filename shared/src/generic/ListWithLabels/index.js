import React, {Fragment} from 'react'
import {compose, withPropsOnChange} from 'recompose'

// local libs
import {plainProvedGet as g, immutableProvedGet as ig} from 'src/App/helpers'

import {
    List,
    Label,
    Item,
    Link,
    Name,
    Quantity,
} from 'src/generic/ListWithLabels/assets'


const
    renderItem = (x, props, withKey = false) =>
        <Item key={withKey ? `${ig(x, props.id)}-item` : null}>
            <Link
                to={g(props, 'isArchive')
                    ? props.linkBuilder(ig(x, 'year'), ig(x, 'monthNumber'))
                    : props.linkBuilder(ig(x, 'subPage'))}
            >
                <Name>{ig(x, props.item)}</Name>
                <Quantity>{ig(x, 'itemsCount')}</Quantity>
            </Link>
        </Item>,

    renderItemOrLabel = (x, idx, props) =>
        (
            idx === 0 ||
            (idx !== 0 && ig(x, props.label) !== ig(g(props, 'list'), [(idx - 1), props.label]))
        )
            ? <Fragment key={`${ig(x, props.id)}-label`}>
                <Label>{ig(x, props.label)}</Label>
                {renderItem(x, props)}
            </Fragment>
            : renderItem(x, props, true),

    ListWithLabels = props =>
        <List itemsQuantity={g(props, 'itemsAndLabelsQuantity')}>
            {g(props, 'list').map((x, idx) => renderItemOrLabel(x, idx, props))}
        </List>

export default compose(
    withPropsOnChange(['list'], props => ({
        // getting without 'g'
        isArchive: props.isArchive ? true : false,
        id: props.isArchive ? 'archiveDate' : 'id',
        label: props.isArchive ? 'year' : 'letter',
        item: props.isArchive ? 'month' : 'name',
    })),
    withPropsOnChange(['list'], props => {
        const
            list = g(props, 'list'),
            lettersQuantity = g(
                list.map(x => ig(x, props.label)).toSet(),
                'size'
            )

        return {
            itemsAndLabelsQuantity: g(list, 'size') + lettersQuantity
        }
    }),
)(ListWithLabels)
