// S3 support removed for MVP. Placeholder functions for future blob storage integration.

export async function uploadBlob(key: string, body: Buffer | string) {
  // No-op for MVP
  return Promise.resolve();
}

export async function getBlobUrl(key: string, expiresIn = 3600) {
  // No-op for MVP
  return Promise.resolve('');
}
