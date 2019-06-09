// tslint:disable-next-line: max-line-length
const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|attribution_link\?a=.+?watch.+?v(?:%|=)))((\w|-){11})(?:\S+)?$/

export default function getYoutubeId(url?: string) {
    if (!url) {
        return null
    }

    const matches = regex.exec(url)
    if (!matches || !matches[1]) {
        return null
    }

    return matches[1]
}