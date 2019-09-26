export interface SoundcloudTrack {
    kind: 'track' | 'playlist';
    track_count: number;
    uri: string;
    streamable: boolean;
}

export interface SoundcloudProgressData {
    currentPosition: number;
    loadedProgress: number;
}