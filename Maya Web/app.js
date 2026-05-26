import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


import { renderizarAgenda } from "./js/agenda.js";
import { renderizarProntuarios } from "./js/prontuarios.js";


// 1. Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCqjc6Tu1QB5IKmZ2g6da4U4Sjetq6rdVI",
    authDomain: "app-maya-3gl.firebaseapp.com",
    projectId: "app-maya-3gl",
    storageBucket: "app-maya-3gl.firebasestorage.app",
    messagingSenderId: "558329656563",
    appId: "1:558329656563:web:1398716fc15427d95c3386",
    measurementId: "G-2JYNDVJX8W"
};

// 2. Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3. Captura de Elementos do DOM
const mainContent = document.getElementById('main-content');
const menuItems = document.querySelectorAll('.menu-item');
const patientCountElement = document.getElementById('patient-count');
const agendaCountElement = document.getElementById('agenda-count');

// 4. Função para monitorar pacientes (Firebase em Tempo Real)
function monitorarPacientesAtivos() {
    const pacientesRef = collection(db, "Usuarios");
    onSnapshot(pacientesRef, (snapshot) => {
        if (patientCountElement) {
            patientCountElement.innerText = snapshot.size;
        }
    });
}

// 5. Função para monitorar consultas marcadas (Firebase em Tempo Real)
function monitorarConsultasMarcadas() {
    const agendaRef = collection(db, "Agendamentos");
    onSnapshot(agendaRef, (snapshot) => {
        if (agendaCountElement) {
            agendaCountElement.innerText = snapshot.size;
        }
    });
}

// 6. Template de Tela Vazia Inicial
const viewVazia = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 300px; text-align: center;">
        <p style="color: #888; font-size: 1.1rem;">Clique em algum item para abrir os detalhes</p>
    </div>
`;

// 7. Lógica de Navegação Principal
function changeView(viewHtml, clickedButtonId) {
    if(viewHtml) {
        mainContent.innerHTML = viewHtml;
    }
    
    menuItems.forEach(item => item.classList.remove('active'));
    
    const activeBtn = document.getElementById(clickedButtonId);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// 8. Event Listeners (Ouvintes de Clique)
document.getElementById('btn-dashboard').addEventListener('click', () => {
    changeView(viewVazia, 'btn-dashboard'); 
});

document.getElementById('btn-agenda').addEventListener('click', () => {
    // Aponta o menu para ativo, mas não injeta HTML estático
    changeView(null, 'btn-agenda'); 
    // Chama a função que busca no banco e desenha os cards dinâmicos
    renderizarAgenda(db, mainContent); 
});

document.getElementById('btn-prontuarios').addEventListener('click', () => {
    // Mantém o botão aceso, sem injetar HTML estático
    changeView(null, 'btn-prontuarios'); 
    // Chama a função que constrói o formulário
    renderizarProntuarios(db, mainContent); 
});

// 9. Inicializa a página
changeView(viewVazia, 'btn-dashboard');
monitorarPacientesAtivos();
monitorarConsultasMarcadas();