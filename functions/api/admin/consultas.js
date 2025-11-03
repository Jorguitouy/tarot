/**
 * Endpoint para obtener todas las consultas
 */

function verifyAuth(request, env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  try {
    const token = authHeader.substring(7);
    const decoded = atob(token);
    const [username, password] = decoded.split(':');
    
    return username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export async function onRequestGet(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (!verifyAuth(request, env)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: corsHeaders
    });
  }

  try {
    const { results } = await env.DB.prepare(`
      SELECT * FROM consultas ORDER BY created_at DESC
    `).all();

    return new Response(JSON.stringify({ 
      success: true, 
      data: results 
    }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Error al obtener consultas:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error al obtener las consultas: ' + error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// Manejar OPTIONS para CORS
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
