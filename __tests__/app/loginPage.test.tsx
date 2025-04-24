import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '@/app/login/page'
import { api } from '@/services/api'

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the email and password fields', () => {
    render(<LoginPage />)

    expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('should call the API with the correct data when submitting the form', async () => {
    render(<LoginPage />)

    fireEvent.input(screen.getByPlaceholderText(/e-mail/i), {
      target: { value: 'teste@email.com' },
    })
    fireEvent.input(screen.getByPlaceholderText(/senha/i), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/login', {
        user: {
          email: 'teste@email.com',
          password: '123456',
        },
      })
    })
  })
})
