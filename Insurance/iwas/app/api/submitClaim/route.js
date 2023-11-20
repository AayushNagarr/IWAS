// pages/api/submitClaim.js
import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function POST(request) {
  try {
    
    const {
      userId,
      policyId,
      datetime,
      causeOfLoss,
      estimatedDamageAmount,
      status,
    } = await request.json();

    const client = await pool.connect();
    const insertQuery = `
      INSERT INTO claims (
        user_id,
        policy_id,
        created_at,
        cause_of_loss,
        estimated_damage_amount,
        claim_status
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      userId,
      policyId,
      datetime,
      causeOfLoss,
      estimatedDamageAmount,
      status,
    ];
    console.log("In submit ",values)
    const result = await client.query(insertQuery, values);
    const insertedClaim = result.rows[0];
    console.log(insertedClaim);
    client.release();

    return NextResponse.json(insertedClaim);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
