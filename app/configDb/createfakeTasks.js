const faker = require('faker');

let { db } = require('../utils/db-helper')


// Function to generate and insert task data
const generateTasks = async () => {
  console.time("Task Insertion Time");

  db.serialize(() => {
    // Start a transaction
    db.run("BEGIN TRANSACTION;", (err) => {
      if (err) console.error("Failed to begin transaction: ", err.message);
    });

    const insertBatch = (batch) => {
      return new Promise((resolve, reject) => {

        const placeholders = batch.map(() => "(?, ?, ?, ?, ?)").join(",");    
        const flatValues = batch.flat(); // Flatten the batch into a single array
        const query = `INSERT INTO tasks (content, description, due_date, is_completed, project_id) VALUES ${placeholders}`;
    
        db.run(query, flatValues, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    };

    const BATCH_SIZE = 100000; // Insert in batches of 100,000
    const totalTasks = 10000000;
    let batch = [];

    const insertTasks = async () => {
      for (let i = 1; i <= totalTasks; i++) {
        const content = faker.lorem.sentence().replace(/'/g, "''");
        const description = faker.lorem.paragraph().replace(/'/g, "''");
        const due_date = faker.date.future().toISOString().split('T')[0];
        const is_completed = faker.datatype.boolean();
        const project_id = faker.datatype.number({ min: 1, max: 1000000 }); // 1 million projects

        // Push a single row
        batch.push(`('${content}', '${description}', '${due_date}', ${is_completed}, ${project_id})`);

        // Execute batch insert
        if (i % BATCH_SIZE === 0 || i === totalTasks) {
          console.log(`Inserting ${i} / ${totalTasks} tasks...`);
          try {
            await insertBatch(batch);
            batch = []; // Clear the batch
          } catch (err) {
            console.error(`Failed to insert batch: ${err.message}`);
          }
        }
      }
    };

    insertTasks()
      .then(() => {
        db.run("COMMIT;", (err) => {
          if (err) console.error("Failed to commit transaction: ", err.message);
          console.log("All tasks inserted successfully.");
          console.timeEnd("Task Insertion Time");
          db.close((err) => {
            if (err) console.error("Failed to close database: ", err.message);
          });
        });
      })
      .catch((err) => {
        console.error("Error during task data insertion: ", err.message);
        db.run("ROLLBACK;", () => db.close());
      });
  });
};

generateTasks();
