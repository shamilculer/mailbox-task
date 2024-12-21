import { PublicClientApplication, InteractionRequiredAuthError } from '@azure/msal-browser';
import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
    auth: {
        clientId: import.meta.env.VITE_GRAPH_CLIENT_ID,
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: 'http://localhost:5173', 
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
    }
};

export const loginRequest = {
    scopes: ['mail.Read']
};

const msalInstance = new PublicClientApplication(msalConfig);

export const initializeMsal = async () => {
    await msalInstance.initialize();
};

export const acquireToken = async (): Promise<string | void> => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        try {
            const response = await msalInstance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0]
            });
            return response.accessToken;
        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                const response = await msalInstance.acquireTokenPopup(loginRequest);
                return response.accessToken;
            } else {
                console.error(error);
            }
        }
    } else {
        await msalInstance.loginPopup(loginRequest);
        return acquireToken();
    }
};