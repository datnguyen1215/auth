import pg from 'pg';
import settings from '../settings';

const config = settings.get();
const pool = new pg.Pool({ connectionString: config.db.url });

export default pool;
