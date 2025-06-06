import { neon } from '@neondatabase/serverless';
import { neonConfig } from '@neondatabase/serverless';

// Optimize Neon connection
neonConfig.pipelineConnect = true;
neonConfig.pipelineTLS = true;

const sql = neon(process.env.NEON_POOLED_URL);

export const neonPool = (req, res, next) => {
  req.sql = sql;
  next();
};