'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Paperclip } from 'lucide-react'
import { uploadToCloudinary } from '@/lib/cloudinary'
import type { Product } from '@/types'

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
const aiResponses = {
  default: [
    'Como posso ajudar você hoje?',
    'Conte-me mais sobre o que você procura.',
    'Posso ajudar com mais alguma informação?'
  ],
  greeting: [
    'Olá! Como posso ajudar?',
    'Bem-vindo à Art And Gems! Como posso ser útil?',
    'Oi! Em que posso ajudar hoje?'
  ],
  price: [
    'Nossos preços variam de acordo com o tipo e qualidade da pedra. Temos opções a partir de €100.',
    'Cada pedra é única, com preços que refletem sua qualidade. Posso te mostrar algumas opções?',
    'Temos pedras em diversas faixas de preço. Qual é seu orçamento?'
  ],
  courses: [
    'Oferecemos cursos para todos os níveis, desde iniciantes até avançado.',
    'Nossos cursos incluem material didático e certificado. Quer saber mais sobre algum em específico?',
    'Temos cursos práticos de lapidação com turmas reduzidas para melhor aprendizado.'
  ],
  shipping: [
    'Fazemos entregas para todo Portugal. O prazo médio é de 2-3 dias úteis.',
    'O custo do envio é calculado com base no CEP e peso do produto.',
    'Oferecemos envio seguro e rastreável para todas as encomendas.'
  ],
  payment: [
    'Aceitamos cartões de crédito/débito, transferência bancária e MB Way.',
    'Você pode parcelar suas compras em até 12x no cartão de crédito.',
    'Oferecemos 5% de desconto para pagamentos por transferência bancária.'
  ],
  schedule: [
    'Estamos abertos de segunda a sexta das 10h às 19h, e sábados das 10h às 13h.',
    'Você pode agendar uma visita presencial para ver nossas pedras.',
    'Aos domingos e feriados estamos fechados.'
  ],
  suggestion: [
    'Com base no que você procura, aqui estão algumas opções que podem te interessar:',
    'Encontrei estas pedras que podem ser do seu interesse:',
    'Temos estas opções que combinam com o que você procura:'
  ],
  noResults: [
    'Desculpe, não encontrei pedras exatamente com essas características. Que tal explorar outras opções?',
    'No momento não temos pedras com essa descrição específica. Posso te mostrar alternativas similares?'
  ],
  categories: [
    `Temos várias categorias de pedras preciosas, incluindo: ${Object.values(gemCategories).join(', ')}. Qual te interessa?`,
    'Posso te mostrar pedras específicas de cada categoria. Qual você gostaria de ver?'
  ],
  priceRange: [
    'Temos pedras em diferentes faixas de preço:\n- Iniciante: €100 a €500\n- Intermediário: €500 a €2000\n- Premium: acima de €2000',
    'Nossos preços variam conforme a categoria e qualidade. Qual faixa de preço você procura?'
  ],
  lapidaryWorkshop: [
    'Oferecemos uma experiência individual de lapidação de 3 horas, onde você aprenderá os fundamentos e lapidará sua própria pedra.',
    'No workshop de lapidação, você terá uma experiência prática supervisionada e levará sua pedra lapidada para casa.',
    'Nossa experiência de lapidação é personalizada e não requer conhecimento prévio em joalharia ou gemologia.'
  ],
  lapidaryDetails: [
    'O workshop de lapidação inclui:\n- Sessão individual de 3 horas\n- Material didático\n- Pedra para lapidar\n- Certificado de participação',
    'Durante o curso você aprenderá:\n- Fundamentos da lapidação\n- Técnicas básicas\n- Lapidação facetada ou cabuchão\n- Maximização do brilho e cor'
  ],
  lapidaryPrice: [
    'O workshop individual de lapidação tem um valor de €290, incluindo todos os materiais necessários.',
    'Investimento de €290 para uma experiência única de 3 horas, onde você criará sua própria pedra lapidada.'
  ],
  specialization: [
    'Também oferecemos uma especialização intensiva de 1 semana para quem deseja se aprofundar na arte da lapidação.',
    'Para formação mais completa, temos um curso intensivo de uma semana com técnicas avançadas de lapidação.'
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

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
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
      return aiResponses.categories[Math.floor(Math.random() * aiResponses.categories.length)]
    }

    // Perguntas sobre faixas de preço
    if (lowerMessage.includes('faixa de preço') || lowerMessage.includes('quanto custa')) {
      return aiResponses.priceRange[Math.floor(Math.random() * aiResponses.priceRange.length)]
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
        ? `${aiResponses.suggestion[Math.floor(Math.random() * aiResponses.suggestion.length)]}`
        : `${aiResponses.noResults[Math.floor(Math.random() * aiResponses.noResults.length)]}`
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
    const responses = aiResponses[responseType]
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
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96 max-h-[600px] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat Art And Gems</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={clearHistory}
                className="text-white hover:text-purple-200 text-sm"
                title="Limpar histórico"
              >
                Limpar
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-purple-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
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