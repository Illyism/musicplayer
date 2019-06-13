// tslint:disable-next-line: max-line-length
const regex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/

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