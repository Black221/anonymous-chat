import { render, screen } from '@testing-library/react';
import App from '../app/App';
import {AppContextProvider} from "../app/context/AppContextProvider";

test('Test app', () => {
    render(
        <AppContextProvider>
            <App />
        </AppContextProvider>
    );


});
