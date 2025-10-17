const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to start ngrok and extract the URL
function startNgrok() {
    return new Promise((resolve, reject) => {
        console.log('Starting ngrok...');
        const ngrok = spawn('ngrok', ['http', '3000', '--log=stdout'], {
            stdio: ['pipe', 'pipe', 'pipe']
        });

        let output = '';
        ngrok.stdout.on('data', (data) => {
            output += data.toString();
            // Look for the ngrok URL in the output
            const urlMatch = output.match(/https:\/\/[a-zA-Z0-9-]+\.ngrok-free\.app/);
            if (urlMatch) {
                const ngrokUrl = urlMatch[0];
                console.log(`Ngrok URL: ${ngrokUrl}`);
                resolve(ngrokUrl);
            }
        });

        ngrok.stderr.on('data', (data) => {
            console.error(`ngrok error: ${data}`);
        });

        ngrok.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`ngrok process exited with code ${code}`));
            }
        });

        // Timeout after 10 seconds
        setTimeout(() => {
            reject(new Error('Timeout waiting for ngrok to start'));
        }, 10000);
    });
}

// Function to update environment file
function updateEnvFile(ngrokUrl) {
    const envPath = path.join(__dirname, '../../.env');
    
    try {
        let envContent = '';
        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf8');
        }

        // Update or add API_URL
        const apiUrlRegex = /^API_URL=.*$/m;
        const newApiUrl = `API_URL=${ngrokUrl}`;
        
        if (apiUrlRegex.test(envContent)) {
            envContent = envContent.replace(apiUrlRegex, newApiUrl);
        } else {
            envContent += `\n${newApiUrl}\n`;
        }

        fs.writeFileSync(envPath, envContent);
        console.log(`Updated .env file with API_URL=${ngrokUrl}`);
    } catch (error) {
        console.error('Error updating .env file:', error);
    }
}

// Main function
async function main() {
    try {
        const ngrokUrl = await startNgrok();
        updateEnvFile(ngrokUrl);
        
        console.log('\n================================');
        console.log(`Your ngrok URL: ${ngrokUrl}`);
        console.log('Update your Google Cloud Console OAuth settings:');
        console.log(`Authorized redirect URIs: ${ngrokUrl}/api/auth/google/callback`);
        console.log('================================\n');
        
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();
