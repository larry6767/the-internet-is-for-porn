export default (data) => ({
    id: Number(data.id),
    title: data.title,
    urlForIframe: data.embed_code.match(/src="([\S]+)"/)[1],
    sponsorId: data.sponsor_id,
})
