import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export function renderizarPacientes(db, mainContent) {
    mainContent.innerHTML = `<div style="text-align: center; padding: 40px; color: #888;">Buscando lista de pacientes...</div>`;

    const usuariosRef = collection(db, "Usuarios");

    onSnapshot(usuariosRef, (snapshot) => {
        let html = `
            <div class="table-container" style="width: 100%;">
                <div class="table-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
                    <h3 style="color: #333; font-size: 1.2rem;">Pacientes Cadastrados</h3>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome do Paciente</th>
                            <th>ID do Usuário</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        if (snapshot.empty) {
            html += `
                <tr>
                    <td colspan="3" style="text-align: center; color: #888; padding: 30px;">
                        Nenhum paciente cadastrado no sistema.
                    </td>
                </tr>
            `;
        } else {
            // Captura o Firebase e monta as linhas da tabela
            snapshot.forEach((doc) => {
                const dados = doc.data();
                
                // Captura pelo usuario 
                const nomeDoPaciente = dados.usuario || "Paciente sem nome";
                
                html += `
                    <tr>
                        <td style="font-weight: 500; color: #333;">${nomeDoPaciente}</td>
                        <td style="color: #666; font-family: monospace; font-size: 0.9rem;">${doc.id}</td>
                        <td><span class="badge active">Ativo</span></td>
                    </tr>
                `;
            });
        }

        html += `
                    </tbody>
                </table>
            </div>
        `;

        // Só renderiza se o botão "Pacientes" continuar ativo
        if (document.getElementById('btn-pacientes').classList.contains('active')) {
            mainContent.innerHTML = html;
        }
    });
}