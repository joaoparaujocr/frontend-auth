import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { api } from './services/api'

const forProfile = async (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/signup', request.url))
    }

    const response = await api.get('/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    console.log(response.status)

    if (response.status !== 200) {
      return NextResponse.redirect(new URL('/signup', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error(error)
    return NextResponse.redirect(new URL('/signup', request.url))
  }
}

const forSignUpOrLogin = async (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.next()
    }

    const response = await api.get('/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.status !== 200) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/profile', request.url))
  } catch (error) {
    console.error(error)
    return NextResponse.next()
  }
}

type RouteFunctions = {
  '/profile': typeof forProfile,
  '/signup': typeof forSignUpOrLogin,
  '/login': typeof forSignUpOrLogin
}

const functionForRoutes: RouteFunctions = {
  '/profile': forProfile,
  '/signup': forSignUpOrLogin,
  '/login': forSignUpOrLogin
}


export async function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname as keyof RouteFunctions

  const handler = functionForRoutes[pathname]

  if (handler) {
    return handler(request)
  } else {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/profile', '/signup']
}
