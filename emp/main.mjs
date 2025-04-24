// main.mjs
import https from 'https';
// Adjust the import path below to point to your built native module.
// This assumes that your napi module exports an async function named "call_google".
import { callGoogle } from './index.js';

/**
 * Uses Node's native https module to perform a GET request to "https://www.google.com".
 * Returns a promise that resolves with an object containing the response length and snippet.
 */
function callGoogleUsingHttps() {
    return new Promise((resolve, reject) => {
        let data = '';
        console.time('Node HTTPS call');

        https.get('https://www.google.com', (res) => {
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * Main async function that calls both the Node HTTPS call and the Rust napi module function.
 */
async function main() {
    try {
        // API call via Node's https module.
        const httpsResult = await callGoogleUsingHttps();
        console.timeEnd('Node HTTPS call');
        console.log('Native HTTPS response length:', httpsResult.length);

        // API call via the Rust napi native module.
        console.time('Rust napi call');
        const rustResponse = await callGoogle();
        console.timeEnd('Rust napi call');
        console.log('Rust napi call response length:', rustResponse.length);
    } catch (error) {
        console.error('Error during API calls:', error);
    }
}

// Execute the main function.
main();
