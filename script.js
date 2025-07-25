document.addEventListener('DOMContentLoaded', () => {
    const precoCelularInput = document.getElementById('precoCelular');
    const entradaInput = document.getElementById('entrada');
    const taxaMesInput = document.getElementById('taxaMes');
    const numeroParcelasInput = document.getElementById('numeroParcelas');
    const calcularBtn = document.getElementById('calcularBtn');
    const valorFinanciadoSpan = document.getElementById('valorFinanciado');
    const amortizationTableBody = document.querySelector('#amortizationTable tbody');
    const totalJurosSpan = document.getElementById('totalJuros');
    const totalAmortizacaoSpan = document.getElementById('totalAmortizacao');
    const totalPagamentoSpan = document.getElementById('totalPagamento');
    const pagamentoMensalMultiplicadoSpan = document.getElementById('pagamentoMensalMultiplicado');

    calcularBtn.addEventListener('click', calculateAmortization);

    function calculateAmortization() {
        const precoCelular = parseFloat(precoCelularInput.value);
        const entrada = parseFloat(entradaInput.value);
        const taxaMes = parseFloat(taxaMesInput.value) / 100; // Convert to decimal
        const numeroParcelas = parseInt(numeroParcelasInput.value);

        if (isNaN(precoCelular) || isNaN(entrada) || isNaN(taxaMes) || isNaN(numeroParcelas) || precoCelular <= 0 || numeroParcelas <= 0) {
            alert('Por favor, insira valores válidos para todos os campos.');
            return;
        }

        const valorFinanciado = precoCelular - entrada;
        valorFinanciadoSpan.textContent = `R$ ${valorFinanciado.toFixed(2)}`;


        
        // Clear previous results
        amortizationTableBody.innerHTML = '';
        let totalJuros = 0;
        let totalAmortizacao = 0;
        let totalPagamento = 0;

        let saldoDevedor = valorFinanciado;

        // Calculate fixed payment using PMT formula
        // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
        // M = Monthly Payment, P = Principal Loan Amount, i = Monthly Interest Rate, n = Number of Payments
        let pagamentoMensal;
        if (taxaMes === 0) {
            pagamentoMensal = valorFinanciado / numeroParcelas;
        } else {
            pagamentoMensal = valorFinanciado * (taxaMes * Math.pow((1 + taxaMes), numeroParcelas)) / (Math.pow((1 + taxaMes), numeroParcelas) - 1);
        }

        for (let i = 1; i <= numeroParcelas; i++) {
            const juros = saldoDevedor * taxaMes;
            let amortizacao = pagamentoMensal - juros;
            
            // Adjust last payment to clear the balance exactly
            if (i === numeroParcelas) {
                amortizacao = saldoDevedor;
                pagamentoMensal = juros + amortizacao; // Recalculate last payment
            }

            saldoDevedor -= amortizacao;
            // Ensure saldoDevedor doesn't go negative due to floating point inaccuracies
            if (saldoDevedor < 0.01 && i === numeroParcelas) { // A small tolerance for near zero
                saldoDevedor = 0;
            }


            totalJuros += juros;
            totalAmortizacao += amortizacao;
            totalPagamento += pagamentoMensal;

            const row = amortizationTableBody.insertRow();
            row.insertCell().textContent = i;
            row.insertCell().textContent = `R$ ${juros.toFixed(2)}`;
            row.insertCell().textContent = `R$ ${amortizacao.toFixed(2)}`;
            row.insertCell().textContent = `R$ ${pagamentoMensal.toFixed(2)}`;
            row.insertCell().textContent = `R$ ${saldoDevedor.toFixed(2)}`;
        }

        totalJurosSpan.textContent = `R$ ${totalJuros.toFixed(2)}`;
        totalAmortizacaoSpan.textContent = `R$ ${totalAmortizacao.toFixed(2)}`;
        totalPagamentoSpan.textContent = `R$ ${totalPagamento.toFixed(2)}`;

            }

    // Initial calculation on page load (optional, but good for seeing default values)
    calculateAmortization();

    // Calcula o pagamento mensal multiplicado por 2
const pagamentoMensalX2 = pagamentoMensal * 2;
pagamentoMensalMultiplicadoSpan.textContent = `R$ ${pagamentoMensalX2.toFixed(2)}`;
});