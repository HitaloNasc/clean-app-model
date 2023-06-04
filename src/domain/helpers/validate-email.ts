export function validateEmail(email: string): boolean {
    const tester = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return false;
    }
    if (email.length > 256) {
        return false;
    }
    if (!tester.test(email)) {
        return false;
    }
    const [account, address] = email.split('@');
    if (account.length > 64) {
        return false;
    }

    const firstCharDomain = address[0];
    if (firstCharDomain === '.') {
        return false;
    }

    const domainParts = address.split('.');
    if (
        domainParts.some(function (part) {
            return part.length > 63;
        })
    ) {
        return false;
    }

    return true;
}
