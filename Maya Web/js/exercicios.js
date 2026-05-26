import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export function renderizarExercicios(db, mainContent) {
    // Injeta o formulário na tela com base no design do mobile
    mainContent.innerHTML = `
        <div class="prontuarios-container" style="background: #fff; padding: 30px; border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
            <div class="table-header" style="margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
                <h3 style="color: #333; font-size: 1.2rem;">Cadastrar novos exercícios diários</h3>
            </div>

            <form id="form-exercicio" style="display: flex; flex-direction: column; gap: 20px;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <label for="nome-exercicio" style="font-weight: 600; color: #555; font-size: 0.9rem;">Nome do exercício:</label>
                    <input type="text" id="nome-exercicio" required placeholder="Ex: Alongamento Cervical" style="padding: 12px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; outline: none; background: #fdfdfd;">
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <label for="desc-exercicio" style="font-weight: 600; color: #555; font-size: 0.9rem;">Adicionar a descrição:</label>
                    <textarea id="desc-exercicio" rows="5" required placeholder="Descreva o passo a passo do movimento e o tempo de duração..." style="padding: 12px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; resize: vertical; outline: none; font-family: inherit; background: #fdfdfd;"></textarea>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <label for="img-exercicio" style="font-weight: 600; color: #555; font-size: 0.9rem;">URL da Imagem Ilustrativa (Opcional):</label>
                    <input type="url" id="img-exercicio" placeholder="https://link-da-imagem.com/foto.jpg" style="padding: 12px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; outline: none; background: #fdfdfd;">
                </div>

                <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
                    <button type="submit" style="background-color: #38b6ff; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1rem; transition: background 0.2s;">
                        ADICIONAR
                    </button>
                </div>
            </form>
        </div>
    `;

    // Lógica para salvar no Firebase quando clicar em "ADICIONAR"
    const form = document.getElementById('form-exercicio');
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const nome = document.getElementById('nome-exercicio').value;
        const descricao = document.getElementById('desc-exercicio').value;
        const imagemUrl = document.getElementById('img-exercicio').value;

        try {
            // Cria a coleção Exercicios e salva os dados
            await addDoc(collection(db, "Exercicios"), {
                nome_exercicio: nome,
                descricao: descricao,
                imagem_url: imagemUrl,
                data_criacao: new Date()
            });

            alert("Exercício cadastrado com sucesso no banco de dados!");
            form.reset(); 

        } catch (error) {
            console.error("Erro ao salvar o exercício:", error);
            alert("Ocorreu um erro ao salvar. Verifique o console.");
        }
    });
}