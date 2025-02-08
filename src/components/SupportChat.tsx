'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MessageCircle, X, Send, Paperclip } from 'lucide-react'
import { uploadToCloudinary } from '@/lib/cloudinary'
import type { Product, Course } from '@/types'
import Image from 'next/image'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  attachment?: {
    name: string
    url: string
  }
}

interface ProductSuggestion {
  id: string
  name: string
  price: number
  image?: string
  description: string
}

interface ResponsePatterns {
  default: string[]
  greeting: string[]
  price: string[]
  courses: string[]
  shipping: string[]
  payment: string[]
  schedule: string[]
  suggestion: string[]
  noResults: string[]
  categories: string[]
  priceRange: string[]
  lapidaryWorkshop: string[]
  lapidaryDetails: string[]
  lapidaryPrice: string[]
  specialization: string[]
  duration: string[]
  certification: string[]
  [key: string]: string[] // Index signature for dynamic access
}

const gemCategories = {
  CITRINE: 'Citrino',
  AMETHYST: 'Ametista',
  QUARTZ: 'Quartzo',
  TOURMALINE: 'Turmalina',
  EMERALD: 'Esmeralda',
  SAPPHIRE: 'Safira',
  RUBY: 'Rubi',
  TOPAZ: 'Topázio',
  OPAL: 'Opala',
  DIAMOND: 'Diamante'
}

// Sistema de respostas inteligentes
const responses: ResponsePatterns = {
  default: [
    "Desculpe, não percebi a sua pergunta. Pode reformular?",
    "Não tenho a certeza sobre isso. Pode ser mais específico?",
    "Hmm, isso é interessante, mas preciso de mais detalhes para ajudar melhor."
  ],
  greeting: [
    "Olá! Como posso ajudá-lo hoje?",
    "Olá! Em que posso ser útil?",
    "Bem-vindo! Como posso auxiliar?"
  ],
  price: [
    "Os nossos preços variam consoante o produto. Posso ajudá-lo a encontrar algo específico?",
    "Temos opções para diversos orçamentos. Qual faixa de preço procura?",
    "Os preços dependem muito do tipo e qualidade da pedra. Tem alguma em mente?"
  ],
  courses: [
    "Oferecemos diversos cursos de lapidação e joalharia. Quer saber mais sobre algum em específico?",
    "Os nossos cursos são ministrados por profissionais experientes. Qual área lhe interessa?",
    "Temos cursos para iniciantes e avançados. Qual o seu nível de experiência?"
  ],
  shipping: [
    "Fazemos entregas para todo o Portugal. O prazo varia consoante a região.",
    "Os portes são calculados com base no código postal de entrega. Quer fazer uma simulação?",
    "Trabalhamos com diversas transportadoras para garantir a melhor entrega."
  ],
  payment: [
    "Aceitamos cartões de crédito, transferência bancária e MB WAY.",
    "Oferecemos pagamento em prestações até 12x nos cartões de crédito.",
    "Todas as formas de pagamento são processadas com segurança."
  ],
  schedule: [
    "O nosso horário de atendimento é de segunda a sexta, das 9h às 18h.",
    "Aos sábados, atendemos das 9h às 13h.",
    "Fora do horário comercial, pode deixar a sua mensagem que responderemos."
  ],
  suggestion: [
    "Que tal dar uma vista de olhos nas nossas pedras mais populares?",
    "Posso mostrar-lhe algumas sugestões baseadas no seu interesse.",
    "Temos algumas recomendações que podem interessar-lhe."
  ],
  noResults: [
    "Não encontrei exactamente o que procura, mas posso sugerir alternativas.",
    "Hmm, não tenho essa informação específica, mas posso ajudá-lo de outra forma.",
    "Que tal reformular a sua pergunta? Assim posso ajudá-lo melhor."
  ],
  categories: [
    "Temos diversas categorias de pedras: preciosas, semipreciosas, em bruto e lapidadas.",
    "Pode encontrar pedras por cor, tipo ou uso em joalharia.",
    "As nossas categorias incluem também conjuntos para colecionadores."
  ],
  priceRange: [
    "Temos pedras a partir de 100€ até peças exclusivas acima de 10.000€.",
    "O investimento varia consoante a raridade e qualidade da pedra.",
    "Podemos encontrar algo dentro do seu orçamento."
  ],
  lapidaryWorkshop: [
    "O nosso workshop de lapidação é perfeito para iniciantes!",
    "Aprenderá técnicas básicas e avançadas de lapidação.",
    "O curso inclui material didático e certificado."
  ],
  lapidaryDetails: [
    "O workshop tem duração de 40 horas.",
    "As turmas são pequenas para melhor aproveitamento.",
    "Fornecemos todas as ferramentas necessárias."
  ],
  lapidaryPrice: [
    "O investimento no workshop é de 2.500€,",
    "Oferecemos condições especiais para grupos.",
    "O valor inclui todo o material necessário."
  ],
  specialization: [
    "Temos cursos de especialização em diferentes técnicas.",
    "A especialização é ideal para quem já tem experiência básica.",
    "São módulos avançados com certificação."
  ],
  duration: [
    "Os cursos têm duração variada, de 20 a 80 horas.",
    "Pode escolher entre intensivo ou regular.",
    "O cronograma é flexível para se adequar à sua rotina."
  ],
  certification: [
    "Todos os cursos incluem certificado de conclusão.",
    "A nossa certificação é reconhecida no mercado.",
    "O certificado é emitido após avaliação prática."
  ]
}

const CHAT_STORAGE_KEY = 'art-and-gems:chat'

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>(() => {
    // Carregar mensagens salvas ao inicializar
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [isTyping, setIsTyping] = useState(false)
  const [attachment, setAttachment] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [courses] = useState<Course[]>([
    {
      id: '1',
      name: 'Workshop de Lapidação',
      duration: '3 horas',
      price: 290,
      description: 'Experiência individual onde você aprenderá os fundamentos da lapidação e criará sua própria pedra.',
      type: 'workshop'
    },
    {
      id: '2',
      name: 'Especialização em Lapidação',
      duration: '1 semana',
      price: 890,
      description: 'Curso intensivo com técnicas avançadas de lapidação para quem deseja se aprofundar na arte.',
      type: 'specialization'
    }
  ])

  const responsePatterns: ResponsePatterns = {
    default: [
      "Desculpe, não entendi sua pergunta. Pode reformular?",
      "Não tenho certeza sobre isso. Pode perguntar de outra forma?"
    ],
    greeting: [
      "Olá! Como posso ajudar você hoje?",
      "Oi! Em que posso ser útil?"
    ],
    // ... rest of patterns
  }

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages.length, scrollToBottom])

  // Salvar mensagens quando houver alterações
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensagem inicial do AI apenas se não houver histórico
      addMessage('ai', 'Olá! Sou o assistente virtual da Art And Gems. Como posso ajudar?')
    }
  }, [isOpen])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.data || [])
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    }
  }

  const findRelevantProducts = (message: string): ProductSuggestion[] => {
    const searchTerms = message.toLowerCase()
    let relevantProducts = products

    // Filtrar por faixa de preço
    if (searchTerms.includes('barato') || searchTerms.includes('económico')) {
      relevantProducts = relevantProducts.filter(p => p.price <= 500)
    } else if (searchTerms.includes('intermediário') || searchTerms.includes('médio')) {
      relevantProducts = relevantProducts.filter(p => p.price > 500 && p.price <= 2000)
    } else if (searchTerms.includes('premium') || searchTerms.includes('luxo')) {
      relevantProducts = relevantProducts.filter(p => p.price > 2000)
    }

    // Filtrar por categoria
    Object.entries(gemCategories).forEach(([key, value]) => {
      if (searchTerms.includes(value.toLowerCase())) {
        relevantProducts = relevantProducts.filter(p => p.gemFamily === key)
      }
    })

    // Filtrar por cor
    const colors = ['azul', 'verde', 'vermelho', 'rosa', 'roxo', 'amarelo', 'transparente']
    colors.forEach(color => {
      if (searchTerms.includes(color)) {
        relevantProducts = relevantProducts.filter(p => p.color?.toLowerCase().includes(color))
      }
    })

    return relevantProducts
      .slice(0, 3)
      .map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.images[0],
        description: p.description
      }))
  }

  // Adicionar botão para limpar histórico
  const clearHistory = () => {
    setMessages([])
    localStorage.removeItem(CHAT_STORAGE_KEY)
    // Adicionar mensagem inicial novamente
    addMessage('ai', 'Olá! Sou o assistente virtual da Art And Gems. Como posso ajudar?')
  }

  const addMessage = (type: 'user' | 'ai', content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    }])
  }

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    const foundProducts = findRelevantProducts(message)
    setSuggestions(foundProducts)

    // Perguntas sobre categorias
    if (lowerMessage.includes('categorias') || lowerMessage.includes('tipos de pedra')) {
      return responses.categories[Math.floor(Math.random() * responses.categories.length)]
    }

    // Perguntas sobre faixas de preço
    if (lowerMessage.includes('faixa de preço') || lowerMessage.includes('quanto custa')) {
      return responses.priceRange[Math.floor(Math.random() * responses.priceRange.length)]
    }

    // Busca por produtos
    if (
      lowerMessage.includes('pedra') ||
      lowerMessage.includes('gema') ||
      lowerMessage.includes('cristal') ||
      lowerMessage.includes('procuro') ||
      lowerMessage.includes('quero') ||
      lowerMessage.includes('tem') ||
      Object.values(gemCategories).some(gem => lowerMessage.includes(gem.toLowerCase()))
    ) {
      return foundProducts.length > 0 
        ? `${responses.suggestion[Math.floor(Math.random() * responses.suggestion.length)]}`
        : `${responses.noResults[Math.floor(Math.random() * responses.noResults.length)]}`
    }

    // Identificar o tipo de mensagem
    let responseType = 'default'
    if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('bom dia')) {
      responseType = 'greeting'
    } else if (lowerMessage.includes('preço') || lowerMessage.includes('custo') || lowerMessage.includes('valor')) {
      responseType = 'price'
    } else if (lowerMessage.includes('curso') || lowerMessage.includes('aula') || lowerMessage.includes('aprender')) {
      responseType = 'courses'
    } else if (lowerMessage.includes('entrega') || lowerMessage.includes('envio') || lowerMessage.includes('correio')) {
      responseType = 'shipping'
    } else if (lowerMessage.includes('pagamento') || lowerMessage.includes('pagar') || lowerMessage.includes('cartão')) {
      responseType = 'payment'
    } else if (lowerMessage.includes('horário') || lowerMessage.includes('aberto') || lowerMessage.includes('funcionamento')) {
      responseType = 'schedule'
    }

    // Selecionar uma resposta aleatória do tipo identificado
    const responses = responses[responseType]
    const randomIndex = Math.floor(Math.random() * responses.length)
    return responses[randomIndex]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() && !attachment) return

    setIsTyping(true)

    try {
      let attachmentUrl = ''
      
      if (attachment) {
        const uploadResult = await uploadToCloudinary(attachment)
        attachmentUrl = uploadResult.secure_url
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: message,
        timestamp: new Date(),
        attachment: attachment ? {
          name: attachment.name,
          url: attachmentUrl
        } : undefined
      }

      setMessages(prev => [...prev, newMessage])
      setMessage('')
      setAttachment(null)

      // Simular tempo de resposta natural
      setTimeout(() => {
        const aiResponse = getAIResponse(message)
        addMessage('ai', aiResponse)
        setIsTyping(false)
      }, 1000)

    } catch (error) {
      console.error('Erro ao processar mensagem:', error)
      setIsTyping(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Arquivo muito grande. Limite de 5MB.')
        return
      }
      setAttachment(file)
    }
  }

  // Componente para exibir sugestão de produto
  const ProductSuggestionCard = ({ product }: { product: ProductSuggestion }) => {
    const handleClick = () => {
      // Em vez de disparar um evento, vamos chamar a função diretamente
      const productDetails = products.find(p => p.id === product.id)
      if (productDetails) {
        setSelectedProduct(productDetails)
      }
    }

    return (
      <div 
        onClick={handleClick}
        className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-blue-600 truncate">{product.name}</h4>
          <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
          <p className="text-sm font-semibold">
            {new Intl.NumberFormat('pt-PT', {
              style: 'currency',
              currency: 'EUR'
            }).format(product.price)}
          </p>
        </div>
      </div>
    )
  }

  // Componente para exibir curso sugerido
  const CourseSuggestionCard = ({ course }: { course: Course }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-semibold text-blue-600">{course.name}</h4>
      <div className="mt-2 space-y-1 text-sm">
        <p className="text-gray-600">{course.description}</p>
        <p className="font-medium">Duração: {course.duration}</p>
        <p className="font-bold">
          {new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR'
          }).format(course.price)}
        </p>
      </div>
      <button className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Mais Informações
      </button>
    </div>
  )

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isOpen ? 'w-96' : 'w-auto'}`}>
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">Suporte</h3>
            <button onClick={() => setIsOpen(false)}>
              <Image
                src="/close-icon.png"
                alt="Fechar"
                width={24}
                height={24}
                className="hover:opacity-75"
              />
            </button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.type === 'user' && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src="/user-avatar.png"
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  {msg.type === 'ai' && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src="/bot-avatar.png"
                        alt="Bot Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  {msg.content}
                  {msg.type === 'ai' && suggestions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {suggestions.map(product => (
                        <ProductSuggestionCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                  {msg.attachment && (
                    <a
                      href={msg.attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline mt-2 block"
                    >
                      📎 {msg.attachment.name}
                    </a>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                  Digitando...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            {attachment && (
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                <Paperclip className="w-4 h-4" />
                {attachment.name}
                <button
                  type="button"
                  onClick={() => setAttachment(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <div className="flex flex-col gap-2">
                <label className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">
                  <Paperclip className="w-4 h-4" />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </label>
                <button
                  type="submit"
                  disabled={isTyping || (!message.trim() && !attachment)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700"
        >
          <Image
            src="/chat-icon.png"
            alt="Abrir chat"
            width={24}
            height={24}
          />
        </button>
      )}

      {/* Modal de Detalhes */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-purple-600">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {selectedProduct.images[0] && (
                <div className="mb-6">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-purple-600 mb-2">Descrição</h3>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-purple-600 mb-2">Detalhes</h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-gray-500">Preço</dt>
                        <dd className="font-semibold">
                          {new Intl.NumberFormat('pt-PT', {
                            style: 'currency',
                            currency: 'EUR'
                          }).format(selectedProduct.price)}
                        </dd>
                      </div>
                      
                      {selectedProduct.gemFamily && (
                        <div>
                          <dt className="text-gray-500">Família</dt>
                          <dd className="font-semibold">{selectedProduct.gemFamily}</dd>
                        </div>
                      )}
                      
                      {/* ... outros detalhes ... */}
                    </dl>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 