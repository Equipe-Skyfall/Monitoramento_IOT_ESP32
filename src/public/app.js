// Função para carregar leituras da API
async function carregarLeituras() {
    try {
        const res = await fetch("/api/leituras");
        
        if (!res.ok) {
            throw new Error(`Erro HTTP: ${res.status}`);
        }
        
        const leituras = await res.json();
        
        // Ordenar por timestamp (mais recentes primeiro)
        leituras.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Pegar apenas os 5 mais recentes
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
            const avgTemp = leituras.reduce((sum, l) => sum + l.temp, 0) / leituras.length;
            const avgHumidity = leituras.reduce((sum, l) => sum + l.umid, 0) / leituras.length;
            
            document.getElementById("avg-temp").textContent = `${avgTemp.toFixed(1)}°C`;
            document.getElementById("avg-humidity").textContent = `${avgHumidity.toFixed(1)}%`;
        }
        
        // Atualizar último update
        document.getElementById("last-update").textContent = new Date().toLocaleTimeString();
        
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
    carregarLeituras();
    
    // Atualizar a cada 5 segundos
    setInterval(carregarLeituras, 3000);
    
    // Configurar botão de atualização
    document.getElementById("refresh-btn").addEventListener("click", () => {
        animarAtualizacao();
        carregarLeituras();
    });
});