# Citizen Directory

A directory of Nation3 Citizens and their profiles

## Environment Variables

### GitHub OAuth App

How to create a new OAuth App:

1. Go to https://github.com/organizations/nation3/settings/applications

1. Click "New OAuth App"

   - Application name: Nation3 Citizen Directory

   - Homepage URL: https://citizens.nation3.org

   - Authorization callback URL: https://citizens.nation3.org

### `.env.local`

Add the GitHub environment variables to `.env.local`:

```
cp .env.local.sample .env.local
```

## Build

```
npm install
npm run lint
npm run build
npm run dev
```

Go to http://localhost:3000

## Integration Testing

Run the integration tests:
```
npm run cy:open
```

Run the integration tests headlessly:
```
npm run cy:run
```
