import Database from 'better-sqlite3';
import * as path from 'node:path';

const dbPath = path.resolve(process.cwd(), 'jobs.db');
const db: Database.Database = new Database(dbPath);

// Initialize schema
// db.exec(`
//   CREATE TABLE IF NOT EXISTS nurseries (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     address TEXT
//   );
//
//   CREATE TABLE IF NOT EXISTS sites (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     nursery_id INTEGER NOT NULL,
//     name TEXT NOT NULL,
//     address TEXT,
//     FOREIGN KEY (nursery_id) REFERENCES nurseries(id)
//   );
//
//   CREATE TABLE IF NOT EXISTS positions (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     site_id INTEGER NOT NULL,
//     title TEXT NOT NULL,
//     description TEXT,
//     status TEXT DEFAULT 'open',
//     FOREIGN KEY (site_id) REFERENCES sites(id)
//   );
//
//   CREATE TABLE IF NOT EXISTS applicants (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     first_name TEXT NOT NULL,
//     last_name TEXT NOT NULL,
//     email TEXT UNIQUE NOT NULL,
//     resume_url TEXT
//   );
//
//   CREATE TABLE IF NOT EXISTS applications (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     position_id INTEGER NOT NULL,
//     applicant_id INTEGER NOT NULL,
//     applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     status TEXT DEFAULT 'pending',
//     FOREIGN KEY (position_id) REFERENCES positions(id),
//     FOREIGN KEY (applicant_id) REFERENCES applicants(id)
//   );
// `);

export { db };
