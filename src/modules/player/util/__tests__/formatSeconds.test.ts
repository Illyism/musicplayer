import formatSeconds from '../formatSeconds'

test('formatSeconds', () => {
    expect(formatSeconds(90)).toBe('01:30')
    expect(formatSeconds(0)).toBe('00:00')
    expect(formatSeconds(60 * 60 * 60)).toBe('60:00:00')
})