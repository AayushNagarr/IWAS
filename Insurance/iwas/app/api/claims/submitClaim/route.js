// pages/api/claims/submitClaim.js
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
  try {
    const { userId, datetime, causeOfLoss, estimatedDamageAmount } = await request.json();

    const client = await pool.connect();
    const insertQuery = `
      INSERT INTO claims (user_id, datetime, cause_of_loss, estimated_damage_amount)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const values = [userId, datetime, causeOfLoss, estimatedDamageAmount];
    const result = await client.query(insertQuery, values);
    const insertedClaim = result.rows[0];

    client.release();
    console.log('Inserted Claim:', insertedClaim);
    return NextResponse.json({ message: 'Claim submitted successfully' });
  } catch (error) {
    console.error('Error in POST /api/claims/submitClaim', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
