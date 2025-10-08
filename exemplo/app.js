// Função para gerar dados mockados
function gerarDadosMockados() {
    const now = new Date();
    
    return {
        temp: (Math.random() * 15 + 20).toFixed(1), // 20-35°C
        umid: (Math.random() * 30 + 50).toFixed(1), // 50-80%
        timestamp: now.toISOString()
    };
}

// Função para salvar leitura no localStorage
function salvarLeitura(leitura) {
    try {
        // Recuperar leituras existentes ou inicializar array vazio
        const leiturasSalvas = JSON.parse(localStorage.getItem('leiturasSensor')) || [];
        
        // Adicionar nova leitura no início do array
        leiturasSalvas.unshift(leitura);
        
        // Manter apenas as últimas 50 leituras para não encher o localStorage
        if (leiturasSalvas.length > 50) {
            leiturasSalvas.splice(50);
        }
        
        // Salvar no localStorage
        localStorage.setItem('leiturasSensor', JSON.stringify(leiturasSalvas));
        
        return leiturasSalvas;
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        return [];
    }
}

// Função para carregar leituras do localStorage
function carregarDoLocalStorage() {
    try {
        const leiturasSalvas = JSON.parse(localStorage.getItem('leiturasSensor')) || [];
        return leiturasSalvas;
    } catch (error) {
        console.error('Erro ao carregar do localStorage:', error);
        return [];
    }
}

// Função para adicionar nova leitura e atualizar display
async function adicionarNovaLeitura() {
    try {
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Gerar novo dado mockado
        const novaLeitura = gerarDadosMockados();
        
        // Salvar no localStorage
        const todasLeituras = salvarLeitura(novaLeitura);
        
        return todasLeituras;
        
    } catch (error) {
        console.error("Erro ao adicionar leitura:", error);
        return [];
    }
}

// Função para carregar e exibir leituras
async function carregarLeituras() {
    try {
        // Adicionar nova leitura a cada chamada
        const leituras = await adicionarNovaLeitura();
        
        // Ordenar por timestamp (mais recentes primeiro)
        leituras.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Pegar apenas os 5 mais recentes para exibir na tabela
        const ultimasLeituras = leituras.slice(0, 5);
        
        // Atualizar a tabela
        const tbody = document.querySelector("#tabela-body");
        tbody.innerHTML = "";
        
        if (ultimasLeituras.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="3" class="loading">Nenhum dado disponível</td>
                </tr>
            `;
        } else {
            ultimasLeituras.forEach(l => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>
                        <div style="display: flex; align-items: center;">
                            <i class="fas fa-thermometer-half" style="margin-right: 8px; color: #60a5fa;"></i>
                            ${l.temp}°C
                        </div>
                    </td>
                    <td>
                        <div style="display: flex; align-items: center;">
                            <i class="fas fa-tint" style="margin-right: 8px; color: #34d399;"></i>
                            ${l.umid}%
                        </div>
                    </td>
                    <td style="font-size: 0.9rem;">${new Date(l.timestamp).toLocaleString()}</td>
                `;
                tbody.appendChild(tr);
            });
        }
        
        // Atualizar estatísticas
        document.getElementById("total-registros").textContent = `${leituras.length} registros no total`;
        
        // Calcular médias
        if (leituras.length > 0) {
            const avgTemp = leituras.reduce((sum, l) => sum + parseFloat(l.temp), 0) / leituras.length;
            const avgHumidity = leituras.reduce((sum, l) => sum + parseFloat(l.umid), 0) / leituras.length;
            
            document.getElementById("avg-temp").textContent = `${avgTemp.toFixed(1)}°C`;
            document.getElementById("avg-humidity").textContent = `${avgHumidity.toFixed(1)}%`;
        }
        
        // Atualizar último update
        document.getElementById("last-update").textContent = new Date().toLocaleTimeString();
        
        // Log para debug (opcional)
        console.log('Leituras salvas:', leituras.length);
        console.log('Última leitura:', ultimasLeituras[0]);
        
    } catch (error) {
        console.error("Erro ao carregar leituras:", error);
        const tbody = document.querySelector("#tabela-body");
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="error">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>Erro ao carregar dados
                </td>
            </tr>
        `;
    }
}

// Função para limpar todos os dados do localStorage
function limparDados() {
    localStorage.removeItem('leiturasSensor');
    console.log('Dados do localStorage limpos');
    carregarLeituras(); // Recarregar para mostrar estado vazio
}

// Função para animar o botão de atualização
function animarAtualizacao() {
    const btn = document.getElementById("refresh-btn");
    const icon = btn.querySelector("i");
    
    btn.disabled = true;
    icon.classList.add("refresh-animation");
    
    setTimeout(() => {
        btn.disabled = false;
        icon.classList.remove("refresh-animation");
    }, 1000);
}

// Carregar dados ao iniciar
document.addEventListener("DOMContentLoaded", () => {
    // Verificar se já existem dados no localStorage
    const dadosExistentes = carregarDoLocalStorage();
    
    if (dadosExistentes.length === 0) {
        // Se não há dados, criar um inicial
        console.log('Inicializando dados no localStorage...');
        adicionarNovaLeitura();
    } else {
        console.log(`Carregados ${dadosExistentes.length} registros existentes`);
        carregarLeituras();
    }
    
    // Atualizar a cada 2 segundos (adiciona nova leitura)
    setInterval(carregarLeituras, 2000);
    
    // Configurar botão de atualização
    document.getElementById("refresh-btn").addEventListener("click", () => {
        animarAtualizacao();
        carregarLeituras();
    });
    
    // Botão para limpar dados (opcional - pode adicionar no HTML)
    // <button id="limpar-btn" style="margin-top: 10px;">Limpar Dados</button>
    const limparBtn = document.getElementById("limpar-btn");
    if (limparBtn) {
        limparBtn.addEventListener("click", limparDados);
    }
});