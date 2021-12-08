import { render, screen } from "@testing-library/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { mocked } from "ts-jest/utils";
import { getSession } from "next-auth/client";
import { getPrismicClient } from "../../services/prismic";



const post = {
    slug: 'my-new-post',
    title: 'My new post',
    content: '<p> post excerpt </p> ',
    updatedAt: '10 de Abril'
}

jest.mock('next-auth/client');
jest.mock('../../services/prismic');

describe('Post page', () => {

    it('renders correctly', () => {

        render(
            <Post post={post} />
        );

        expect(screen.getByText("My new post")).toBeInTheDocument();
        expect(screen.getByText("post excerpt")).toBeInTheDocument();

    });

    it('redirects user if no subscription is round', async () => {
        const getSessionMocked = mocked(getSession);

        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: null
        } as any)

        const response = await getServerSideProps({
            params: { slug: 'my-ny-post' }
        } as any);

        expect(response).toEqual(
            expect.objectContaining({
                redirect: expect.objectContaining({
                    destination: '/',
                })
            })
        )
    });

    it("loads initial data", async () => {
        const getSessionMocked = mocked(getSession);

        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: "fake-su"
        } as any)

        const getPrismicClientMocked = mocked(getPrismicClient);

        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [
                        { type: 'heading', text: 'My new post' }
                    ],
                    content: [
                        { type: 'paragraph', text: 'Post excerpt' }
                    ],
                },
                last_publication_date: '04-01-2021'
            })
        } as any);

        const response = await getServerSideProps({
            params: { slug: 'my-new-post' }
        } as any);


        expect(response).toEqual(
            expect.objectContaining({
                    props: {
                        post: {
                            slug: 'my-new-post',
                            title: 'My new post',
                            content: '<p>Post excerpt</p>',
                            updatedAt: '01 de abril de 2021'
                        }
                    }
                }
            )
        )


    })

});