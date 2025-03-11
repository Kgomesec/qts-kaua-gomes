import { assert, assertEquals, assertNotEquals, assertStringIncludes, assertThrows } from "https://deno.land/std@0.217.0/assert/mod.ts";

let a = "oi";
let b = "olá";
let c = "oi, tudo bem?";
let d = () => {
    throw new Error("Erro esperado!");
};

Deno.test("Teste com assert", () => {
    assert(a === "olá", "A variável 'a' não é 'olá'");
    console.log(`Teste passou! '${a}' é igual a 'oi'`);
});

Deno.test("Teste com assertEquals", () => {
    assertEquals(b, "olá", "A variável 'b' deveria ser 'olá'");
    console.log(`Teste passou! '${b}' é igual a 'olá'`);
});

Deno.test("Teste com assertNotEquals", () => {
    assertNotEquals(a, "oi", "A variável 'a' não pode ser igual a 'oi'");
    console.log(`Teste passou! '${a}' e '${b}' são diferentes`);
});

Deno.test("Teste com assertStringIncludes", () => {
    assertStringIncludes(c, "oi", "A string 'c' deveria conter 'oi'");
    console.log(`Teste passou! '${c}' contém 'oi'`);
});

Deno.test("Teste com assertThrows", () => {
    assertThrows(d, Error, "Erro esperado!", "A função deveria lançar um erro");
    console.log("Teste passou! A função lançou o erro esperado.");
});