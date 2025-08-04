import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        name: "title",
        property: 'og:title',
        content: 'BIG TONK™',
      },
      {
        name: "description",
        property: 'og:description',
        content: 'The official Big Tonka website',
      },
      {
        name: "image",
        property: 'og:image',
        content: 'https://img.bigtonk.com/tonkbanner.png',
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
