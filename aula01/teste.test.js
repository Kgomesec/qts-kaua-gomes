let a = 'oi'
let b = 'olá'

Deno.test("Teste do oi (NO API)", () => {
    if (a != "oi") {
        throw new Error(`${a} não é oi`);
    } else {
        console.log(`${a} é de fato o oi`);
    }
}) 

Deno.test("Não pode ser oi (NO API)", () => {
    if (b == "oi") {
        throw new Error(`${b} é oi portanto está errado`);
    } else {
        console.log(`${b} não é oi! Portanto está certo o teste`);
    }
}) 