import {ScrollViewStyleReset} from 'expo-router/html';
import type {PropsWithChildren} from 'react';

export default function Root({children}: PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <meta name="color-scheme" content="light dark"/>

                <script dangerouslySetInnerHTML={{__html: `(function(){if(window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.classList.add('dark')}})();`}}/>

                <ScrollViewStyleReset/>

                <style dangerouslySetInnerHTML={{__html: `
                    #loader {
                        position: fixed;
                        inset: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: hsl(0, 0%, 100%);
                        z-index: 99999;
                    }
                    .dark #loader {
                        background-color: hsl(200, 9%, 9%);
                    }
                    #loader .spinner {
                        width: 40px;
                        height: 40px;
                        border: 3px solid transparent;
                        border-top-color: hsl(29, 89%, 55%);
                        border-radius: 50%;
                        animation: spin 0.8s linear infinite;
                    }
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}}/>
            </head>
            <body>
                <div id="loader">
                    <div className="spinner"/>
                </div>
                {children}
            </body>
        </html>
    );
}
