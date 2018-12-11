import {
    toPairs,
    map,
    pick,
} from 'lodash'

export default data => map(
    toPairs(
        pick(
            data,
            [
                'name', 'alias', 'profession',
                'country', 'ethnicity', 'color_eye', 'color_hair',
                'boobs_fake', 'height', 'weight', 'breast', 'cup_size',
                'shoe_size', 'tatoos', 'piercings', 'waist', 'breast'
            ]
        )
    ),
    x => ({
        key: x[0],
        value: x[1]
    })
)
