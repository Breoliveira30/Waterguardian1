"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Droplet, AlertTriangle, TrendingDown, DollarSign, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { BackButton } from "@/components/back-button"
import { EnhancedFooter } from "@/components/enhanced-footer"

// Dados simulados para os gráficos
const dailyData = [
  { name: "00:00", consumo: 12 },
  { name: "04:00", consumo: 8 },
  { name: "08:00", consumo: 25 },
  { name: "12:00", consumo: 35 },
  { name: "16:00", consumo: 30 },
  { name: "20:00", consumo: 22 },
]

const weeklyData = [
  { name: "Dom", consumo: 120 },
  { name: "Seg", consumo: 150 },
  { name: "Ter", consumo: 140 },
  { name: "Qua", consumo: 130 },
  { name: "Qui", consumo: 170 },
  { name: "Sex", consumo: 190 },
  { name: "Sáb", consumo: 160 },
]

const monthlyData = [
  { name: "Jan", consumo: 4200 },
  { name: "Fev", consumo: 3800 },
  { name: "Mar", consumo: 4100 },
  { name: "Abr", consumo: 3900 },
  { name: "Mai", consumo: 4300 },
  { name: "Jun", consumo: 4500 },
]

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState("diario")

  // Seleciona os dados com base no período escolhido
  const chartData = timeframe === "diario" ? dailyData : timeframe === "semanal" ? weeklyData : monthlyData

  // Calcula o consumo atual (último valor do gráfico)
  const consumoAtual = chartData[chartData.length - 1].consumo

  // Calcula o consumo total (soma de todos os valores)
  const consumoTotal = chartData.reduce((total, item) => total + item.consumo, 0)

  // Calcula o custo estimado (R$ 5 por m³ - valor fictício)
  const custoEstimado = (consumoTotal * 5).toFixed(2)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <BackButton />

        <motion.h1
          className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard de Consumo
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ScrollReveal>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Consumo Atual</CardTitle>
                <Droplet className="h-4 w-4 text-primary animate-float" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{consumoAtual} litros</div>
                <p className="text-xs text-muted-foreground">
                  {timeframe === "diario" ? "na última hora" : timeframe === "semanal" ? "hoje" : "este mês"}
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Consumo Total</CardTitle>
                <TrendingDown className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{consumoTotal} litros</div>
                <p className="text-xs text-muted-foreground">
                  {timeframe === "diario" ? "hoje" : timeframe === "semanal" ? "esta semana" : "este mês"}
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Custo Estimado</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {custoEstimado}</div>
                <p className="text-xs text-muted-foreground">
                  {timeframe === "diario" ? "hoje" : timeframe === "semanal" ? "esta semana" : "este mês"}
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <Alert className="mb-8 border-none bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Atenção!</AlertTitle>
            <AlertDescription>
              Seu consumo está 15% acima da média para este período. Confira nossas dicas para economizar água.
            </AlertDescription>
          </Alert>
        </ScrollReveal>

        <div className="mb-8">
          <ScrollReveal>
            <Tabs defaultValue="diario" onValueChange={setTimeframe}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Gráfico de Consumo</h2>
                <TabsList>
                  <TabsTrigger value="diario">Diário</TabsTrigger>
                  <TabsTrigger value="semanal">Semanal</TabsTrigger>
                  <TabsTrigger value="mensal">Mensal</TabsTrigger>
                </TabsList>
              </div>

              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <TabsContent value="diario" className="mt-0">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="consumo" stroke="hsl(var(--primary))" name="Consumo (litros)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="semanal" className="mt-0">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="consumo" fill="hsl(var(--primary))" name="Consumo (litros)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="mensal" className="mt-0">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="consumo" stroke="hsl(var(--primary))" name="Consumo (litros)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal delay={1}>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Consumo em Tempo Real</CardTitle>
                <CardDescription>Monitoramento ao vivo do seu consumo de água</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-6 space-y-4">
                  <motion.div
                    className="relative w-32 h-32 flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0px 0px 0px rgba(0,102,204,0.2)",
                        "0px 0px 20px rgba(0,102,204,0.5)",
                        "0px 0px 0px rgba(0,102,204,0.2)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <Droplet className="w-32 h-32 text-primary/20" />
                    <Droplet className="w-24 h-24 text-primary/40 absolute animate-pulse" />
                    <span className="absolute text-2xl font-bold">3.2</span>
                    <span className="absolute mt-10 text-sm">L/min</span>
                  </motion.div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      Atualizado agora
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Dicas de Economia</CardTitle>
                <CardDescription>Sugestões personalizadas para reduzir seu consumo</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <motion.li
                    className="flex items-start gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TrendingDown className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Reduza o tempo no banho</p>
                      <p className="text-sm text-muted-foreground">
                        Reduzir o banho em 2 minutos pode economizar até 20 litros de água.
                      </p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex items-start gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TrendingDown className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Verifique vazamentos</p>
                      <p className="text-sm text-muted-foreground">
                        Um vazamento pequeno pode desperdiçar até 30 litros por dia.
                      </p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex items-start gap-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TrendingDown className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Use a máquina de lavar com carga completa</p>
                      <p className="text-sm text-muted-foreground">
                        Economize até 100 litros por lavagem utilizando a capacidade máxima.
                      </p>
                    </div>
                  </motion.li>
                </ul>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>

      <EnhancedFooter />
    </div>
  )
}

