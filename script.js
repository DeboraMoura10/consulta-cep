
const formulario = document.getElementById("formulario");
const campoCep = document.getElementById("cep");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const cep = campoCep.value.replace(/\D/g, "");

    resultado.hidden = true;
    mensagem.textContent = "";

    if (!/^\d{8}$/.test(cep)) {
        mensagem.textContent = "Digite um CEP válido com 8 números.";
        return;
    }

    try {
        mensagem.textContent = "Buscando endereço...";

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error("Falha na consulta.");
        }

        const dados = await resposta.json();

        if (dados.erro) {
            throw new Error("CEP não encontrado.");
        }

        document.getElementById("rua").textContent =
            dados.logradouro || "Não informado";

        document.getElementById("bairro").textContent =
            dados.bairro || "Não informado";

        document.getElementById("cidade").textContent =
            dados.localidade;

        document.getElementById("estado").textContent =
            dados.uf;

        resultado.hidden = false;
        mensagem.textContent = "Endereço encontrado com sucesso!";

    } catch (erro) {
        mensagem.textContent =
            "Não foi possível consultar o CEP. Confira o número e tente novamente.";
    }
});
