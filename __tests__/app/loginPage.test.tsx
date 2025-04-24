import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignUpPage from '@/app/signup/page'
import { api } from '@/services/api'

jest.mock('@/services/api', () => ({
  api: {
    post: jest.fn()
  }
}))

global.fetch = jest.fn()

describe('SignUpPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be possible to render the registration form', () => {
    render(<SignUpPage />)

    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
    expect(screen.getByText('Registrar-se')).toBeInTheDocument()
    expect(screen.getByText('Já tem conta? Faça login')).toBeInTheDocument()
  })

  it('should submit the form correctly', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ message: 'User created successfully' })
    })

    render(<SignUpPage />)

    const nameInput = screen.getByPlaceholderText('Nome')
    const emailInput = screen.getByPlaceholderText('E-mail')
    const passwordInput = screen.getByPlaceholderText('Senha')
    const submitButton = screen.getByText('Registrar-se')

    await userEvent.type(nameInput, 'João Paulo')
    await userEvent.type(emailInput, 'joao@example.com')
    await userEvent.type(passwordInput, 'senha123')


    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/signup', {
        user: {
          name: 'João Paulo',
          email: 'joao@example.com',
          password: 'senha123'
        }
      })
    })
  })
})
