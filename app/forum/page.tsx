"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, ThumbsUp, Send } from "lucide-react"

// Dados simulados para o fórum
const forumPosts = [
  {
    id: 1,
    author: "Maria Silva",
    avatar: "MS",
    title: "Como reduzi meu consumo de água em 30%",
    content:
      "Olá pessoal! Queria compartilhar algumas dicas que me ajudaram a reduzir meu consumo de água em 30% no último mês. Primeiro, instalei redutores de vazão em todas as torneiras da casa. Depois, comecei a reutilizar a água da máquina de lavar para limpar o quintal. Por último, consertei todos os pequenos vazamentos que tinha em casa. O resultado foi incrível!",
    date: "2 dias atrás",
    likes: 24,
    comments: 8,
    category: "dicas",
  },
  {
    id: 2,
    author: "João Pereira",
    avatar: "JP",
    title: "Dúvida sobre consumo no chuveiro",
    content:
      "Pessoal, estou tentando entender quanto de água gasto no banho. Meu chuveiro é um modelo mais antigo e fico no banho por cerca de 10 minutos. Alguém sabe como posso calcular esse consumo? Existe algum dispositivo que posso instalar para medir isso com precisão?",
    date: "5 dias atrás",
    likes: 12,
    comments: 15,
    category: "duvidas",
  },
  {
    id: 3,
    author: "Ana Costa",
    avatar: "AC",
    title: "Projeto de captação de água da chuva",
    content:
      "Acabei de implementar um sistema de captação de água da chuva em casa e queria compartilhar os resultados. Instalei calhas especiais e um reservatório de 500 litros. Com as chuvas do último mês, consegui economizar cerca de 20% na conta de água! O investimento foi de aproximadamente R$ 1.200 e estimo que se pague em 8 meses.",
    date: "1 semana atrás",
    likes: 32,
    comments: 10,
    category: "projetos",
  },
  {
    id: 4,
    author: "Carlos Mendes",
    avatar: "CM",
    title: "Economia de água na agricultura urbana",
    content:
      "Tenho uma pequena horta em casa e implementei um sistema de irrigação por gotejamento que reduziu muito o consumo de água. Uso mangueiras com furos estratégicos que liberam água diretamente na raiz das plantas. Além disso, faço a irrigação sempre no início da manhã ou final da tarde para evitar evaporação excessiva.",
    date: "2 semanas atrás",
    likes: 18,
    comments: 6,
    category: "dicas",
  },
]

export default function Forum() {
  const [activeTab, setActiveTab] = useState("todos")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")

  // Filtra os posts com base na categoria selecionada
  const filteredPosts = activeTab === "todos" ? forumPosts : forumPosts.filter((post) => post.category === activeTab)

  const handleSubmitPost = (e) => {
    e.preventDefault()
    // Aqui seria implementada a lógica para enviar o post para o backend
    alert("Post enviado com sucesso!")
    setNewPostTitle("")
    setNewPostContent("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fórum WaterGuardian Solution</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Discussões</h2>
              <TabsList>
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="dicas">Dicas</TabsTrigger>
                <TabsTrigger value="duvidas">Dúvidas</TabsTrigger>
                <TabsTrigger value="projetos">Projetos</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0 space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={post.author} />
                            <AvatarFallback>{post.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{post.title}</CardTitle>
                            <CardDescription>
                              Por {post.author} • {post.date}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{post.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-6">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments} comentários</span>
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver discussão
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Nenhuma discussão encontrada</h3>
                  <p className="text-muted-foreground">Seja o primeiro a iniciar uma discussão nesta categoria.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Iniciar nova discussão</CardTitle>
              <CardDescription>
                Compartilhe suas dúvidas, dicas ou projetos relacionados à economia de água.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitPost} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Título da discussão"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Compartilhe sua mensagem aqui..."
                    className="min-h-[150px]"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="dicas">Dicas</option>
                    <option value="duvidas">Dúvidas</option>
                    <option value="projetos">Projetos</option>
                  </select>
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Publicar discussão
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Regras do fórum</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Seja respeitoso com todos os membros</li>
                <li>• Mantenha as discussões relacionadas à economia de água</li>
                <li>• Não compartilhe informações pessoais</li>
                <li>• Evite spam e publicidade não autorizada</li>
                <li>• Verifique se sua dúvida já foi respondida antes de postar</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

