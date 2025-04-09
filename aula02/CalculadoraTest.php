<?php
use PHPUnit\Framework\TestCase;

class Calculadora {
    public function soma($a, $b) {
        return $a + $b;
    }

    public function subtracao($a, $b) {
        return $a - $b;
    }

    public function multiplicacao($a, $b) {
        return $a * $b;
    }
}

class CalculadoraTest extends TestCase {
    public function testeSoma() {
        // AAAAAAAAAAAAAAAAA eu to ficando doido gdfgiudhiughagpiugg
        $calculadora = new Calculadora();
        $this-> assertEquals(5, $calculadora-> soma(3,3), "Erro na soma");
    }

    public function testeSubtracao() {
        $calculadora = new Calculadora();
        $resultado = $calculadora->subtracao(5,2);
        $this-> assertGreaterThan(2, $resultado, "Resultado da subtração deveria ser maior que 2");
    }

    public function testeMultiplicacao() {
        $calculadora = new Calculadora();
        $resultado = $calculadora->multiplicacao(2,3);
        $this-> assertNotEmpty($resultado, "Resultado da multiplicação não deveria estar vazio");
    }
}
//  na minha maquina nao funciona :)
?>