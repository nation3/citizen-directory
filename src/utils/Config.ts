const getEnvironmentVariable = (environmentVariable : string): string => {
    console.log('getEnvironmentVariable', environmentVariable)
    const variable = process.env[environmentVariable]
    if (!variable) {
        throw new Error(`Missing variable: "${environmentVariable}"`)
    } else {
        return variable
    }
}

export const config = {
    gitHubCallbackBaseUrl: getEnvironmentVariable('GITHUB_CALLBACK_BASE_URL'),
    gitHubClientId: getEnvironmentVariable('GITHUB_CLIENT_ID'),
    gitHubClientSecret: getEnvironmentVariable('GITHUB_CLIENT_ID')
}
console.log('config:', config)
