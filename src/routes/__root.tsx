import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'The official Big Tonka website',
      },
      {
        title: 'BIG TONK™',
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
