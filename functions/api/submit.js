/**
 * Endpoint para recibir el formulario de consultas
 */

export async function onRequestPost(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const data = await request.json();
    
    // Validar datos requeridos
    if (!data.nombre || !data.email || !data.fechaNacimiento || !data.consulta) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Faltan datos requeridos' 
      }), {
        status: 400,
        headers: corsHeaders
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
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Error al guardar consulta:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error al guardar la consulta: ' + error.message
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
