document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000/locais";
    const form = document.getElementById("localForm");
    const locaisDiv = document.getElementById("locais");

    async function carregarLocais() {
        const resposta = await fetch(apiUrl);
        const locais = await resposta.json();
        locaisDiv.innerHTML = "";
        locais.forEach(local => {
            const localElemento = document.createElement("div");
            localElemento.classList.add("local-card");
            localElemento.innerHTML = `
                <h2>${local.titulo}</h2>
                <p>${local.descricao}</p>
                <img src="${local.foto}" alt="Imagem do local">
                <button onclick="editarLocal(${local.id})"><i class="fas fa-edit"></i> Editar</button>
                <button onclick="excluirLocal(${local.id})" style="background: #dc3545;"><i class="fas fa-trash"></i> Excluir</button>
            `;
            locaisDiv.appendChild(localElemento);
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("localId").value;
        const titulo = document.getElementById("titulo").value;
        const descricao = document.getElementById("descricao").value;
        const foto = document.getElementById("foto").value;
        const local = { titulo, descricao, foto };

        if (id) {
            await fetch(`${apiUrl}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(local) });
        } else {
            await fetch(apiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(local) });
        }
        form.reset();
        carregarLocais();
    });

    window.editarLocal = async (id) => {
        const resposta = await fetch(`${apiUrl}/${id}`);
        const local = await resposta.json();
        document.getElementById("localId").value = local.id;
        document.getElementById("titulo").value = local.titulo;
        document.getElementById("descricao").value = local.descricao;
        document.getElementById("foto").value = local.foto;
    };

    window.excluirLocal = async (id) => {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        carregarLocais();
    };

    carregarLocais();
});
