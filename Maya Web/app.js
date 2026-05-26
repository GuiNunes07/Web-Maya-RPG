import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

import { renderizarAgenda } from "./js/agenda.js";
import { renderizarProntuarios } from "./js/prontuarios.js";
import { renderizarExercicios } from "./js/exercicios.js";
import { renderizarComunicados } from "./js/comunicados.js";
import { renderizarPacientes } from "./js/pacientes.js";


// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCqjc6Tu1QB5IKmZ2g6da4U4Sjetq6rdVI",
    authDomain: "app-maya-3gl.firebaseapp.com",
    projectId: "app-maya-3gl",
    storageBucket: "app-maya-3gl.firebasestorage.app",
    messagingSenderId: "558329656563",
    appId: "1:558329656563:web:1398716fc15427d95c3386",
    measurementId: "G-2JYNDVJX8W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Captura de Elementos 
const mainContent = document.getElementById('main-content');
const menuItems = document.querySelectorAll('.menu-item');
const patientCountElement = document.getElementById('patient-count');
const agendaCountElement = document.getElementById('agenda-count');

// Função para monitorar pacientes (Firebase)
function monitorarPacientesAtivos() {
    const pacientesRef = collection(db, "Usuarios");
    onSnapshot(pacientesRef, (snapshot) => {
        if (patientCountElement) {
            patientCountElement.innerText = snapshot.size;
        }
    });
}

// Função para monitorar consultas marcadas (Firebase)
function monitorarConsultasMarcadas() {
    const agendaRef = collection(db, "Agendamentos");
    onSnapshot(agendaRef, (snapshot) => {
        if (agendaCountElement) {
            agendaCountElement.innerText = snapshot.size;
        }
    });
}

// Template de Tela Vazia Inicial (Com a mensagem "Clique em algum item...")
const viewVazia = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 300px; text-align: center;">
        <p style="color: #888; font-size: 1.1rem;">Clique em algum item para abrir os detalhes</p>
    </div>
`;

// Navegação Principal
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

// Programação dos botões das abas
document.getElementById('btn-dashboard').addEventListener('click', () => {
    changeView(viewVazia, 'btn-dashboard'); 
});

document.getElementById('btn-agenda').addEventListener('click', () => {
    changeView(null, 'btn-agenda'); 
    renderizarAgenda(db, mainContent); 
});

document.getElementById('btn-prontuarios').addEventListener('click', () => {
    changeView(null, 'btn-prontuarios'); 
    renderizarProntuarios(db, mainContent); 
});

document.getElementById('btn-exercicios').addEventListener('click', () => {
    changeView(null, 'btn-exercicios'); 
    renderizarExercicios(db, mainContent); 
}); 

document.getElementById('btn-comunicados').addEventListener('click', () => {
    changeView(null, 'btn-comunicados'); 
    renderizarComunicados(db, mainContent); 
});

document.getElementById('btn-pacientes').addEventListener('click', () => {
    changeView(null, 'btn-pacientes'); 
    renderizarPacientes(db, mainContent); 
});

// Inicializa a página
changeView(viewVazia, 'btn-dashboard');
monitorarPacientesAtivos();
monitorarConsultasMarcadas();