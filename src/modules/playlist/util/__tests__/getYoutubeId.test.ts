import getYoutubeId from '../getYoutubeId'

test('getYoutubeId', () => {
    expect(getYoutubeId('http://youtube.com/watch?v=iwGFalTRHDA')).toBe('iwGFalTRHDA')
    expect(getYoutubeId('http://www.youtube.com/watch?v=iwGFalTRHDA&feature=related')).toBe('iwGFalTRHDA')
    expect(getYoutubeId('http://youtu.be/n17B_uFF4cA')).toBe('n17B_uFF4cA')
    expect(getYoutubeId('http://www.youtube.com/watch?v=t-ZRX8984sc')).toBe('t-ZRX8984sc')
    expect(getYoutubeId('http://www.youtube.com/embed/watch?feature=player_embedded&v=r5nB9u4jjy4')).toBe('r5nB9u4jjy4')
    expect(getYoutubeId('http://youtu.be/t-ZRX8984sc')).toBe('t-ZRX8984sc')

    // these are not video links
    // tslint:disable-next-line:max-line-length
    expect(getYoutubeId('https://www.youtube.com/channel/UCDZkgJZDyUnqwB070OyP72g')).not.toBe('UCDZkgJZDyUnqwB070OyP72g')
    expect(getYoutubeId('https://youtube.com/channel/UCDZkgJZDyUnqwB070OyP72g')).not.toBe('UCDZkgJZDyUnqwB070OyP72g')
    expect(getYoutubeId('https://youtube.com/iwGFalTRHDA')).not.toBe('iwGFalTRHDA')
    expect(getYoutubeId('youtube.com/iwGFalTRHDA')).not.toBe('iwGFalTRHDA')
    expect(getYoutubeId('youtube.com/n17B_uFF4cA')).not.toBe('n17B_uFF4cA')
    expect(getYoutubeId('http://redtube.com/t-ZRX8984sc')).not.toBe('t-ZRX8984sc')
})
