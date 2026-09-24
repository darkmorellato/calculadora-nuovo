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
  - No Android não há teto de preço.
- **Campo Valor Restante (opcional, somente na aba Apple):**
  - Novo campo na mesma linha da **Entrada**, exibido apenas quando a plataforma Apple está selecionada, com máscara monetária `R$ 0,00`.
  - Quando preenchido, o valor é somado e exibido dentro do campo **Entrada** (e no resultado "Valor da Entrada Paga"), com um resumo da conta logo abaixo dos campos.
- **Identificação do Aparelho:** Campo para informar o **Modelo do Celular** (ex: *Honor X7D 8/256* ou *iPhone 13 128GB*).
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
