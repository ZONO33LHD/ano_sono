// ano_sono/frontend/ano_sono/src/pages/_app.tsx
import '../app/globals.css'
import type { AppProps } from 'next/app'
import NextAuthProvider from '../providers/NextAuth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider>
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp