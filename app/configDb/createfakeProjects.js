const faker = require('faker');

let { db } = require('../utils/db-helper')


// Function to generate and insert project data
const generateProjects = async () => {
  console.time("Project Insertion Time");

  db.serialize(() => {
    // Start a transaction
    db.run("BEGIN TRANSACTION;", (err) => {
      if (err) console.error("Failed to begin transaction: ", err.message);
    });

    const insertBatch = (batch) => {
      return new Promise((resolve, reject) => {

        const placeholders = batch.map(() => "(?, ?, ?, ?)").join(",");
        const flatValues = batch.flat(); // Flatten the batch into a single array
        const query = `INSERT INTO projects (name, color, is_favorite, user_id) VALUES ${placeholders}`;
    
        db.run(query, flatValues, (err) => {
          if (err) reject(err);
          else resolve();
        });
        // db.run(
        //   `INSERT INTO projects (name, color, is_favorite, user_id) VALUES ${batch.join(",")}`,
        //   (err) => {
        //     if (err) reject(err);
        //     else resolve();
        //   }
        // );
      });
    };

    const BATCH_SIZE = 10000; // Insert in batches of 10,000
    const totalProjects = 1000000;
    let batch = [];

    const insertProjects = async () => {
      for (let i = 1; i <= totalProjects; i++) {
        const name = faker.company.companyName().replace(/'/g, "''");
        const color = faker.commerce.color().replace(/'/g, "''");
        const is_favorite = faker.datatype.boolean();
        const user_id = faker.datatype.number({ min: 1, max: 10000 }); // 10,000 users

        // Push a single row
        batch.push(`('${name}', '${color}', ${is_favorite}, ${user_id})`);

        // Execute batch insert
        if (i % BATCH_SIZE === 0 || i === totalProjects) {
          console.log(`Inserting ${i} / ${totalProjects} projects...`);
          try {
            await insertBatch(batch);
            batch = []; // Clear the batch
          } catch (err) {
            console.error(`Failed to insert batch: ${err.message}`);
          }
        }
      }
    };

    insertProjects()
      .then(() => {
        db.run("COMMIT;", (err) => {
          if (err) console.error("Failed to commit transaction: ", err.message);
          console.log("All projects inserted successfully.");
          console.timeEnd("Project Insertion Time");
          db.close((err) => {
            if (err) console.error("Failed to close database: ", err.message);
          });
        });
      })
      .catch((err) => {
        console.error("Error during project data insertion: ", err.message);
        db.run("ROLLBACK;", () => db.close());
      });
  });
};

generateProjects();
