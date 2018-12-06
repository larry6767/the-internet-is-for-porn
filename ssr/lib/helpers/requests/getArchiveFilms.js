export default (data) => data
    ? {
        current: data.ACTIVE,
        monthForLink: data.URL
            .slice(
                data.URL.lastIndexOf('/') + 1,
                data.URL.lastIndexOf('-archive.html')
            )
    } : undefined
