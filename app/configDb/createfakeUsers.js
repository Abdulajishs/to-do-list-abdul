const faker = require('faker');
let { db } = require('../utils/db-helper')

const generateUsers = async () => {
  console.time("User Insertion Time");

  db.serialize(() => {
    // Start a transaction
    db.run("BEGIN TRANSACTION;", (err) => {
      if (err) console.error("Failed to begin transaction: ", err.message);
    });

    const insertBatch = (batch) => {
      return new Promise((resolve, reject) => {
        const placeholders = batch.map(() => "(?, ?)").join(",");
        const flatValues = batch.flat(); // Flatten the batch into a single array
        const query = `INSERT INTO projects (name, email) VALUES ${placeholders}`;
    
        db.run(query, flatValues, (err) => {
          if (err) reject(err);
          else resolve();
        });
        // db.run(
        //   `INSERT INTO users (name, email) VALUES ${batch.join(",")}`,
        //   (err) => {
        //     if (err) reject(err);
        //     else resolve();
        //   }
        // );
      });
    };

    const BATCH_SIZE = 1000; // Insert in batches of 1,000
    const totalUsers = 10000;
    let batch = [];

    const insertUsers = async () => {
      for (let i = 1; i <= totalUsers; i++) {
        let name, email;
        do {
          name = faker.internet.userName().replace(/'/g, "''");
          email = faker.internet.email().replace(/'/g, "''");
        } while (await isEmailExists(email)); // Regenerate if email exists

        // Push a single row
        batch.push(`('${name}', '${email}')`);

        // Execute batch insert
        if (i % BATCH_SIZE === 0 || i === totalUsers) {
          console.log(`Inserting ${i} / ${totalUsers} users...`);
          try {
            await insertBatch(batch);
            batch = []; // Clear the batch
          } catch (err) {
            console.error(`Failed to insert batch: ${err.message}`);
          }
        }
      }
    };

    const isEmailExists = (email) => {
      return new Promise((resolve, reject) => {
        db.get("SELECT 1 FROM users WHERE email = ?", [email], (err, row) => {
          if (err) reject(err);
          resolve(row ? true : false);
        });
      });
    };

    insertUsers()
      .then(() => {
        db.run("COMMIT;", (err) => {
          if (err) console.error("Failed to commit transaction: ", err.message);
          console.log("All users inserted successfully.");
          console.timeEnd("User Insertion Time");
          db.close((err) => {
            if (err) console.error("Failed to close database: ", err.message);
          });
        });
      })
      .catch((err) => {
        console.error("Error during user data insertion: ", err.message);
        db.run("ROLLBACK;", () => db.close());
      });
  });
};

generateUsers();
