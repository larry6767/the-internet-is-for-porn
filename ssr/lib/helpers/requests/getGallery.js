export default (data, pageUrl) => ({
    id: Number(data.id),
    title: data.title,
    urlForIframe: data.embed_code.match(/src="([\S]+)"/)[1],
    sponsorId: data.sponsor_id,

    // The following data is used for ADD_VIDEO_TO_FAVORITE action:
    thumb: data.thumb_url,
    thumbMask: data.thumb_url.replace(/-\d+.jpg/, '-{num}.jpg'),
    thumbs: data.thumbs,
    tags: data.tags,
    // This is for very small string under a video preview,
    // it's usually only one single tag.
    tagsShort: data.tags.reduce((acc, tag) => {
        const newAcc = acc === '' ? tag : `${acc}, ${tag}`
        return newAcc.length <= 22 ? newAcc : acc
    }, ''),
    url: pageUrl.slice(0, pageUrl.indexOf('.htm')),
})
