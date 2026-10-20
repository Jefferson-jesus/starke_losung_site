// Preview deployments must remain private even if a production env file is reused.
export const isIndexable = process.env.VERCEL_ENV === "production" ||
  (!process.env.VERCEL_ENV && process.env.SITE_INDEXABLE === "true");
