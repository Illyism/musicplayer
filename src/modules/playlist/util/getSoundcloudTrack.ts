import { RawPostData } from '@/typings/reddit';
import { getSoundcloudTrackJSON } from '@/api';

export async function getSoundcloudTrack(post?: RawPostData | null) {
    if (!post) {
        throw new Error('No soundcloud track provided')
    }

    if (!post.media || !post.media.oembed) {
        throw new Error('Soundcloud post not playable')
    }

    const track = post.media.oembed
    const url = decodeURIComponent(decodeURIComponent(track.html))

    const { type, id } = getSoundcloudTrackTypeAndId(url)
    if (!type || !id) {
        throw new Error('Could not find soundcloud track type and id: ' + url)
    }

    const soundcloudTrack = await getSoundcloudTrackJSON(type, id)
    if (!soundcloudTrack.streamable) {
        throw new Error('Soundcloud track not streamable')
    }

    return soundcloudTrack
}

function getSoundcloudTrackTypeAndId(url: string) {
    const userId = url.match(/\/users\/(\d+)/)
    if (userId) {
        return {
            type: 'users',
            id: userId[1],
        }
    }

    const trackId = url.match(/\/tracks\/(\d+)/)
    if (trackId) {
        return {
            type: 'tracks',
            id: trackId[1],
        }
    }

    const playListId = url.match(/\/playlists\/(\d+)/)
    if (playListId) {
        return {
            type: 'playlists',
            id: playListId[1],
        }
    }

    return {
        type: null,
        id: null,
    }
}