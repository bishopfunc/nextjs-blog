import styles from './layout.module.css'
import Image from 'next/image'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Head from 'next/head'

const name = 'bishopfunc';
export const siteTitle = 'bishopfunc Portfolio'

export default function Layout({ children, home }) {
  return (
  <div className={styles.container}>
    <Head>
      <link rel='icon' href='/favicon.ico'></link>
      <meta
          name="description"
          content="bishopfunc's Portfolio Site"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <header className={styles.header}>
      {home ? (
        <>
          <Image
            src="/images/profile.png"
            className={utilStyles.borderCircle}
            height={150}
            width={150}
            alt=""
          />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <Image
              src="/images/profile.png"
              className={utilStyles.borderCircle}
              height={150}
              width={150}
              alt=""
            />
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/" className={utilStyles.colorInherit}>
              {name}
            </Link>
          </h2>
        </>
      )}
    </header>
    <main>{children}</main>
    {/* home is flase  */}
    {!home && (
      <div className={styles.backToHome}>
        <Link href="/">← ホームに戻る</Link>
      </div>
    )}
  </div>)
}