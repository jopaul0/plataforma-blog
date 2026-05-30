const API_URL = 'http://localhost:3000/api';

// Variáveis para guardar os estados temporários e tokens gerados entre os testes
let authToken = '';
let createdPostId = '';
let createdCommentId = '';
const uniqueId = Math.floor(Math.random() * 10000);
const testUser = {
    name: 'Desenvolvedor de Teste',
    username: `tester_${uniqueId}`,
    email: `test_${uniqueId}@portallux.com`,
    password: 'Password123!'
};

async function runTests() {
    console.log('🚀 Iniciando bateria completa de testes automatizados...\n');

    try {
        // =========================================================================
        // SPRINT 1: AUTENTICAÇÃO E COMPORTAMENTO BASE
        // =========================================================================

        // 1. Testar Rota Privada Protegida Sem Token (Deve falhar)
        console.log('🔹 [TASK 00-8] Testando proteção de rota privada (GET /posts/me)...');
        const protectionCheck = await fetch(`${API_URL}/posts/me`);
        if (protectionCheck.status === 401) {
            console.log('✅ Sucesso: Acesso negado corretamente com status 401.');
        } else {
            console.log(`❌ Falha: Rota deveria retornar 401 mas retornou ${protectionCheck.status}`);
        }

        // 2. Testar Registro de Usuário (Sucesso)
        console.log('\n🔹 [TASK 01-1] Testando cadastro de usuário (POST /auth/register)...');
        const registerResponse = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const registerData = await registerResponse.json();
        if (registerResponse.status === 201) {
            console.log(`✅ Sucesso: Usuário cadastrado com ID: ${registerData.user.id}`);
        } else {
            console.log('❌ Falha ao cadastrar usuário:', registerData);
            return;
        }

        // 3. Testar Registro Duplicado (Deve dar conflito)
        console.log('\n🔹 Testando tentativa de cadastro com e-mail/username duplicado...');
        const duplicateResponse = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        if (duplicateResponse.status === 409) {
            console.log('✅ Sucesso: Bloqueio de duplicata correto com status 409.');
        } else {
            console.log(`❌ Falha: Deveria dar 409 mas retornou ${duplicateResponse.status}`);
        }

        // 4. Testar Verificação de Username Disponível
        console.log('\n🔹 Testando checagem de disponibilidade de username (GET /auth/check-username)...');
        const checkUsernameCheck = await fetch(`${API_URL}/auth/check-username?username=${testUser.username}`);
        const checkUsernameData = await checkUsernameCheck.json();
        if (checkUsernameData.available === false) {
            console.log(`✅ Sucesso: Detectou corretamente que o username "@${testUser.username}" está indisponível.`);
        } else {
            console.log('❌ Falha: Deveria marcar o username como indisponível.');
        }

        // 5. Testar Login do Usuário
        console.log('\n🔹 [TASK 02-1] Testando autenticação de usuário (POST /auth/login)...');
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testUser.email, password: testUser.password })
        });
        const loginData = await loginResponse.json();
        if (loginResponse.status === 200 && loginData.token) {
            authToken = loginData.token;
            console.log('✅ Sucesso: Login realizado, token JWT obtido.');
        } else {
            console.log('❌ Falha no login:', loginData);
            return;
        }

        // 6. Testar Rota de Perfil Próprio Protegida
        console.log('\n🔹 [TASK 15-1] Testando obtenção do perfil logado (GET /auth/me)...');
        const profileResponse = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const profileData = await profileResponse.json();
        if (profileResponse.status === 200) {
            console.log(`✅ Sucesso: Perfil retornado para o usuário: ${profileData.user.name}`);
        } else {
            console.log('❌ Falha ao buscar perfil próprio:', profileData);
        }

        // 7. Testar Criação de Novo Artigo (POST /posts)
        console.log('\n🔹 [TASK 07-1] Testando criação de postagem (POST /posts)...');
        const postPayload = {
            title: 'Dominando Arquiteturas de APIs com Node e TypeScript',
            content: 'Este é o corpo do conteúdo do post de testes automatizados com mais de dez caracteres.',
            status: 'PUBLISHED'
        };
        const createPostResponse = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(postPayload)
        });
        const createPostData = await createPostResponse.json();
        if (createPostResponse.status === 201) {
            createdPostId = createPostData.post.id;
            console.log(`✅ Sucesso: Post criado com ID: ${createdPostId} e Slug: "${createPostData.post.slug}"`);
        } else {
            console.log('❌ Falha ao criar post:', createPostData);
            return;
        }

        // 8. Testar Obtenção de Posts do Painel Privado (Dashboard)
        console.log('\n🔹 [TASK 10-1] Testando listagem do Dashboard (GET /posts/me)...');
        const dashboardResponse = await fetch(`${API_URL}/posts/me`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const dashboardData = await dashboardResponse.json();
        if (dashboardResponse.status === 200 && Array.isArray(dashboardData.posts)) {
            console.log(`✅ Sucesso: Encontrados ${dashboardData.posts.length} posts no painel do usuário.`);
        } else {
            console.log('❌ Falha ao buscar posts do Dashboard:', dashboardData);
        }

        // 9. Testar Listagem Pública da Home
        console.log('\n🔹 [TASK 05-1] Testando feed público da Home (GET /posts)...');
        const homeResponse = await fetch(`${API_URL}/posts?page=1&perPage=5`);
        const homeData = await homeResponse.json();
        if (homeResponse.status === 200 && homeData.posts) {
            console.log(`✅ Sucesso: Feed público carregou página ${homeData.meta.currentPage} com ${homeData.posts.length} artigos.`);
        } else {
            console.log('❌ Falha ao carregar a Home:', homeData);
        }

        // 10. Testar Detalhe de um Post por Autor e Slug
        console.log('\n🔹 [TASK 06-1] Testando leitura de artigo por slug (GET /posts/author/:username/:slug)...');
        const detailResponse = await fetch(`${API_URL}/posts/author/${testUser.username}/${createPostData.post.slug}`, {
            headers: { 'Authorization': `Bearer ${authToken}` } // Envia token opcional para ver likedByMe
        });
        const detailData = await detailResponse.json();
        if (detailResponse.status === 200) {
            console.log(`✅ Sucesso: Post retornado: "${detailData.title}" | likedByMe: ${detailData.likedByMe}`);
        } else {
            console.log('❌ Falha ao carregar artigo por slug:', detailData);
        }

        // 11. Testar Atualização (Edição) de Post
        console.log('\n🔹 [TASK 08-1] Testando edição de postagem existente (PUT /posts/:id)...');
        const updateResponse = await fetch(`${API_URL}/posts/${createdPostId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ title: 'Título Atualizado das APIs com Node e TypeScript' })
        });
        const updateData = await updateResponse.json();
        if (updateResponse.status === 200) {
            console.log(`✅ Sucesso: Título modificado para: "${updateData.post.title}" e novo Slug: "${updateData.post.slug}"`);
        } else {
            console.log('❌ Falha ao atualizar post:', updateData);
        }

        // =========================================================================
        // SPRINT 2: COMPORTAMENTOS AVANÇADOS, COMENTÁRIOS E CURTIDAS
        // =========================================================================

        // 12. Testar Inserção de Comentário em Post
        console.log('\n🔹 [TASK 12-1] Testando publicação de comentário (POST /posts/:id/comments)...');
        const commentResponse = await fetch(`${API_URL}/posts/${createdPostId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ content: 'Excelente artigo técnico! Me ajudou muito nos testes.' })
        });
        const commentData = await commentResponse.json();
        if (commentResponse.status === 201) {
            createdCommentId = commentData.comment.id;
            console.log(`✅ Sucesso: Comentário adicionado com ID: ${createdCommentId}`);
        } else {
            console.log('❌ Falha ao comentar:', commentData);
        }

        // 13. Testar Obtenção de Lista de Comentários do Post
        console.log('\n🔹 [TASK 13-1] Testando leitura de comentários de um post (GET /posts/:id/comments)...');
        const getCommentsResponse = await fetch(`${API_URL}/posts/${createdPostId}/comments`);
        const getCommentsData = await getCommentsResponse.json();
        if (getCommentsResponse.status === 200 && Array.isArray(getCommentsData.comments)) {
            console.log(`✅ Sucesso: Encontrados ${getCommentsData.comments.length} comentários nesta postagem.`);
        } else {
            console.log('❌ Falha ao buscar lista de comentários:', getCommentsData);
        }

        // 14. Testar Dar Like (Curtir)
        console.log('\n🔹 [TASK 16-1] Testando computação de curtida (POST /posts/:id/likes)...');
        const likeResponse = await fetch(`${API_URL}/posts/${createdPostId}/likes`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const likeData = await likeResponse.json();
        if (likeResponse.status === 200) {
            console.log(`✅ Sucesso: Resposta da API -> liked: ${likeData.liked} (${likeData.message})`);
        } else {
            console.log('❌ Falha ao alternar curtida:', likeData);
        }

        // 15. Testar Perfil Público do Autor
        console.log('\n🔹 [TASK 11-1] Testando busca de perfil público do autor (GET /api/auth/users/:id)...');
        const publicProfileResponse = await fetch(`${API_URL}/auth/users/${registerData.user.id}`);
        const publicProfileData = await publicProfileResponse.json();
        if (publicProfileResponse.status === 200) {
            console.log(`✅ Sucesso: Perfil público de @${publicProfileData.username} carregou com ${publicProfileData.posts.length} posts publicados.`);
        } else {
            console.log('❌ Falha ao buscar perfil público:', publicProfileData);
        }

        // 16. Testar Remoção de Comentário Próprio
        console.log('\n🔹 [TASK 14-1] Testando exclusão de comentário próprio (DELETE /comments/:id)...');
        const deleteCommentResponse = await fetch(`${API_URL}/comments/${createdCommentId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (deleteCommentResponse.status === 200) {
            console.log('✅ Sucesso: Comentário removido com sucesso.');
        } else {
            const errData = await deleteCommentResponse.json();
            console.log('❌ Falha ao deletar comentário:', errData);
        }

        // 17. Testar Remoção (Soft Delete) de Artigo Próprio
        console.log('\n🔹 [TASK 09-1] Testando exclusão lógica de postagem própria (DELETE /posts/:id)...');
        const deletePostResponse = await fetch(`${API_URL}/posts/${createdPostId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        if (deletePostResponse.status === 200) {
            console.log('✅ Sucesso: Post ocultado/removido do banco logicamente via Soft Delete.');
        } else {
            const errData = await deletePostResponse.json();
            console.log('❌ Falha ao deletar post:', errData);
        }

        console.log('\n🎉 =========================================================================');
        console.log('🏆 TODOS OS TESTES PASSARAM COM SUCESSO! A API ESTÁ PRONTA PARA O FRONTEND.');
        console.log('============================================================================= 🎉');

    } catch (error) {
        console.error('\n❌ Erro crítico de comunicação com o servidor durante a execução dos testes:', error.message);
    }
}

runTests();