import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export function renderizarAgenda(db, mainContent) {
    mainContent.innerHTML = `<div style="text-align: center; padding: 40px; color: #888;">Buscando agendamentos da clínica...</div>`;

    const agendaRef = collection(db, "Agendamentos");

    // Captura os dados em tempo real
    onSnapshot(agendaRef, (snapshot) => {
        let html = `
            <div class="agenda-container">
                <div class="table-header" style="margin-bottom: 30px;">
                    <h3>Próximos pacientes</h3>
                </div>
        `;

        if (snapshot.empty) {
            html += `<p style="text-align: center; color: #888;">Nenhuma consulta marcada no momento.</p>`;
        } else {
            // Cria um card para cada documento encontrado no Firebase (Layout (Semelhante ao do aplicativo))
            snapshot.forEach((doc) => {
                const dados = doc.data();
                html += `
                    <div class="agenda-card">
                        <div class="agenda-header">
                            <h3>Paciente ${dados.nome_paciente}</h3>
                            <span class="status-badge">${dados.status}</span>
                        </div>
                        <div class="agenda-details">
                            <p class="text-highlight">Agendamento para ${dados.hora_consulta}h</p>
                            <p class="text-highlight">${dados.data_consulta}</p>
                            <p class="text-muted" style="margin-top: 15px;">Foco: ${dados.foco}</p>
                        </div>
                        <div class="agenda-action">
                            <button class="btn-cancel" data-id="${doc.id}">CANCELAR SESSÃO</button>
                        </div>
                    </div>
                `;
            });
        }

        html += `</div>`;

        // Verifica se o botão Agenda ainda está ativo antes de aplicar, para evitar sobreposição de telas
        if(document.getElementById('btn-agenda').classList.contains('active')) {
            mainContent.innerHTML = html;
        }
    });
}