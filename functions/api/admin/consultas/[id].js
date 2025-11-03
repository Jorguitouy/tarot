/**
 * Endpoint para actualizar o eliminar una consulta específica
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

// Actualizar consulta (PUT)
export async function onRequestPut(context) {
  const { request, env, params } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT, OPTIONS',
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
    const id = params.id;
    const { atendido, notas_admin } = await request.json();

    await env.DB.prepare(`
      UPDATE consultas 
      SET atendido = ?, notas_admin = ?
      WHERE id = ?
    `).bind(atendido, notas_admin || '', id).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Consulta actualizada' 
    }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Error al actualizar consulta:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error al actualizar la consulta: ' + error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

// Eliminar consulta (DELETE)
export async function onRequestDelete(context) {
  const { request, env, params } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
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
    const id = params.id;

    await env.DB.prepare(`
      DELETE FROM consultas WHERE id = ?
    `).bind(id).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Consulta eliminada' 
    }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Error al eliminar consulta:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error al eliminar la consulta: ' + error.message
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
      'Access-Control-Allow-Methods': 'PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
