// client/routes.tsx
import { RouteObject } from 'react-router'
import Layout from './src/components/Layout'
import Factions from './src/components/Factions'
import ArmyBuilder from './src/components/ArmyBuilder'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      // Homepage: faction selection
      { index: true, element: <Factions /> },

      // Army builder route with dynamic faction param
      {
        path: 'builder/:faction',
        element: <ArmyBuilder />, // ArmyBuilder reads faction via useParams
      },

      // Optional: add a catch-all 404 route
      {
        path: '*',
        element: <p>Page not found</p>,
      },
    ],
  },
]

export default routes
