/**
 * Endpoint para login del administrador
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
    const { username, password } = await request.json();
    
    console.log('Login attempt:', { username, hasPassword: !!password });
    console.log('Expected credentials:', { 
      expectedUser: env.ADMIN_USERNAME, 
      expectedPass: env.ADMIN_PASSWORD 
    });
    
    // Verificar credenciales usando variables de entorno
    if (username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD) {
      // Generar token simple
      const token = btoa(`${username}:${password}:${Date.now()}`);
      
      return new Response(JSON.stringify({ 
        success: true, 
        token,
        message: 'Login exitoso'
      }), {
        status: 200,
        headers: corsHeaders
      });
    }

    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Credenciales inválidas' 
    }), {
      status: 401,
      headers: corsHeaders
    });
  } catch (error) {
    console.error('Error en login:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error en el login: ' + error.message
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
