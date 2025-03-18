"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Droplet, Calculator, TrendingDown } from "lucide-react"

export default function Economia() {
  // Estados para os valores do calculador
  const [consumoAtual, setConsumoAtual] = useState(10)
  const [pessoas, setPessoas] = useState(3)
  const [tarifaAgua, setTarifaAgua] = useState(5)
  const [tarifaEsgoto, setTarifaEsgoto] = useState(4)
  const [reducaoDesejada, setReducaoDesejada] = useState(20)

  // Estados para os resultados calculados
  const [consumoMensal, setConsumoMensal] = useState(0)
  const [custoMensal, setCustoMensal] = useState(0)
  const [economiaAgua, setEconomiaAgua] = useState(0)
  const [economiaDinheiro, setEconomiaDinheiro] = useState(0)

  // Recalcula os resultados quando os inputs mudam
  useEffect(() => {
    // Consumo mensal em m³
    const consumoMensalCalculado = (consumoAtual * pessoas * 30) / 1000
    setConsumoMensal(consumoMensalCalculado)

    // Custo mensal em R$
    const custoMensalCalculado = consumoMensalCalculado * (tarifaAgua + tarifaEsgoto)
    setCustoMensal(custoMensalCalculado)

    // Economia de água em m³
    const economiaAguaCalculada = consumoMensalCalculado * (reducaoDesejada / 100)
    setEconomiaAgua(economiaAguaCalculada)

    // Economia em dinheiro em R$
    const economiaDinheiroCalculada = economiaAguaCalculada * (tarifaAgua + tarifaEsgoto)
    setEconomiaDinheiro(economiaDinheiroCalculada)
  }, [consumoAtual, pessoas, tarifaAgua, tarifaEsgoto, reducaoDesejada])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Economia Financeira</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculadora de Economia
              </CardTitle>
              <CardDescription>Calcule quanto você pode economizar reduzindo seu consumo de água</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basico">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basico">Cálculo Básico</TabsTrigger>
                  <TabsTrigger value="avancado">Cálculo Avançado</TabsTrigger>
                </TabsList>

                <TabsContent value="basico" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="consumo-atual">Consumo diário por pessoa (litros)</Label>
                        <div className="flex items-center gap-4">
                          <Slider
                            id="consumo-atual"
                            min={50}
                            max={300}
                            step={10}
                            value={[consumoAtual]}
                            onValueChange={(value) => setConsumoAtual(value[0])}
                          />
                          <span className="w-12 text-right font-medium">{consumoAtual}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          A média brasileira é de aproximadamente 150 litros por pessoa/dia
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pessoas">Número de pessoas na residência</Label>
                        <div className="flex items-center gap-4">
                          <Slider
                            id="pessoas"
                            min={1}
                            max={10}
                            step={1}
                            value={[pessoas]}
                            onValueChange={(value) => setPessoas(value[0])}
                          />
                          <span className="w-12 text-right font-medium">{pessoas}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="tarifa-agua">Tarifa de água (R$/m³)</Label>
                        <Input
                          id="tarifa-agua"
                          type="number"
                          min={0}
                          step={0.01}
                          value={tarifaAgua}
                          onChange={(e) => setTarifaAgua(Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tarifa-esgoto">Tarifa de esgoto (R$/m³)</Label>
                        <Input
                          id="tarifa-esgoto"
                          type="number"
                          min={0}
                          step={0.01}
                          value={tarifaEsgoto}
                          onChange={(e) => setTarifaEsgoto(Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reducao">Redução desejada no consumo (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="reducao"
                        min={5}
                        max={50}
                        step={5}
                        value={[reducaoDesejada]}
                        onValueChange={(value) => setReducaoDesejada(value[0])}
                      />
                      <span className="w-12 text-right font-medium">{reducaoDesejada}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Com pequenas mudanças de hábito, é possível reduzir o consumo em até 30%
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="avancado" className="pt-4">
                  <div className="flex items-center justify-center p-6">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">
                        O cálculo avançado permite configurar o consumo por cômodo e atividade.
                      </p>
                      <p className="text-sm">Esta funcionalidade estará disponível em breve!</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-4 w-full">
                <Card>
                  <CardHeader className="py-4">
                    <CardDescription>Consumo mensal estimado</CardDescription>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Droplet className="h-5 w-5 text-primary" />
                      {consumoMensal.toFixed(2)} m³
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="py-4">
                    <CardDescription>Custo mensal estimado</CardDescription>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      R$ {custoMensal.toFixed(2)}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="py-4">
                    <CardDescription>Economia de água potencial</CardDescription>
                    <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                      <Droplet className="h-5 w-5" />
                      {economiaAgua.toFixed(2)} m³/mês
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="py-4">
                    <CardDescription>Economia financeira potencial</CardDescription>
                    <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                      <DollarSign className="h-5 w-5" />
                      R$ {economiaDinheiro.toFixed(2)}/mês
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Dicas de Economia
              </CardTitle>
              <CardDescription>Sugestões para reduzir seu consumo e economizar dinheiro</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Banho consciente</h3>
                <p className="text-sm text-muted-foreground">
                  Reduzir o tempo de banho de 15 para 5 minutos pode economizar até 90 litros por banho.
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[80%]"></div>
                </div>
                <p className="text-xs text-right">Economia potencial: 80%</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Torneiras eficientes</h3>
                <p className="text-sm text-muted-foreground">
                  Instalar aeradores em torneiras pode reduzir o consumo em até 50% sem perda de conforto.
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[50%]"></div>
                </div>
                <p className="text-xs text-right">Economia potencial: 50%</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Descarga inteligente</h3>
                <p className="text-sm text-muted-foreground">
                  Vasos sanitários com descarga dual podem economizar até 60% de água por descarga.
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[60%]"></div>
                </div>
                <p className="text-xs text-right">Economia potencial: 60%</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Reúso de água cinza</h3>
                <p className="text-sm text-muted-foreground">
                  Reutilizar água de máquinas de lavar e chuveiros pode reduzir o consumo total em até 30%.
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[30%]"></div>
                </div>
                <p className="text-xs text-right">Economia potencial: 30%</p>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Combinando todas essas dicas, você pode reduzir seu consumo em até 40% e economizar significativamente
                na conta de água.
              </p>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Economia Anual</CardTitle>
              <CardDescription>Projeção de economia nos próximos 12 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Economia de água:</span>
                  <span className="font-medium">{(economiaAgua * 12).toFixed(2)} m³</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Economia financeira:</span>
                  <span className="font-medium">R$ {(economiaDinheiro * 12).toFixed(2)}</span>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">Com essa economia, você poderia:</p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      Investir em melhorias para sua casa
                    </li>
                    <li className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      Fazer uma pequena viagem
                    </li>
                    <li className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      Comprar equipamentos para economizar ainda mais água
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

