// pages/api/viewClaim.js
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
  try {
    const { userId, isAdmin } = await request.json();
    console.log("viewClaim details", {userId, isAdmin})
    const client = await pool.connect();
    // if(isAdmin)
    // {
    const query = `
      SELECT claims.claim_id, policies.policy_name, claims.cause_of_loss, claims.estimated_damage_amount, claims.claim_status
      FROM claims
      INNER JOIN policies ON claims.policy_id = policies.policy_id
      INNER JOIN users ON policies.user_id = users.id
      WHERE users.id = $1 ORDER BY claims.claim_id ASC;
    `;
    // }
    // else{
    //     console.log("Not an admin")
    //     const query = `
    //   SELECT claims.claim_id, policies.policy_name, claims.cause_of_loss, claims.estimated_damage_amount
    //   FROM claims
    //   INNER JOIN policies ON claims.policy_id = policies.policy_id
    //   WHERE claims.user_id = $1;
    // `;
    // }
    const result = await client.query(query, [userId]);
    const claims = result.rows;
    console.log("Claims", claims);

    client.release();

    return NextResponse.json(claims);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
