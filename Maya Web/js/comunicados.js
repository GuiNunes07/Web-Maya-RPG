import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export function renderizarComunicados(db, mainContent) {
    mainContent.innerHTML = `
        <div class="prontuarios-container" style="background: #fff; padding: 30px; border-radius: 12px; border: 1px solid #e0e0e0; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
            
            <div class="table-header" style="margin-bottom: 25px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
                <h3 style="color: #333; font-size: 1.2rem;">Comunicados e Avisos</h3>
            </div>

            <div style="margin-bottom: 40px;">
                <p style="font-weight: 600; color: #555; font-size: 0.95rem; margin-bottom: 10px;">Publicar aviso no mural dos pacientes:</p>
                <textarea id="texto-aviso" rows="4" placeholder="Ex: Estaremos em recesso do dia 20 ao dia 25. Bom feriado!" style="width: 100%; padding: 15px; border-radius: 12px; border: 1px solid #ccc; font-size: 1rem; resize: vertical; outline: none; font-family: inherit; background: #fdfdfd; margin-bottom: 15px;"></textarea>
                
                <div style="display: flex; justify-content: flex-end;">
                    <button id="btn-publicar" style="background-color: #38b6ff; color: white; border: none; padding: 10px 30px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 0.95rem; transition: background 0.2s;">
                        PUBLICAR
                    </button>
                </div>
            </div>

            <hr style="border: 0; border-top: 1px dashed #ddd; margin-bottom: 30px;">

            <div>
                <p style="font-weight: 700; color: #444; font-size: 0.95rem; margin-bottom: 20px;">Disparos estratégicos rápidos:</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 20px; border: 1px solid #eee; border-radius: 12px; background: #fafafa;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div style="background: #fff3e0; width: 45px; height: 45px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                                ✉️
                            </div>
                            <div>
                                <h4 style="color: #5d4037; font-size: 1rem; margin-bottom: 3px;">Convite de Reavaliação</h4>
                                <p style="color: #888; font-size: 0.8rem;">Chamar pacientes para reavaliações</p>
                            </div>
                        </div>
                        <button class="btn-disparo" onclick="alert('Disparo de reavaliação enviado para os pacientes não frequentes!')" style="background: transparent; color: #2b9eb3; border: 1px solid #2b9eb3; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.85rem; transition: all 0.2s;">
                            DISPARAR
                        </button>


                </div>
            </div>
        </div>
    `;

    // Lógica para o botão PUBLICAR (Salvar no Firebase)
    document.getElementById('btn-publicar').addEventListener('click', async () => {
        const textoAviso = document.getElementById('texto-aviso').value;

        if (!textoAviso.trim()) {
            alert("Por favor, digite um aviso antes de publicar.");
            return;
        }

        try {
            // Cria a coleção "Comunicados" e salva o aviso
            await addDoc(collection(db, "Comunicados"), {
                mensagem: textoAviso,
                data_publicacao: new Date(),
                tipo: "mural_geral"
            });

            alert("Aviso publicado no mural dos pacientes com sucesso!");
            document.getElementById('texto-aviso').value = ''; 
        } catch (error) {
            console.error("Erro ao publicar aviso:", error);
            alert("Ocorreu um erro ao conectar com o banco de dados.");
        }
    });
}