import '@testing-library/jest-dom'
import 'whatwg-fetch';

jest.mock('@/services/api', () => ({
  api: {
    post: jest.fn()
  }
}))

global.fetch = jest.fn()