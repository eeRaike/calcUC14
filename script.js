class Calculator{
    constructor(displayElement){
        //Armazena o elemento do display da calculadora
        this.display = displayElement;
        //Sinalizador para controlar quando o display deve ser limpo após
        this.shouldClearDisplay = false;
    }

    appendToDisplay(value){
        //Se  o display mostrar '0' (e não for um ponto decimal)
        if (this.display.textContent === '0' && value !== '.') {
            //Substitui o zero pelo valor digitado
            this.display.textContent = value;
        }else if(this.shouldClearDisplay){
            //Mostrar o novo valor e reseta o sinalizador
            this.display.textContent = value;
            this.shouldClearDisplay = false;
        }
        //Caso normal = concatena o valor existente 
        else{
            this.display.textContent += value;
        }
    }

    clearDisplay(){
        //Resetar o display para '0'
        this.display.textContent = '0';
    }
    calculate(){
        try {
            // Substitui símbolos x e /
            const expression = this.display.textContent.replace(/x/g,'*');
            //Avalia a expressão matemática
            const result = eval(expression);
            //Mostra o resultado e ativa a sinalização/flag para limpar o próximo input
            this.display.textContent = result.toString();
            this.shouldClearDisplay = true;
        } catch (error) {
            //Em caso de erro na expressão 
            this.display.textContent = "Erro";
            this.shouldClearDisplay = true;
        }
    }
}

if (typeof window !== 'undefined') {
    //Espera o DOM estar completamente carregado
    document.addEventListener('DOMContentLoaded',() => {
        //Obtém referência ao elemento display
        const display = document.getElementById('display');
        //Cria uma nova instãncia da calculadora
        const calc = new Calculator(display);
        //Conecta todos os botões da calculadora
        document.querySelectorAll('button').forEach(button =>{
            if (button.id === 'clear') {
                //Configura o botão limpar (C)
                button.addEventListener('click',() => calc.clearDisplay());
            }else if(button.id === 'equals'){
                //Configura o botão de igual (=)
                button.addEventListener('click',() => calc.calculate());
            }else{
                //Configura todos os outros botões 
                button.addEventListener('click',() => calc.appendToDisplay(button.textContent));
            }
        })
    })
}

//Exporta a classe para uso em testes :)
if(typeof module !== 'undefined' && module.exports){
    module.exports = Calculator
}