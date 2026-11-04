import crypto from 'crypto';

const SECRET = process.env.DOWNLOAD_AUTH_SECRET || process.env.LEMONSQUEEZY_WEBHOOK_SECRET || 'promptsystem_secure_auth_key_2026';

export function createDownloadToken(resource: string = 'promptsystem_download', expiryHours: number = 72): string {
  const expiry = Date.now() + expiryHours * 3600 * 1000;
  const payload = `${resource}:${expiry}`;
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex').slice(0, 32);
  return Buffer.from(`${payload}:${sig}`).toString('base64url');
}

export function verifyDownloadToken(token: string | null | undefined, expectedResource: string = 'promptsystem_download'): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length !== 3) return false;
    const [resource, expiryStr, sig] = parts;
    const expiry = parseInt(expiryStr, 10);
    if (isNaN(expiry) || Date.now() > expiry) return false;
    if (expectedResource && resource !== expectedResource) return false;
    const expectedSig = crypto.createHmac('sha256', SECRET).update(`${resource}:${expiryStr}`).digest('hex').slice(0, 32);
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig));
  } catch {
    return false;
  }
}
