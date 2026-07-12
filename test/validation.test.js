import { isHt5074, isHt5075, isHt5101, isHt5179, isValidPeripheral } from '../lib/utils/validation.js'

describe('isHt5074', () => {
  it('returns true for matching 18-char hex with 88ec', () => {
    expect(isHt5074('xx88ecxxxxxxxxxxxx')).toBe(true)
  })

  it('returns false for 16-char hex with 88ec', () => {
    expect(isHt5074('xx88ecxxxxxxxx')).toBe(false)
  })

  it('returns false when 88ec is absent', () => {
    expect(isHt5074('xx0000xxxxxxxxxxxx')).toBe(false)
  })
})

describe('isHt5075', () => {
  it('returns true for matching 16-char hex with 88ec', () => {
    expect(isHt5075('xx88ecxxxxxxxxxx')).toBe(true)
  })

  it('returns false for 18-char hex with 88ec', () => {
    expect(isHt5075('xx88ecxxxxxxxxxxxx')).toBe(false)
  })

  it('returns false when 88ec is absent', () => {
    expect(isHt5075('xx0000xxxxxxxx')).toBe(false)
  })
})

describe('isHt5101', () => {
  it('returns true when hex includes 0100', () => {
    expect(isHt5101('xxxx0100xxxxxxxx')).toBe(true)
  })

  it('returns false when hex does not include 0100', () => {
    expect(isHt5101('xxxx0000xxxxxxxx')).toBe(false)
  })
})

describe('isHt5179', () => {
  it('returns true for matching 22-char hex with 0188', () => {
    expect(isHt5179('xx0188xxxxxxxxxxxxxxxx')).toBe(true)
  })

  it('returns false for 18-char hex with 0188', () => {
    expect(isHt5179('xx0188xxxxxxxxxxxx')).toBe(false)
  })

  it('returns false when 0188 is absent', () => {
    expect(isHt5179('xx0000xxxxxxxxxxxxxxxx')).toBe(false)
  })
})

describe('isValidPeripheral', () => {
  it('returns false when advertisement is missing', () => {
    expect(isValidPeripheral({})).toBe(false)
  })

  it('returns false when manufacturerData is missing', () => {
    expect(isValidPeripheral({ advertisement: {} })).toBe(false)
  })

  it('returns true for a valid H5074 peripheral', () => {
    const hex = '88ec1234567890abcd'
    const peripheral = {
      advertisement: {
        manufacturerData: Buffer.from(hex, 'hex'),
      },
    }
    expect(isValidPeripheral(peripheral)).toBe(true)
  })

  it('returns false for unknown peripheral', () => {
    const hex = '0000112233445566'
    const peripheral = {
      advertisement: {
        manufacturerData: Buffer.from(hex, 'hex'),
      },
    }
    expect(isValidPeripheral(peripheral)).toBe(false)
  })
})
