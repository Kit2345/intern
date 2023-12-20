// import block
import pool from "../dbIndex";

// file to manage all of the API calls to the database for the attendance table

// GET all bootcampers attendance
export async function getBootcampers(tableName: string) {
  const queryText = `
        SELECT
            COUNT(*) AS missing_streak_count
        FROM ${tableName}
        WHERE
            missing_streak = 0;
     `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool
    const result = await pool.query(queryText);
    return result.rows;
  } catch (error) {
    console.error("Error patching record", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      console.log("Present bootcampers fetch complete, closing connection");
      client.release();
    }
  }
}

// GET count of absent bootcampers attendance
export async function getAbsentBootcampersCount(tableName: string) {
  const queryText = `
        SELECT
            COUNT(*) AS missing_streak_count
        FROM ${tableName}
        WHERE
            missing_streak > 0;
     `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool
    const result = await pool.query(queryText);
    return result.rows;
  } catch (error) {
    console.error("Error patching record", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      console.log("Absent bootcampers fetch complete, closing connection");
      client.release();
    }
  }
}

// GET missing people
// GET all bootcampers attendance
export async function getAbsentBootcampersID(tableName: string) {
  const queryText = `
        SELECT
         name, missing_streak
        FROM ${tableName}
        WHERE
            missing_streak > 0;
     `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool
    const result = await pool.query(queryText);
    return result.rows;
  } catch (error) {
    console.error("Error patching record", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
    }
  }
}

// POST attendance data for a bootcamper
export async function registerBootcamperAttendance(
  zoomId: number,
  updates: any,
  tableName: string
) {
  const queryText = `
        UPDATE ${tableName}
            SET
            todays_attendance_hours = COALESCE ($1, todays_attendance_hours),
            total_attendance_hours = COALESCE ($2, total_attendance_hours),
            total_days_attended = COALESCE ($3, total_days_attended),
            missing_streak = COALESCE ($4, missing_streak)
            WHERE zoomId = $5
            RETURNING *;
    `;
  // set up client variable
  let client: any;

  try {
    client = await pool.connect(); // get new client from the pool
    const result = await pool.query(queryText, [
      updates.todays_attendance_hours,
      updates.total_attendance_hours,
      updates.total_days_attended,
      updates.missing_streak,
      zoomId,
    ]);
    // if no bootcamper exists with the specified ID the rows array will be empty
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error updating record", error);
    throw error;
  } finally {
    if (client) {
      // release client connection
      client.release();
    }
  }
}

// GET list of bootcampers attendance
export async function getListBootcampers(tableName: string) {
  const queryText = `
        SELECT
            * 
        FROM ${tableName}
     `;
  try {
    const result = await pool.query(queryText);
    return result.rows;
  } catch (error) {
    console.error("Error patching record", error);
    throw error;
  }
}

// GET CSV from Postgres

// 1. Create a file
// 2. Copy CSV data to file
