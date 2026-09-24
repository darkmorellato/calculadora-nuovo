# Calculadora Nuovo - Simulador de Financiamento Paymobi 📱

Aplicação web desenvolvida para uso interno de colaboradores, permitindo simular rapidamente os valores de crediário de smartphones na plataforma **Nuovo / Paymobi**.

---

## ✨ Características

- **Seleção de Plataforma (Android / Apple):** 
  - Botões no cabeçalho com caixa deslizante em **vidro autêntico (glass sem fundo sólido)** e ícones com efeito de iluminação ativa (verde brilhante para Android e preto profundo para Apple).
  - **Limpeza Automática:** Ao alternar entre Android e Apple, todos os dados preenchidos e resultados são limpos automaticamente para evitar inconsistências.
- **Regra de Entrada Mínima da Apple (40%):** 
  - Na seleção Apple, o preço do celular estipula a entrada mínima de 40%, preenchendo automaticamente o campo de entrada.
  - Não é permitido definir uma entrada inferior a 40%, mas entradas maiores são aceitas caso o cliente deseje.
  - No Android, a entrada permanece opcional (podendo ser R$ 0,00 ou qualquer valor).
- **Limite de Preço na Aba Apple (R$ 4.000,00):**
  - O campo **Preço Celular** é limitado a `R$ 4.000,00` somente quando a plataforma Apple está selecionada, exibindo badge, placeholder e aviso ao estourar o limite.
  - **Ícone de 💡 informação** no canto direito do rótulo abre um popover explicativo com a regra completa e um exemplo passo a passo (celular de R$ 5.500,00 → teto financiado R$ 4.000,00 + Valor Restante R$ 1.500,00).
  - No Android não há teto de preço e o ícone não aparece.
- **Campo Valor Restante (opcional, somente na aba Apple):**
  - Novo campo na mesma linha da **Entrada**, exibido apenas quando a plataforma Apple está selecionada, com máscara monetária `R$ 0,00`.
  - Quando preenchido, o valor é somado e exibido dentro do campo **Entrada** (e no resultado "Valor da Entrada Paga"), com um resumo da conta logo abaixo dos campos.
- **Identificação do Aparelho:** Campo para informar o **Modelo do Celular** (ex: *Honor X7D 8/256* ou *iPhone 13 128GB*).
- **Catálogo de Modelos Android (versionado no GitHub):**
  - Na aba Android aparece um **seletor de modelos** carregado do arquivo [`modelos-android.json`](./modelos-android.json) do repositório.
  - Escolher o modelo preenche **automaticamente** o preço do celular e a **entrada mínima**, além de atualizar o badge "Mínimo R$ ..." ao lado do campo Entrada.
  - A entrada pode ser **aumentada livremente**; se ficar abaixo do mínimo do modelo, é corrigida no sair do campo, com aviso.
  - Nome digitado manualmente também é reconhecido se existir no catálogo.
- **Botão "+" para cadastrar novos modelos (Área do Administrador):**
  - Ao lado do rótulo "Modelo do Celular" (somente Android), o botão **+ Modelo** abre um modal protegido por **senha de administrador**.
  - Após a senha, informe **modelo, preço e entrada** e clique em **Salvar no GitHub**: o modelo é gravado no `modelos-android.json` via API do GitHub (Contents API) com mensagem de commit automática.
  - Requer um **Personal Access Token** do GitHub com permissão *Contents: Read and write*; ele é pedido uma única vez e fica salvo **somente no localStorage do navegador**, nunca no repositório.
  - Botão de contingência **"Copiar JSON atualizado"** para colar manualmente no GitHub caso a API falhe.
  - ⚠️ A senha de administrador fica no código-fonte (site estático não tem backend) — serve para evitar erro de mão, não como segurança real.
- **Foco no Valor Mensal:** Apresenta de forma destacada o **Valor da Parcela a Pagar por Mês**, posicionado exatamente entre o valor de entrada e o total financiado.
- **Cópia Rápida Individual e Geral:**
  - Ícone de cópia direta ao lado do **Total do Financiamento**.
  - Botão estilizado com emojis para copiar o **Resumo Completo** formatado no padrão profissional para WhatsApp ou Paymobi.
- **Prazos Disponíveis:**
  - 3 meses (6 parcelas)
  - 6 meses (12 parcelas)
  - 9 meses (18 parcelas)
- **Taxa Fixa Oculta:** Taxa de 9,75% ao mês configurada internamente sem poluir a visão do colaborador.
- **Máscara Monetária Automática:** Digitação intuitiva em Real (`R$ 0,00`) com proteção contra falhas em separadores de milhar e centavos.
- **Design Glassmorphism com Preenchimentos Sólidos:**
  - O card principal da calculadora possui efeito **Frosted Glass** translúcido com desfoque profundo (`backdrop-filter`), reflexos de borda e sombra ambiental sobre a imagem de fundo `img/background.jpg`.
  - Todos os campos de preenchimento (inputs e caixas de dados) permanecem **100% sólidos em branco opaco**, sem transparência, garantindo legibilidade e contraste imediatos.
  - O botão de ação **"Calcular Valores"** e o card de destaque mensal adotam o tom **petrol teal metálico** do próprio plano de fundo com tipografia nítida em branco.

---

## 🚀 Como Executar

Basta abrir o arquivo [`index.html`](./index.html) em qualquer navegador web.

> **Importante:** para que o seletor de modelos Android carregue, sirva a pasta via HTTP
> (ex.: `python3 -m http.server`) ou publique no GitHub Pages — abrindo via `file://`
> o navegador bloqueia a leitura do `modelos-android.json`.

## 📂 Catálogo de modelos Android

O arquivo [`modelos-android.json`](./modelos-android.json) segue este formato:

```json
[
  { "modelo": "Samsung Galaxy A15 128GB", "preco": 1299, "entrada": 400 }
]
```

- `modelo`: nome exibido no seletor
- `preco`: preço do celular em reais
- `entrada`: **valor mínimo** da entrada (o vendedor pode aumentar, nunca diminuir)

Ele pode ser editado manualmente no GitHub ou pelo botão **+ Modelo** dentro da calculadora (aba Android).
