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
        $this-> assertEquals(1, $calculadora -> subtracao(3,2), "Erro na subtracao");
    }

    public function testeMultiplicacao() {
        $calc = new Calculadora();
        $this-> assertEquals(6, $calc -> multiplicacao(2,3), "Erro na multiplicacao");
    }
}
//  na minha maquina nao funciona :)
?>