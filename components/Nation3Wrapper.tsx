import {
  CurrencyDollarIcon,
  HomeIcon,
  LockClosedIcon,
  NewspaperIcon,
  PlusIcon,
  Squares2X2Icon,
  UserPlusIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { Nation3App, DefaultLayout, DefaultSidebar } from '@nation3/components'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import {
  appDomain,
  balancerDomain,
  etherscanDomain,
  nationToken,
} from '../lib/config'

function Nation3Wrapper({
  children,
}: {
  children: React.ReactElement | React.ReactElement[]
}) {
  const { address, connector } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <Nation3App>
      <DefaultLayout
        sidebar={
          <DefaultSidebar
            onConnect={(connector) => {
              connect({
                connector: connectors.find((i) => i.name === connector.name),
              })
            }}
            logo={<img src="/logo.svg" alt="Nation3 Logo" />}
            onRoute={console.log}
            navLinks={[
              {
                route: `${appDomain}`,
                icon: <Squares2X2Icon className="w-5 h-5" />,
                name: 'Start',
              },
              {
                route: '/',
                name: 'Citizen directory',
                icon: <UsersIcon className="h-5 w-5" />,
                isActive: true,
              },
              {
                route: `${appDomain}/join`,
                name: 'Become a citizen',
                icon: <UserPlusIcon className="h-5 w-5" />,
              },
              {
                route: `${appDomain}/lock`,
                name: 'Lock tokens',
                icon: <LockClosedIcon className="h-5 w-5" />,
              },
              {
                route: `${appDomain}/liquidity`,
                name: 'Liquidity rewards',
                icon: <CurrencyDollarIcon className="h-5 w-5" />,
              },
              {
                route: `${balancerDomain}/#/trade/ether/${nationToken}`,
                name: 'Buy $NATION',
                icon: <PlusIcon className="h-5 w-5" />,
              },
              {
                route: 'https://nation3.org',
                name: 'Homepage',
                icon: <HomeIcon className="h-5 w-5" />,
              },
              {
                route: 'https://wiki.nation3.org',
                name: 'Wiki',
                icon: <NewspaperIcon className="h-5 w-5" />,
              },
            ]}
            connectors={connectors.map((connector) => ({
              ...connector,
            }))}
            account={
              address && connector
                ? {
                    address,
                    connector,
                  }
                : undefined
            }
            onDisconnect={disconnect}
          />
        }
      >
        {children}
      </DefaultLayout>
    </Nation3App>
  )
}

export default Nation3Wrapper
