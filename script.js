/**
 * Calculadora Nuovo - Simulador de Financiamento Paymobi
 * Uso Interno para Colaboradores
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do formulário
    const modeloCelularInput = document.getElementById('modeloCelular');
    const precoCelularInput = document.getElementById('precoCelular');
    const entradaInput = document.getElementById('entrada');
    const taxaMesInput = document.getElementById('taxaMes');
    const numeroParcelasInput = document.getElementById('numeroParcelas');
    const calcularBtn = document.getElementById('calcularBtn');

    // Elementos de exibição
    const valorEntradaSpan = document.getElementById('valorEntrada');
    const pagamentoParcelaSpan = document.getElementById('pagamentoParcela');
    const totalFinanciamentoSpan = document.getElementById('totalFinanciamento');

    // Tabela de amortização
    const amortizationSection = document.getElementById('amortizationSection');
    const amortizationTableBody = document.querySelector('#amortizationTable tbody');
    const totalJurosSpan = document.getElementById('totalJuros');
    const totalAmortizacaoSpan = document.getElementById('totalAmortizacao');
    const totalPagamentoSpan = document.getElementById('totalPagamento');
    const toggleTableBtn = document.getElementById('toggleTableBtn');

    // Botões de cópia rápida
    const copiarResumoBtn = document.getElementById('copiarResumoBtn');
    const copiarTotalBtn = document.getElementById('copiarTotalBtn');

    // Seletor de plataforma com caixa slide em vidro e ícones que acendem
    const platformGlider = document.getElementById('platformGlider');
    const btnPlataformaAndroid = document.getElementById('btnPlataformaAndroid');
    const btnPlataformaApple = document.getElementById('btnPlataformaApple');
    const iconeAndroid = document.getElementById('iconeAndroid');
    const iconeApple = document.getElementById('iconeApple');
    const labelAndroid = document.getElementById('labelAndroid');
    const labelApple = document.getElementById('labelApple');
    const badgeRegraEntrada = document.getElementById('badgeRegraEntrada');
    let plataformaSelecionada = 'Android';
    let entradaManualMaior = false;

    /**
     * Limpa todos os dados preenchidos e resultados calculados
     */
    function limparFormularioEResultados() {
        if (modeloCelularInput) {
            modeloCelularInput.value = '';
            modeloCelularInput.classList.remove('border-rose-500', 'ring-2', 'ring-rose-400');
        }
        if (precoCelularInput) {
            precoCelularInput.value = '';
        }
        if (entradaInput) {
            entradaInput.value = '';
        }
        if (numeroParcelasInput) {
            numeroParcelasInput.selectedIndex = 0;
        }

        if (valorEntradaSpan) valorEntradaSpan.textContent = 'R$ 0,00';
        if (pagamentoParcelaSpan) pagamentoParcelaSpan.textContent = 'R$ 0,00';
        if (totalFinanciamentoSpan) totalFinanciamentoSpan.textContent = 'R$ 0,00';

        if (amortizationTableBody) amortizationTableBody.innerHTML = '';
        if (totalJurosSpan) totalJurosSpan.textContent = '';
        if (totalAmortizacaoSpan) totalAmortizacaoSpan.textContent = '';
        if (totalPagamentoSpan) totalPagamentoSpan.textContent = '';

        ultimoCalculo = null;
        entradaManualMaior = false;

        if (copiarResumoBtn) {
            copiarResumoBtn.classList.add('hidden');
        }
    }

    function setPlataforma(plataforma, isInitial = false) {
        // Se clicar no botão que já está ativo, não faz nada e preserva os dados
        if (!isInitial && plataformaSelecionada === plataforma) {
            return;
        }

        // Ao alternar entre plataformas, limpa os dados preenchidos
        if (!isInitial && plataformaSelecionada !== plataforma) {
            limparFormularioEResultados();
        }

        plataformaSelecionada = plataforma;

        if (plataforma === 'Android') {
            // Desliza a caixa de vidro para a esquerda (posição Android)
            if (platformGlider) {
                platformGlider.style.transform = 'translateX(0%)';
            }

            // Android ACENDE (Verde vibrante com brilho)
            if (iconeAndroid) {
                iconeAndroid.style.color = '#10b981';
                iconeAndroid.style.filter = 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.85))';
                iconeAndroid.style.opacity = '1';
                iconeAndroid.style.transform = 'scale(1.15)';
            }
            if (labelAndroid) {
                labelAndroid.style.color = '#047857';
                labelAndroid.style.opacity = '1';
                labelAndroid.style.fontWeight = '700';
            }

            // Apple APAGA (Cinza fraco apagado)
            if (iconeApple) {
                iconeApple.style.color = '#64748b';
                iconeApple.style.filter = 'none';
                iconeApple.style.opacity = '0.45';
                iconeApple.style.transform = 'scale(0.92)';
            }
            if (labelApple) {
                labelApple.style.color = '#64748b';
                labelApple.style.opacity = '0.5';
                labelApple.style.fontWeight = '500';
            }

            if (btnPlataformaAndroid) btnPlataformaAndroid.setAttribute('aria-pressed', 'true');
            if (btnPlataformaApple) btnPlataformaApple.setAttribute('aria-pressed', 'false');

            if (modeloCelularInput) {
                modeloCelularInput.placeholder = 'Ex: Honor X7D 8/256';
            }
            if (entradaInput) {
                entradaInput.placeholder = 'digite o valor da entrada (opcional)';
            }
            if (badgeRegraEntrada) {
                badgeRegraEntrada.classList.add('hidden');
            }
        } else {
            // Desliza a caixa de vidro para a direita (posição Apple)
            if (platformGlider) {
                platformGlider.style.transform = 'translateX(100%)';
            }

            // Apple ACENDE (Preto intenso com profundidade)
            if (iconeApple) {
                iconeApple.style.color = '#000000';
                iconeApple.style.filter = 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.45))';
                iconeApple.style.opacity = '1';
                iconeApple.style.transform = 'scale(1.15)';
            }
            if (labelApple) {
                labelApple.style.color = '#000000';
                labelApple.style.opacity = '1';
                labelApple.style.fontWeight = '800';
            }

            // Android APAGA (Cinza fraco apagado)
            if (iconeAndroid) {
                iconeAndroid.style.color = '#64748b';
                iconeAndroid.style.filter = 'none';
                iconeAndroid.style.opacity = '0.45';
                iconeAndroid.style.transform = 'scale(0.92)';
            }
            if (labelAndroid) {
                labelAndroid.style.color = '#64748b';
                labelAndroid.style.opacity = '0.5';
                labelAndroid.style.fontWeight = '500';
            }

            if (btnPlataformaAndroid) btnPlataformaAndroid.setAttribute('aria-pressed', 'false');
            if (btnPlataformaApple) btnPlataformaApple.setAttribute('aria-pressed', 'true');

            if (modeloCelularInput) {
                modeloCelularInput.placeholder = 'Ex: iPhone 13 128GB';
            }
            if (entradaInput) {
                entradaInput.placeholder = 'Mínimo de 40% do aparelho';
            }
            if (badgeRegraEntrada) {
                badgeRegraEntrada.classList.remove('hidden');
            }
        }
    }

    if (btnPlataformaAndroid) {
        btnPlataformaAndroid.addEventListener('click', () => setPlataforma('Android'));
    }
    if (btnPlataformaApple) {
        btnPlataformaApple.addEventListener('click', () => setPlataforma('Apple'));
    }

    // Inicialização do estado visual dos botões
    setPlataforma('Android', true);

    // Modal de alertas
    const messageBox = document.getElementById('messageBox');
    const messageTitle = document.getElementById('messageTitle');
    const messageText = document.getElementById('messageText');
    const messageOkBtn = document.getElementById('messageOkBtn');

    // Armazena dados da última simulação realizada
    let ultimoCalculo = null;

    /**
     * Formata um número para o padrão brasileiro (ex: 1250.5 -> "1.250,50")
     */
    function formatNumber(value) {
        return Number(value || 0).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    /**
     * Extrai valor float de uma string formatada
     */
    function parseCurrency(str) {
        if (!str || typeof str !== 'string') return 0;
        const cleaned = str.replace(/[^\d]/g, '');
        if (!cleaned) return 0;
        return parseFloat(cleaned) / 100;
    }

    /**
     * Máscara monetária dinâmica em tempo real (R$ 0,00)
     */
    function applyCurrencyMask(input) {
        input.addEventListener('input', (e) => {
            const digits = e.target.value.replace(/\D/g, '');
            if (digits === '') {
                e.target.value = '';
                return;
            }
            const floatVal = parseFloat(digits) / 100;
            e.target.value = `R$ ${formatNumber(floatVal)}`;
        });
    }

    applyCurrencyMask(precoCelularInput);
    applyCurrencyMask(entradaInput);

    /**
     * Regra Apple: O preço do celular estipula a entrada mínima de 40%
     */
    if (precoCelularInput) {
        precoCelularInput.addEventListener('input', () => {
            if (plataformaSelecionada === 'Apple') {
                const preco = parseCurrency(precoCelularInput.value);
                if (preco > 0) {
                    const minEntrada = Math.round(preco * 0.40 * 100) / 100;
                    const entradaAtual = parseCurrency(entradaInput.value);
                    if (!entradaManualMaior || entradaAtual < minEntrada) {
                        entradaInput.value = `R$ ${formatNumber(minEntrada)}`;
                        if (entradaAtual < minEntrada) {
                            entradaManualMaior = false;
                        }
                    }
                } else {
                    if (!entradaManualMaior) {
                        entradaInput.value = '';
                    }
                }
            }
        });
    }

    /**
     * Regra Apple: Permite entrada maior que 40%, mas não permite menor que 40%
     */
    if (entradaInput) {
        entradaInput.addEventListener('input', () => {
            if (plataformaSelecionada === 'Apple') {
                const preco = parseCurrency(precoCelularInput.value);
                if (preco > 0) {
                    const minEntrada = Math.round(preco * 0.40 * 100) / 100;
                    const entradaAtual = parseCurrency(entradaInput.value);
                    if (entradaAtual > minEntrada) {
                        entradaManualMaior = true;
                    } else if (entradaAtual <= minEntrada) {
                        entradaManualMaior = false;
                    }
                }
            }
        });

        entradaInput.addEventListener('blur', () => {
            if (plataformaSelecionada === 'Apple') {
                const preco = parseCurrency(precoCelularInput.value);
                if (preco > 0) {
                    const minEntrada = Math.round(preco * 0.40 * 100) / 100;
                    const entradaAtual = parseCurrency(entradaInput.value);
                    if (!entradaInput.value || entradaAtual < minEntrada - 0.001) {
                        entradaInput.value = `R$ ${formatNumber(minEntrada)}`;
                        entradaManualMaior = false;
                        showMessage(
                            `Para aparelhos Apple, o valor mínimo de entrada é de 40% (R$ ${formatNumber(minEntrada)}). Não é permitido alterar para um valor menor.`,
                            'Entrada Mínima Apple'
                        );
                    }
                } else if (entradaInput.value && parseCurrency(entradaInput.value) > 0) {
                    showMessage(
                        'Por favor, informe primeiro o Preço do Celular para estipular a entrada mínima de 40%.',
                        'Preço Necessário'
                    );
                    entradaInput.value = '';
                    if (precoCelularInput) precoCelularInput.focus();
                }
            }
        });
    }

    /**
     * Exibe o modal de alerta amigável
     */
    function showMessage(message, title = 'Atenção') {
        if (messageTitle) messageTitle.textContent = title;
        if (messageText) messageText.textContent = message;
        if (messageBox) {
            messageBox.classList.add('active');
            messageOkBtn.focus();
        }
    }

    /**
     * Fecha o modal de alerta
     */
    function closeMessage() {
        if (messageBox) {
            messageBox.classList.remove('active');
        }
    }

    if (messageOkBtn) messageOkBtn.addEventListener('click', closeMessage);
    if (messageBox) {
        messageBox.addEventListener('click', (e) => {
            if (e.target === messageBox) closeMessage();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && messageBox && messageBox.classList.contains('active')) {
            closeMessage();
        }
    });

    /**
     * Permite disparar o cálculo teclando Enter nos campos
     */
    [modeloCelularInput, precoCelularInput, entradaInput].forEach((input) => {
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    calculateAmortization();
                }
            });
        }
    });

    if (calcularBtn) {
        calcularBtn.addEventListener('click', calculateAmortization);
    }

    /**
     * Alterna a visibilidade da Tabela de Amortização
     */
    if (toggleTableBtn && amortizationSection) {
        toggleTableBtn.addEventListener('click', () => {
            const isHidden = amortizationSection.classList.contains('hidden');
            if (isHidden) {
                amortizationSection.classList.remove('hidden');
                toggleTableBtn.innerHTML = `
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"></path>
                    </svg>
                    Ocultar Tabela de Amortização
                `;
            } else {
                amortizationSection.classList.add('hidden');
                toggleTableBtn.innerHTML = `
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Ver Tabela de Amortização
                `;
            }
        });
    }

    /**
     * Copia texto com suporte universal (Clipboard API com fallback seguro via execCommand)
     */
    async function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (err) {
                // Fallback caso a permissão do clipboard seja negada
            }
        }

        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            textArea.setAttribute('readonly', '');
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        } catch (err) {
            return false;
        }
    }

    /**
     * Invalida simulação anterior ao alterar campos do formulário para evitar envio de dados defasados
     */
    function invalidarCalculoAnterior() {
        if (ultimoCalculo !== null) {
            ultimoCalculo = null;
            if (copiarResumoBtn) {
                copiarResumoBtn.classList.add('hidden');
            }
        }
    }

    [modeloCelularInput, precoCelularInput, entradaInput, numeroParcelasInput].forEach((el) => {
        if (el) {
            el.addEventListener('input', invalidarCalculoAnterior);
            el.addEventListener('change', invalidarCalculoAnterior);
        }
    });

    /**
     * Cálculo de amortização seguindo exatamente a regra original
     */
    function calculateAmortization() {
        const modeloCelular = modeloCelularInput ? modeloCelularInput.value.trim() : '';
        const precoCelular = parseCurrency(precoCelularInput.value);
        const entrada = parseCurrency(entradaInput.value); // Padrão 0 caso vazio
        const taxaMensal = parseFloat(taxaMesInput.value) / 100;
        const numeroParcelas = parseInt(numeroParcelasInput.value, 10);

        // Validação de dados de entrada: Modelo do Celular é obrigatório
        if (!modeloCelular) {
            showMessage('Por favor, informe o Modelo do Celular antes de calcular os valores.', 'Campo Obrigatório');
            if (modeloCelularInput) {
                modeloCelularInput.focus();
                modeloCelularInput.classList.add('border-rose-500', 'ring-2', 'ring-rose-400');
                setTimeout(() => {
                    modeloCelularInput.classList.remove('border-rose-500', 'ring-2', 'ring-rose-400');
                }, 3000);
            }
            return;
        }

        // Validação de dados de entrada: Preço do Celular
        if (isNaN(precoCelular) || precoCelular <= 0) {
            showMessage('Por favor, insira o preço do celular.', 'Campo Obrigatório');
            precoCelularInput.focus();
            return;
        }

        // Validação da Entrada conforme a plataforma
        if (plataformaSelecionada === 'Apple') {
            const minEntrada = Math.round(precoCelular * 0.40 * 100) / 100;
            if (isNaN(entrada) || entrada < minEntrada - 0.001) {
                entradaInput.value = `R$ ${formatNumber(minEntrada)}`;
                entradaManualMaior = false;
                showMessage(
                    `Para aparelhos Apple, a entrada mínima é de 40% (R$ ${formatNumber(minEntrada)}). Ajustamos o campo para o valor mínimo permitido.`,
                    'Entrada Mínima Apple'
                );
                return;
            }
        } else {
            if (isNaN(entrada) || entrada < 0) {
                showMessage('O valor da entrada não pode ser negativo.', 'Valor Inválido');
                entradaInput.focus();
                return;
            }
        }

        if (entrada >= precoCelular) {
            showMessage('O valor da entrada não pode ser igual ou maior que o preço do crediário.', 'Atenção');
            entradaInput.focus();
            return;
        }

        const valorFinanciado = precoCelular - entrada;
        valorEntradaSpan.textContent = `R$ ${formatNumber(entrada)}`;

        // Limpa os resultados anteriores da tabela
        amortizationTableBody.innerHTML = '';
        let totalJuros = 0;
        let totalAmortizacao = 0;
        let totalPagamento = 0;
        let saldoDevedor = valorFinanciado;

        // Cálculo do pagamento mensal usando a fórmula da Tabela Price
        let pagamentoMensal;
        if (taxaMensal === 0) {
            pagamentoMensal = valorFinanciado / numeroParcelas;
        } else {
            pagamentoMensal = valorFinanciado * (taxaMensal * Math.pow((1 + taxaMensal), numeroParcelas)) / (Math.pow((1 + taxaMensal), numeroParcelas) - 1);
        }

        for (let i = 1; i <= numeroParcelas; i++) {
            const juros = saldoDevedor * taxaMensal;
            let amortizacao = pagamentoMensal - juros;
            
            if (i === numeroParcelas) {
                amortizacao = saldoDevedor;
                pagamentoMensal = juros + amortizacao;
            }

            saldoDevedor -= amortizacao;
            if (saldoDevedor < 0.01 && i === numeroParcelas) { 
                saldoDevedor = 0;
            }

            totalJuros += juros;
            totalAmortizacao += amortizacao;
            totalPagamento += pagamentoMensal;

            const row = amortizationTableBody.insertRow();
            row.className = i % 2 === 0 ? 'bg-slate-50' : 'bg-white';

            const cellNum = row.insertCell();
            cellNum.className = 'py-2.5 px-3 text-left font-medium text-slate-700';
            cellNum.textContent = i;

            const cellJuros = row.insertCell();
            cellJuros.className = 'py-2.5 px-3 text-right text-slate-600';
            cellJuros.textContent = `R$ ${formatNumber(juros)}`;

            const cellAmort = row.insertCell();
            cellAmort.className = 'py-2.5 px-3 text-right text-slate-600';
            cellAmort.textContent = `R$ ${formatNumber(amortizacao)}`;

            const cellPag = row.insertCell();
            cellPag.className = 'py-2.5 px-3 text-right font-semibold text-slate-800';
            cellPag.textContent = `R$ ${formatNumber(pagamentoMensal)}`;

            const cellSaldo = row.insertCell();
            cellSaldo.className = 'py-2.5 px-3 text-right text-slate-500';
            cellSaldo.textContent = `R$ ${formatNumber(saldoDevedor)}`;
        }

        // Valor da Parcela por Mês (seguindo a regra original: (totalPagamento / numeroParcelas) * 2)
        const valorParcela = (totalPagamento / numeroParcelas) * 2;
        pagamentoParcelaSpan.textContent = `R$ ${formatNumber(valorParcela)}`;

        totalFinanciamentoSpan.textContent = `R$ ${formatNumber(totalPagamento)}`;
        totalJurosSpan.textContent = `R$ ${formatNumber(totalJuros)}`;
        totalAmortizacaoSpan.textContent = `R$ ${formatNumber(totalAmortizacao)}`;
        totalPagamentoSpan.textContent = `R$ ${formatNumber(totalPagamento)}`;

        // Texto do prazo selecionado
        const prazoLabel = numeroParcelasInput.options[numeroParcelasInput.selectedIndex].text.trim();

        // Guarda os dados para o botão de cópia
        ultimoCalculo = {
            plataforma: plataformaSelecionada,
            modeloCelular,
            precoCelular,
            entrada,
            valorParcela,
            totalPagamento,
            prazoLabel
        };

        if (copiarResumoBtn) {
            copiarResumoBtn.classList.remove('hidden');
        }
    }

    /**
     * Copia o resumo dos dados para o colaborador colar na Paymobi
     */
    if (copiarResumoBtn) {
        copiarResumoBtn.addEventListener('click', async () => {
            if (!ultimoCalculo) return;

            const now = new Date();
            const dataHora = `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
            const iconeAparelho = ultimoCalculo.plataforma === 'Apple' ? '🍎' : '📱';
            const nomeAparelho = ultimoCalculo.modeloCelular || (ultimoCalculo.plataforma === 'Apple' ? 'iPhone' : 'Smartphone Android');

            const textoResumo = 
`🟢 *RESUMO DE FINANCIAMENTO • PAYMOBI* 🟢
━━━━━━━━━━━━━━━━━━━━━━━
${iconeAparelho} *Aparelho:* ${nomeAparelho}
📅 *Data:* ${dataHora}
━━━━━━━━━━━━━━━━━━━━━━━

📋 *DADOS DA NEGOCIAÇÃO:*
▫️ *Preço do Aparelho:* R$ ${formatNumber(ultimoCalculo.precoCelular)}
▫️ *Valor da Entrada:* R$ ${formatNumber(ultimoCalculo.entrada)}
▫️ *Prazo Escolhido:* ${ultimoCalculo.prazoLabel}

💳 *PLANO DE PAGAMENTO:*
▫️ *Parcela por Mês:* R$ ${formatNumber(ultimoCalculo.valorParcela)}
▫️ *Total do Financiamento:* R$ ${formatNumber(ultimoCalculo.totalPagamento)}
━━━━━━━━━━━━━━━━━━━━━━━
💰 *VALOR DA PARCELA MENSAL:*
👉 *R$ ${formatNumber(ultimoCalculo.valorParcela)} / mês*
━━━━━━━━━━━━━━━━━━━━━━━
_Calculadora Nuovo • Gestão de Vendas_ ✨`;

            const copiado = await copyToClipboard(textoResumo);
            if (copiado) {
                const originalContent = copiarResumoBtn.innerHTML;
                copiarResumoBtn.innerHTML = `
                    <span class="text-lg sm:text-xl">✅</span>
                    <span class="font-bold">Resumo Copiado com Sucesso!</span>
                    <span class="text-lg sm:text-xl">🎉</span>
                `;
                copiarResumoBtn.classList.add('copiado-sucesso');

                setTimeout(() => {
                    copiarResumoBtn.innerHTML = originalContent;
                    copiarResumoBtn.classList.remove('copiado-sucesso');
                }, 2000);
            } else {
                showMessage('Não foi possível copiar automaticamente para a área de transferência.', 'Erro ao Copiar');
            }
        });
    }

    /**
     * Copia apenas o valor do Total do Financiamento ao clicar no ícone
     */
    if (copiarTotalBtn) {
        copiarTotalBtn.addEventListener('click', async () => {
            const textoTotal = totalFinanciamentoSpan ? totalFinanciamentoSpan.textContent.trim() : '';
            if (!textoTotal || textoTotal === 'R$ 0,00') {
                showMessage('Calcule os valores primeiro para copiar o Total do Financiamento.', 'Atenção');
                return;
            }

            const copiado = await copyToClipboard(textoTotal);
            if (copiado) {
                const originalIcon = copiarTotalBtn.innerHTML;
                copiarTotalBtn.innerHTML = `
                    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                `;
                copiarTotalBtn.classList.add('bg-emerald-50');

                setTimeout(() => {
                    copiarTotalBtn.innerHTML = originalIcon;
                    copiarTotalBtn.classList.remove('bg-emerald-50');
                }, 1500);
            } else {
                showMessage('Não foi possível copiar o valor.', 'Erro ao Copiar');
            }
        });
    }
});
