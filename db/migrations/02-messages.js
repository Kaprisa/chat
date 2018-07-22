const errorHandler = require('../../helpers/errorHandler')

exports.up = async query => {
    try {
        await query(`CREATE TABLE IF NOT EXISTS messages (
          id int(10) unsigned NOT NULL AUTO_INCREMENT,
          from_id int(10) unsigned NOT NULL,
          to_id int(10) unsigned NOT NULL,
          text text COLLATE utf8mb4_unicode_ci NOT NULL,
          created_at timestamp NOT NULL,
          PRIMARY KEY (id),
          CONSTRAINT from_id_foreign FOREIGN KEY (from_id) REFERENCES users (id) ON DELETE CASCADE,
          CONSTRAINT to_id_foreign FOREIGN KEY (to_id) REFERENCES users (id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`, []
        )
    } catch (e) {errorHandler(e)}


}

exports.down = async query => {
    try {
        await query(`DROP TABLE IF EXISTS messages;`, [])
    } catch (e) {errorHandler(e)}
}
