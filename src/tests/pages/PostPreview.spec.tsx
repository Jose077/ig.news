import { render, screen, waitFor } from "@testing-library/react";
import Post from "../../pages/posts/preview/[slug]";
import { mocked } from "ts-jest/utils";
import {  useSession } from "next-auth/client";
import { useRouter } from "next/router";



const post = {
    slug: 'my-new-post',
    title: 'My new post',
    content: '<p> post excerpt </p> ',
    updatedAt: '10 de Abril'
}

jest.mock('next-auth/client');
// jest.mock('../../services/prismic');
jest.mock('next/router')

describe('Post preview page', () => {

    it('renders correctly', () => {
        const useSessionMocked = mocked(useSession);

        useSessionMocked.mockReturnValueOnce([null, false])

        render(
            <Post post={post} />
        );

        expect(screen.getByText("My new post")).toBeInTheDocument();
        expect(screen.getByText("post excerpt")).toBeInTheDocument();
        expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
    });

    it('redirects user to full post when user is subscribe', async () => {
        const useSessionMocked = mocked(useSession);
        const useRouterMocked = mocked(useRouter);
        const pushMock = jest.fn();

        useSessionMocked.mockReturnValueOnce([
            { activeSubscription: 'fake-active-subscription' },
            false
        ] as any);

        useRouterMocked.mockReturnValueOnce({
            push: pushMock,
        } as any);

        render(<Post post={post} />);
        
        await waitFor(() => {
            screen.logTestingPlaygroundURL()

            expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
        })


    });


});