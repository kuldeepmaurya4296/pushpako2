import GoogleProvider from 'next-auth/providers/google';
console.log('Type of GoogleProvider:', typeof GoogleProvider);
console.log('GoogleProvider:', GoogleProvider);
console.log('Is valid function:', typeof GoogleProvider === 'function');
try {
    GoogleProvider({});
    console.log('Call success');
} catch (e) {
    console.log('Call failed:', e.message);
}
