import { collection, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export function renderizarProntuarios(db, mainContent) {
    
    // Injeta o formulário na tela
    mainContent.innerHTML = `
        <div class="prontuarios-container" style="background: #fff; padding: 30px; border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
            <div class="table-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
                <h3 style="color: #333; font-size: 1.2rem;">Novo Registro de Evolução</h3>
            </div>

            <form id="form-prontuario" style="display: flex; flex-direction: column; gap: 20px;">
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                    <div style="display: flex; flex-direction: column; gap: 8px; flex: 2; min-width: 250px;">
                        <label for="paciente-select" style="font-weight: 600; color: #555; font-size: 0.9rem;">Paciente</label>
                        <select id="paciente-select" required style="padding: 12px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; outline: none; background: #fdfdfd;">
                            <option value="">Carregando pacientes...</option>
                        </select>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 200px;">
                        <label for="data-sessao" style="font-weight: 600; color: #555; font-size: 0.9rem;">Data da Sessão</label>
                        <input type="date" id="data-sessao" required style="padding: 12px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; outline: none; background: #fdfdfd;">
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <label for="evolucao-texto" style="font-weight: 600; color: #555; font-size: 0.9rem;">Evolução Clínica / Procedimentos Realizados</label>
                    <textarea id="evolucao-texto" rows="6" required placeholder="Descreva os exercícios aplicados, nível de dor relatado, evolução postural..." style="padding: 12px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; resize: vertical; outline: none; font-family: inherit; background: #fdfdfd;"></textarea>
                </div>

                <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
                    <button type="submit" style="background-color: #38b6ff; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1rem; transition: background 0.2s;">
                        Salvar Evolução
                    </button>
                </div>
            </form>
        </div>
    `;

    // Busca os pacientes na coleção "Usuarios" para preencher a caixa de seleção
    const pacientesRef = collection(db, "Usuarios");
    onSnapshot(pacientesRef, (snapshot) => {
        const selectElement = document.getElementById('paciente-select');
        if (!selectElement) return; // Evita erro se a tela for fechada antes de carregar (return)

        let optionsHtml = '<option value="">Selecione o paciente atendido...</option>';
        snapshot.forEach((doc) => {
            const dados = doc.data();
            const nomeDoPaciente = dados.usuario || "Paciente sem nome"; // Pega o nome dos pacientes cadastrados
            optionsHtml += `<option value="${doc.id}">${nomeDoPaciente}</option>`;
        });

        selectElement.innerHTML = optionsHtml;
    });

    const form = document.getElementById('form-prontuario');
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const selectElement = document.getElementById('paciente-select');
        const nomeSelecionado = selectElement.options[selectElement.selectedIndex].text;
        const idPaciente = selectElement.value;
        const dataSessao = document.getElementById('data-sessao').value;
        const evolucaoTexto = document.getElementById('evolucao-texto').value;

        try {
            // Cria a coleção "Prontuarios" 
            await addDoc(collection(db, "Prontuarios"), {
                id_paciente: idPaciente,
                nome_paciente: nomeSelecionado,
                data_sessao: dataSessao,
                evolucao: evolucaoTexto,
                data_registro: new Date()
            });

            alert("Evolução salva com sucesso no prontuário!");
            form.reset(); // Limpa o formulário para o próximo paciente

        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Ocorreu um erro ao salvar o prontuário. Verifique as permissões do Firebase.");
        }
    });
}