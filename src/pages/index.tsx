import Head from 'next/head';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import avatarSvg from '../../public/images/avatar.svg';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss';
import { stripe } from '../services/stripe';

interface Homeprops {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: Homeprops) {


  return (
    <>
      <Head>
        <title>Início | ignews </title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome!</span>
          <h1>News about the <span>React</span> world,</h1>
          <p>
            Get access to all to the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image src={avatarSvg} alt="Girl coding" />
      </main>


    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1JIgiEBkB30Tu6yMqLbnxKmE', {
    expand: ['product'] // se precisar acessar outro produto, para add tabela de prices
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format((price.unit_amount / 100)) // trabalhar em centavos

  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 //24 hours
  }
}
