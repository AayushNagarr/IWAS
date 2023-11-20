import { NextResponse } from 'next/server'
import pool from '../../../lib/db';

export async function POST(request) {
  const body = await request.json()
  const { UserID } = body

  try {
    console.log("Hello");
    // Connect to the database
    const client = await pool.connect();

    // Query to get user information by username
    const query = 'SELECT id, password FROM users WHERE username = $1';
    const values = [UserID];
    const result = await client.query(query, values);
    console.log(result.rows[0].password);

    // Check if the user exists
    if (result.rows.length > 0) {
      const user = result.rows[0];
      // Return the user data including id and excluding sensitive information (e.g., password)
      return NextResponse.json({
        id: user.id,
        username: UserID,
        password: user.password,
        // Add other user properties you want to include
      }, { status: 200 });
    } else {
      // User not found
      return NextResponse.json({ Error: 'User not found' }, { status: 404 });
    }

    // Release the database connection
    client.release();
  } catch (error) {
    console.error('Error in /api/user:', error);
    return NextResponse.json({ Error: 'Internal Server Error' }, { status: 500 });
  }
}
