const dialogTitle = 'Have you found a problem on the site? \
    Please use this form to help us to fix it, or contact us directly'

const dialogSuccesText = 'Thank you for your report. We will review it soon'

const dialogFailedText = 'Something went wrong. Try again later'

const dialogText = 'Take Note of: Our website is a completely automatic adult search \
    engine focused on videos clips. We do not possess, produce, distribute \
    or host any movies. All linked clips are automatically gathered and \
    added into our system by our spider script. Thumbnails are \
    auto-generated from the outside video contributors. All of the video \
    content performed on our site are hosted and created by other websites \
    that are not under our control. By your request we can remove \
    thumbnail and link to the video, but not the original video file.'

const radioButtons = {
    reason_other: 'Other',
    reason_deleted: 'Movie has been deleted',
    reason_doesnt_play: 'Movie doesn\'t play',
    reason_bad_thumb: 'Low quality of the thumbnail',
    reason_young: 'Person on the thumbnail looks too young',
    reason_incest: 'Incest',
    reason_animals: 'Beastiality (sex with animals)',
    reason_other_scat: 'Other inappropriate content (rape, blood, scat, etc...)',
    reason_copyright: 'Copyright violation',
}

export default {
    dialogTitle,
    dialogSuccesText,
    dialogFailedText,
    dialogText,
    radioButtons,
}
