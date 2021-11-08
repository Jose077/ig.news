import  Head  from "next/head";
import styles from './styles.module.scss';
import Prismic from '@prismicio/client'
import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";


export default function Posts() {
    return(
        <> 
            <Head>
                <title> Posts | Ignews </title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time> 12 de março de 2021 </time>
                        <strong>
                            Creating a Monorepo with Lerna & Yarn workspace
                        </strong>

                        <p> In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared</p>
                    </a>
                    
                    <a href="#">
                        <time> 12 de março de 2021 </time>
                        <strong>
                            Creating a Monorepo with Lerna & Yarn workspace
                        </strong>

                        <p> In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared</p>
                    </a >

                    <a href="#">
                        <time> 12 de março de 2021 </time>
                        <strong>
                            Creating a Monorepo with Lerna & Yarn workspace
                        </strong>

                        <p> In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared</p>
                    </a>
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query(
        [
            Prismic.predicates.at('document.type', 'publication')
        ],{
            fetch: ['publication.title', 'publication.content']
        }
    );

    console.log(response);
    

    return {
        props: {}
    }
}

