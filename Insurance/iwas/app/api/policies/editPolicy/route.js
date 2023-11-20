import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function PUT(request) {
  try {
    const { policyId, policyName, policyType, policyHolderName, coverageDetails } = await request.json();
    
    const client = await pool.connect();
    
    const updateQuery = `
      UPDATE policies 
      SET 
        policy_name = '${policyName}', 
        policy_type = '${policyType || ''}', 
        policy_holder_name = '${policyHolderName || ''}', 
        coverage_details = '${coverageDetails || ''}' 
      WHERE policy_id = ${policyId} 
      RETURNING *
    `;
    
    const result = await client.query(updateQuery);
    const items = result.rows;

    client.release();

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
