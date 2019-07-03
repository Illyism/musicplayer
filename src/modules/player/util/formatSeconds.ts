export default function formatSeconds(secs: number) {
    const hours = Math.floor(secs / 3600)
    let mins

    if (hours) {
        mins = Math.floor((secs / 60) - hours * 60)
        secs = Math.floor(secs % 60)
        return `${String('0' + hours).slice(-2)}:${String('0' + mins).slice(-2)}:${String('0' + secs).slice(-2)}`
    }

    mins = Math.floor(secs / 60)
    secs = Math.floor(secs % 60)
    return `${String('0' + mins).slice(-2)}:${String('0' + secs).slice(-2)}`
}