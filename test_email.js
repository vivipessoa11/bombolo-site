import https from 'https';

const data = JSON.stringify({
    service_id: 'service_zjgsxxg',
    template_id: 'template_y2x13ee',
    user_id: 'SKWojhzVLpW4lxa_c',
    template_params: {
        from_name: 'Debug Bot',
        from_email: 'debug@test.com',
        message: 'Test from node script'
    }
});

const options = {
    hostname: 'api.emailjs.com',
    path: '/api/v1.0/email/send',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => console.log('BODY:', body));
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
