import Database from 'better-sqlite3';

export type DB = InstanceType<typeof Database>;

export function createDatabase(): DB {
  const db = new Database(':memory:');

  // Initialize schema and seed data
  db.exec(`
    CREATE TABLE IF NOT EXISTS nurseries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT
    );

    CREATE TABLE IF NOT EXISTS positions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nursery_id INTEGER NOT NULL,
      data TEXT,
      status TEXT DEFAULT 'open',
      FOREIGN KEY (nursery_id) REFERENCES nurseries(id)
    );

    CREATE TABLE IF NOT EXISTS applicants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT
    );

    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      position_id INTEGER NOT NULL,
      applicant_id INTEGER NOT NULL,
      data TEXT,
      status TEXT DEFAULT 'received',
      FOREIGN KEY (position_id) REFERENCES positions(id) ON DELETE CASCADE,
      FOREIGN KEY (applicant_id) REFERENCES applicants(id) ON DELETE CASCADE
    );

    -- Seed Data
    INSERT OR IGNORE INTO nurseries (id, data) VALUES 
      (1, 'Sunnyside Daycare'),
      (2, 'Green Garden Preschool'),
      (3, 'Little Sprouts Academy'),
      (4, 'Bloom Kids Center'),
      (5, 'Rainbow Early Learning');

    INSERT OR IGNORE INTO positions (id, nursery_id, data) VALUES 
      (1, 1, 'Lead Educator'),
      (2, 1, 'Assistant Teacher'),
      (3, 2, 'Center Manager'),
      (4, 3, 'Early Years Specialist'),
      (5, 3, 'Toddler Room Leader'),
      (6, 4, 'Junior Apprentice'),
      (7, 4, 'Part-time Caregiver');

    INSERT OR IGNORE INTO applicants (id, data) VALUES 
      (1, 'Alice Smith (alice@email.com, 555-0101)'),
      (2, 'Bob Jones (bob@email.com, 555-0202)');

    INSERT OR IGNORE INTO applications (position_id, applicant_id, data) VALUES 
      (1, 1, 'Applied via Portal - Pending'),
      (3, 1, 'Applied via Referral - Reviewing'),
      (6, 2, 'Applied via Portal - Interview Scheduled');
  `);

  return db;
}
