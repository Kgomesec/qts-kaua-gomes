import {
    assertEquals,
    assertStringIncludes,
    assertArrayIncludes,
} from "http://deno.land/std/testing/asserts.ts"

let aluno = "Cróvis José"
let professores = ['João', 'Lais', 'Davi', 'Nachara']

Deno.test("Teste de assertions (API)", () => {
    assertEquals(aluno, "Cróvis José");
    assertArrayIncludes(aluno, "José");
})

Deno.test("Testando array do professor (API)", ()=>{
    assertArrayIncludes(professores,
        ["Davi","Lais","Alan"],
        "Opa! Algo deu errado!");
})