import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        title: 'BIG TONK™',
      },
      {
        name: 'og:title',
        content: 'BIG TONK™',
      },
      {
        name: 'description',
        content: 'The official Big Tonka website',
      },
      {
        name: 'og:description',
        content: 'The official Big Tonka website',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: 'public/favicon.ico'
      }
    ],
  }),
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
