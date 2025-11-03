/**
 * API de Cloudflare Workers para el sistema de Tarot
 * Maneja formularios y panel de administración
 */

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Configurar CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Manejar preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rutas de la API
    if (path === '/api/submit' && request.method === 'POST') {
      return await handleFormSubmit(request, env, corsHeaders);
    }
    
    if (path === '/api/admin/login' && request.method === 'POST') {
      return await handleAdminLogin(request, env, corsHeaders);
    }
    
    if (path === '/api/admin/consultas' && request.method === 'GET') {
      return await handleGetConsultas(request, env, corsHeaders);
    }
    
    if (path.startsWith('/api/admin/consultas/') && request.method === 'PUT') {
      return await handleUpdateConsulta(request, env, corsHeaders);
    }
    
    if (path.startsWith('/api/admin/consultas/') && request.method === 'DELETE') {
      return await handleDeleteConsulta(request, env, corsHeaders);
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Guardar nueva consulta del formulario
 */
async function handleFormSubmit(request, env, corsHeaders) {
  try {
    const data = await request.json();
    
    // Validar datos requeridos
    if (!data.nombre || !data.email || !data.fechaNacimiento || !data.consulta) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Faltan datos requeridos' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Insertar en la base de datos
    const result = await env.DB.prepare(`
      INSERT INTO consultas (nombre, email, telefono, fecha_nacimiento, area_consulta, pregunta, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.nombre,
      data.email,
      data.telefono || '',
      data.fechaNacimiento,
      data.consulta,
      data.pregunta || '',
      new Date().toISOString()
    ).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Consulta guardada exitosamente',
      id: result.meta.last_row_id
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al guardar consulta:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error al guardar la consulta' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Login del administrador
 */
async function handleAdminLogin(request, env, corsHeaders) {
  try {
    const { username, password } = await request.json();
    
    // Verificar credenciales usando variables de entorno
    if (username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD) {
      // Generar token simple (en producción usar JWT)
      const token = btoa(`${username}:${password}:${Date.now()}`);
      
      return new Response(JSON.stringify({ 
        success: true, 
        token,
        message: 'Login exitoso'
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Credenciales inválidas' 
    }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error en el login' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Verificar autenticación del administrador
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

/**
 * Obtener todas las consultas (requiere autenticación)
 */
async function handleGetConsultas(request, env, corsHeaders) {
  if (!verifyAuth(request, env)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
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
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error al obtener consultas:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error al obtener las consultas' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Actualizar estado de una consulta
 */
async function handleUpdateConsulta(request, env, corsHeaders) {
  if (!verifyAuth(request, env)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
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
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error al actualizar la consulta' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Eliminar una consulta
 */
async function handleDeleteConsulta(request, env, corsHeaders) {
  if (!verifyAuth(request, env)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    await env.DB.prepare(`
      DELETE FROM consultas WHERE id = ?
    `).bind(id).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Consulta eliminada' 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error al eliminar la consulta' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
