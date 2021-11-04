
import styles from "./home.module.scss";
import Head from 'next/head'
import { SubscribeButton } from "../components/SubscribeButton";
import { GetServerSideProps } from 'next';
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps ) {
  return (
    <>
      <Head>
        <title>ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, welcome </span>
          <h1> News about the <span>React</span> world. </h1>
          <p>
            Get access to all the publications <br />
            <span>for { product.amount }month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />version
      </main>

    </>
  )
}


export const getServerSidePropsContext: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1Js3khDv7iYMduH6WY7IWsBM', {
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100)
  }
  return {
    props: {
      product
    }
  }
}
