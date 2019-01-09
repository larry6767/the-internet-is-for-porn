export default (data, pageUrl, publishedTemplate) => {
    const
        publishedDate = new Date(Date.now() - data.published * 1000),
        years = publishedDate.getFullYear() - 1970,
        months = publishedDate.getMonth(),
        days = publishedDate.getDate(),
        hours = publishedDate.getHours(),
        minutes = publishedDate.getMinutes(),

        published = years && years === 1
            ? publishedTemplate.y[0]
            : years
            ? publishedTemplate.y[1].replace('%d', years)

            : months && months ===1
            ? publishedTemplate.m[0]
            : months
            ? publishedTemplate.m[1].replace('%d', months)

            : days && days === 1
            ? publishedTemplate.d[0]
            : days === 7
            ? publishedTemplate.w[0]
            : days === 14
            ? publishedTemplate.w[1].replace('%d', days / 7)
            : days === 21
            ? publishedTemplate.w[1].replace('%d', days / 7)
            : days === 28
            ? publishedTemplate.w[1].replace('%d', days / 7)
            : days
            ? publishedTemplate.d[1].replace('%d', days)

            : hours && hours === 1
            ? publishedTemplate.h[0]
            : hours
            ? publishedTemplate.h[1].replace('%d', hours)

            : minutes && minutes === 1
            ? publishedTemplate.m[0]
            : minutes
            ? publishedTemplate.m[1].replace('%d', minutes)

            : publishedTemplate.s[0]

    return {
        id: Number(data.id),
        classId: Number(data.id_class),
        title: data.title,
        urlForIframe: data.embed_code.match(/src="([\S]+)"/)[1],
        sponsorId: data.id_sponsor,
        sponsorUrl: data.url,
        published: published,

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
        duration: `${Math.floor(data.length / 60)}:${data.length % 60 < 10
            ? '0' + data.length % 60
            : data.length % 60}`,
    }
}
