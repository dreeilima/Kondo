// Script para criar usuário síndico de teste
// Execute com: node create-admin-user.js

import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase (substitua pelas suas)
const supabaseUrl = 'https://your-project-url.supabase.co'
const supabaseServiceKey = 'your-service-role-key' // Use a service role key

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdminUser() {
  try {
    console.log('🔄 Criando usuário síndico de teste...')
    
    // Dados do usuário de teste
    const userData = {
      email: 'admin@kondo.com',
      password: 'admin123',
      full_name: 'Administrador Teste',
      apartment: '101',
      block: 'A'
    }
    
    // 1. Criar usuário no Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true, // Confirmar email automaticamente
      user_metadata: {
        full_name: userData.full_name,
        apartment: userData.apartment,
        block: userData.block
      }
    })
    
    if (authError) {
      throw authError
    }
    
    console.log('✅ Usuário criado no Auth:', authData.user.id)
    
    // 2. Atualizar role para síndico na tabela profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        role: 'sindico',
        full_name: userData.full_name,
        apartment: userData.apartment,
        block: userData.block
      })
      .eq('id', authData.user.id)
    
    if (profileError) {
      throw profileError
    }
    
    console.log('✅ Role atualizada para síndico')
    console.log('')
    console.log('🎉 Usuário síndico criado com sucesso!')
    console.log('📧 Email:', userData.email)
    console.log('🔑 Senha:', userData.password)
    console.log('👤 Nome:', userData.full_name)
    console.log('🏠 Apartamento:', userData.apartment)
    console.log('🏢 Bloco:', userData.block)
    console.log('🛡️ Role: síndico')
    console.log('')
    console.log('Agora você pode fazer login com essas credenciais!')
    
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error.message)
    process.exit(1)
  }
}

// Executar o script
createAdminUser()
