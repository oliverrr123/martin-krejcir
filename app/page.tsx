"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  TrendingUp,
  Target,
  DollarSign,
  Calendar,
  Star,
  ArrowRight,
  Phone,
  Mail,
  ChevronDown,
  Volume2,
} from "lucide-react"
import { Header } from "@/components/header"

export default function SalesFunnel() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [videoPlayer, setVideoPlayer] = useState<any>(null)

  // Handle video player initialization
  useEffect(() => {
    // Wait for iframe to load
    const handleMessage = (event: MessageEvent) => {
      // Only handle messages from Vimeo
      if (!event.origin.includes("vimeo.com")) return

      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data

        // Check if this is a ready event from the player
        if (data.event === "ready" && data.player_id) {
          // Store reference to the player
          const iframe = document.querySelector("iframe")
          if (iframe) {
            const player = {
              element: iframe,
              postMessage: (action: string, value: any) => {
                const message = { method: action }
                if (value !== undefined) {
                  message.value = value
                }
                iframe.contentWindow?.postMessage(JSON.stringify(message), "*")
              },
            }
            setVideoPlayer(player)
          }
        }
      } catch (e) {
        console.error("Error handling Vimeo message:", e)
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  // Handle video click - unmute first time, then play/pause
  const handleVideoClick = () => {
    if (videoPlayer) {
      if (isMuted) {
        // First click: unmute and restart from beginning
        videoPlayer.postMessage("seekTo", 0) // Restart from beginning
        videoPlayer.postMessage("setVolume", 1.0) // Enable sound
        videoPlayer.postMessage("play", undefined) // Ensure it's playing
        setIsMuted(false)
        setIsPaused(false)
      } else {
        // Subsequent clicks: toggle play/pause
        if (isPaused) {
          videoPlayer.postMessage("play", undefined)
          setIsPaused(false)
        } else {
          videoPlayer.postMessage("pause", undefined)
          setIsPaused(true)
        }
      }
    }
  }

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    const scrollElements = document.querySelectorAll(".scroll-reveal")
    scrollElements.forEach((el) => observer.observe(el))

    return () => {
      scrollElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const problems = [
    {
      icon: Target,
      title: "Nejasná strategie a chybějící směr",
      description:
        "Nemáte stanovené jasné a měřitelné cíle? Ve firmě vzniká chaos, neefektivita a nedostatečné výsledky?",
    },
    {
      icon: TrendingUp,
      title: "Chybějící systém v marketingu a obchodu",
      description:
        "Investujete peníze bez jasné strategie nebo naopak nedělate nic a stagnujete? Absence plánu vede k frustraci a ztrátám.",
    },
    {
      icon: DollarSign,
      title: "Špatně nastavená ekonomika podnikání",
      description:
        "Nerozumíte vlastní ekonomice? Neznáte dobře náklady, marže nebo ziskovost? Přežíváte z měsíce na měsíc?",
    },
  ]

  const consultations = [
    {
      number: "01",
      title: "Analýza situace",
      description:
        "Detailně se podíváme na aktuální stav vašeho podnikání. Najdeme silné i slabé stránky a přesně definujeme, co je potřeba vyřešit.",
    },
    {
      number: "02",
      title: "Identifikace problémů",
      description:
        "Zjistíme, co konkrétně nefunguje a proč. Budeme řešit strategii, marketing, obchod i ekonomiku podle vašich potřeb.",
    },
    {
      number: "03",
      title: "Návrh řešení a konkrétní plán",
      description:
        "Doporučím jasné a konkrétní kroky, jak problémy odstranit. Výstupem bude jasný plán, jak dál postupovat.",
    },
    {
      number: "04",
      title: "Nastavení implementace",
      description:
        "Společně nastavíme kroky realizace. Odcházíte s konkrétními úkoly, termíny a jasným přehledem, co dělat.",
    },
  ]

  const testimonials = [
    {
      name: "Eva",
      company: "Majitelka e-shopu",
      text: "Martin je skvělý konzultant, díky kterému jsme konečně získali jasnou vizi a směr pro naši firmu. Doporučuji všem, kdo potřebují přehled a reálné výsledky.",
      rating: 5,
    },
    {
      name: "Tomáš",
      company: "Majitel výrobní firmy",
      text: "Praktické rady, žádná zbytečná teorie. Díky konzultacím máme jasno, kam směřujeme a jak toho dosáhneme.",
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: "Jak probíhají konzultace?",
      answer: "Online přes Google Meet, termíny individuálně dle domluvy. Každá konzultace trvá 60-90 minut.",
    },
    {
      question: "Kolik času mi zabere příprava?",
      answer:
        "Příprava je minimální – stačí si jen ujasnit, co řešíte, vše ostatní vyřešíme společně během konzultací.",
    },
    {
      question: "Je tento produkt vhodný i pro začínající podnikatele?",
      answer:
        "Ano, konzultace jsou vhodné pro všechny podnikatele, kteří chtějí jasný směr a přehledný plán pro své podnikání.",
    },
    {
      question: "Co když budu potřebovat další pomoc po skončení konzultací?",
      answer: "Je možné pokračovat formou dalších konzultací podle individuálních potřeb.",
    },
    {
      question: "Co se stane, když se nám nepodaří dořešit mou situaci?",
      answer:
        "Samozřejmě vás nenechám odejít s nevyřešenou situaci. Můžeme celý proces natáhnout o jednu či dvě konzultace zdarma. Vyřešení problému je pro mě klíčové.",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center max-w-7xl">
          <div className="space-y-8 hero-content">
            <Badge className="bg-red-50 text-red-700 border-red-200 rounded-full px-4 py-2 epilogue-medium floating">
              ⚡ Omezená nabídka - pouze 10 míst měsíčně
            </Badge>

            <h1 className="text-4xl lg:text-6xl epilogue-bold leading-tight text-gray-900">
              Získejte <span className="text-[#0064D2]">jasný směr</span> pro vaše podnikání za 30 dní
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed epilogue-regular">
              4 individuální konzultace s Martinem Krejčířem, které vám pomohou vyřešit problémy, nastavit efektivní
              systémy a získat konkrétní plán pro růst vašeho podnikání.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#0064D2] hover:bg-[#0064D2] text-white text-lg px-8 py-4 rounded-full epilogue-medium transition-all duration-300 hover:scale-105 transform relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  Chci konzultace za 15.000 Kč
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 rounded-full border-2 border-[#0064D2] text-[#0064D2] hover:bg-[#0064D2] hover:text-white transition-all duration-300 epilogue-medium hover:scale-105 transform"
              >
                <Phone className="mr-2 h-5 w-5" />
                Zavolat zdarma
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500 epilogue-regular">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Bez rizika - záruka spokojenosti
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#0064D2]" />
                Výsledky za 30 dní
              </div>
            </div>
          </div>

          <div className="relative hero-video">
            <div className="relative bg-gradient-to-br from-[#141E82] to-[#0064D2] rounded-3xl p-5 shadow-2xl max-w-[75%] mx-auto">
              <div className="aspect-[9/16] rounded-2xl overflow-hidden relative">
                {/* Loading State */}
                {isVideoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl z-10">
                    <div className="text-center text-white space-y-4">
                      {/* Animated Loading Spinner */}
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
                        <div
                          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#0064D2] rounded-full animate-spin mx-auto"
                          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                        ></div>
                      </div>
                      {/* Loading Text */}
                      <div className="space-y-2">
                        <p className="epilogue-semibold text-lg">Načítání videa...</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Overlay - Only shows unmute button when muted */}
                {!isVideoLoading && isMuted && (
                  <button
                    onClick={handleVideoClick}
                    className="absolute inset-0 z-20 bg-black/20 hover:bg-black/30 transition-all duration-300 rounded-2xl cursor-pointer group"
                    aria-label="Zapnout zvuk a přehrát od začátku"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-6 shadow-2xl transform group-hover:scale-110 transition-all duration-300 animate-pulse">
                        <Volume2 className="h-12 w-12 text-[#0064D2]" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-center">
                      <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 text-white">
                        <p className="epilogue-bold text-lg mb-1">🔊 Zapněte si zvuk</p>
                      </div>
                    </div>
                  </button>
                )}

                {/* Invisible click area for play/pause when unmuted */}
                {!isVideoLoading && !isMuted && (
                  <button
                    onClick={handleVideoClick}
                    className="absolute inset-0 z-20 cursor-pointer"
                    aria-label={isPaused ? "Přehrát video" : "Pozastavit video"}
                    style={{ background: "transparent" }}
                  />
                )}

                {/* Video Container */}
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <div style={{ padding: "177.78% 0 0 0", position: "relative" }}>
                    <iframe
                      src="https://player.vimeo.com/video/1089007478?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&controls=0&loop=1&background=0&muted=1"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                      title="4x-konzultace-martin-krejcir"
                      className="rounded-2xl"
                      onLoad={() => {
                        // Hide loading after a short delay to ensure video is ready
                        setTimeout(() => setIsVideoLoading(false), 1500)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-white">
                <p className="epilogue-semibold">Martin Krejčíř vysvětluje</p>
                <p className="text-sm opacity-90 epilogue-regular">Jak vám pomohu vyřešit problémy vašeho podnikání</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl lg:text-5xl epilogue-bold mb-6 text-gray-900">Potýkáte se s těmito problémy?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto epilogue-regular">
              Většina podnikatelů řeší stejné výzvy. Pokud se v nich poznáváte, nejste sami a existuje řešení.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <Card
                key={index}
                className={`p-8 card-hover transition-shadow rounded-2xl bg-white border-0 shadow-sm scroll-reveal animate-delay-${(index + 1) * 100}`}
              >
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center animate-bounce-in animate-delay-200">
                    <problem.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl epilogue-bold text-gray-900">{problem.title}</h3>
                  <p className="text-gray-600 epilogue-regular">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal animate-slide-in-left">
              <h2 className="text-3xl lg:text-5xl epilogue-bold mb-8 text-gray-900">
                Řešení: <span className="text-[#0064D2]">4 konzultace</span> s Martinem Krejčířem
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4 animate-slide-up animate-delay-100">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="epilogue-semibold text-gray-900">Více než 20 let praxe</h4>
                    <p className="text-gray-600 epilogue-regular">Zkušenosti z více než 100 realizovaných projektů</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 animate-slide-up animate-delay-200">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="epilogue-semibold text-gray-900">Jasný a srozumitelný přístup</h4>
                    <p className="text-gray-600 epilogue-regular">Bez zbytečné teorie, pouze praktická řešení</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 animate-slide-up animate-delay-300">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="epilogue-semibold text-gray-900">Rychlé nalezení skutečných problémů</h4>
                    <p className="text-gray-600 epilogue-regular">Upřímná a konstruktivní zpětná vazba</p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-[#0064D2] hover:bg-[#0064D2] text-white rounded-full px-8 py-4 epilogue-medium transition-all duration-300 hover:scale-105 transform relative overflow-hidden group animate-scale-in animate-delay-400"
              >
                <span className="relative z-10 flex items-center">
                  Rezervovat konzultace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              </Button>
            </div>

            <div className="relative scroll-reveal animate-slide-in-right">
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="Martin Krejčíř - Business konzultant"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg animate-bounce-in animate-delay-600">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl epilogue-bold text-[#0064D2]">100+</div>
                    <div className="text-sm text-gray-600 epilogue-regular">Projektů</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl epilogue-bold text-[#0064D2]">20+</div>
                    <div className="text-sm text-gray-600 epilogue-regular">Let praxe</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl lg:text-5xl epilogue-bold mb-6 text-gray-900">Jak konzultace probíhají</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto epilogue-regular">
              Strukturovaný proces, který vás krok za krokem dovede k jasným výsledkům
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {consultations.map((consultation, index) => (
              <Card
                key={index}
                className={`relative p-6 card-hover transition-shadow rounded-2xl border-0 shadow-sm bg-white scroll-reveal animate-delay-${(index + 1) * 100}`}
              >
                <CardContent className="space-y-4">
                  <div className="text-4xl epilogue-bold text-[#0064D2] opacity-20 absolute top-4 right-4">
                    {consultation.number}
                  </div>
                  <div className="w-12 h-12 bg-[#0064D2] text-white rounded-2xl flex items-center justify-center epilogue-bold animate-scale-in animate-delay-200">
                    {consultation.number}
                  </div>
                  <h3 className="text-lg epilogue-bold text-gray-900">{consultation.title}</h3>
                  <p className="text-gray-600 text-sm epilogue-regular">{consultation.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 scroll-reveal animate-delay-500">
            <div className="inline-flex items-center gap-4 bg-white p-6 rounded-2xl shadow-lg animate-bounce-in">
              <Calendar className="h-8 w-8 text-[#0064D2]" />
              <div className="text-left">
                <div className="epilogue-semibold text-gray-900">Každá konzultace: 60-90 minut</div>
                <div className="text-sm text-gray-600 epilogue-regular">Online přes Google Meet</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl lg:text-5xl epilogue-bold mb-6 text-gray-900">Co říkají klienti</h2>
            <p className="text-xl text-gray-600 epilogue-regular">Reálné výsledky od skutečných podnikatelů</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`p-8 rounded-2xl border-0 shadow-sm card-hover scroll-reveal animate-delay-${(index + 1) * 200}`}
              >
                <CardContent className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400 animate-scale-in"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic epilogue-regular">"{testimonial.text}"</p>
                  <div>
                    <div className="epilogue-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 epilogue-regular">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl lg:text-5xl epilogue-bold mb-6 text-gray-900">Často kladené otázky</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`overflow-hidden rounded-2xl bg-white border-0 hover:bg-gray-50 transition-all duration-300 shadow-sm scroll-reveal animate-delay-${(index + 1) * 100}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between transition-all duration-300"
                >
                  <h3 className="epilogue-semibold text-gray-900">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 epilogue-regular">{faq.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 relative text-white bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/mk-socky-bg.png)" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="scroll-reveal animate-slide-in-left">
                <h2 className="text-3xl lg:text-5xl epilogue-bold mb-6">Začněte podnikat efektivně ještě dnes</h2>
                <p className="text-xl mb-8 opacity-90 epilogue-regular">
                  Získejte svůj jasný plán a konkrétní kroky k úspěchu. Pouze 10 míst měsíčně.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 animate-slide-up animate-delay-100">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <span className="epilogue-regular">4 individuální konzultace (60-90 min každá)</span>
                  </div>
                  <div className="flex items-center gap-3 animate-slide-up animate-delay-200">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <span className="epilogue-regular">Jasný plán a konkrétní kroky</span>
                  </div>
                  <div className="flex items-center gap-3 animate-slide-up animate-delay-300">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <span className="epilogue-regular">Záruka spokojenosti</span>
                  </div>
                  <div className="flex items-center gap-3 animate-slide-up animate-delay-400">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <span className="epilogue-regular">Možnost prodloužení zdarma</span>
                  </div>
                </div>

                <div className="text-4xl epilogue-bold mb-2 animate-scale-in animate-delay-500">15.000 Kč</div>
                <div className="text-lg opacity-75 epilogue-regular animate-fade-in animate-delay-600">
                  Jednorázová investice do vašeho úspěchu
                </div>
              </div>

              <Card className="p-8 rounded-2xl scroll-reveal animate-slide-in-right bg-white">
                <CardContent>
                  <h3 className="text-2xl epilogue-bold text-gray-900 mb-6">Rezervujte si své místo</h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-field animate-slide-up animate-delay-100">
                      <Label htmlFor="name" className="text-gray-700 epilogue-medium">
                        Jméno a příjmení *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="rounded-xl border-gray-300 epilogue-regular focus:border-[#0064D2] focus:ring-[#0064D2] transition-all duration-300"
                      />
                    </div>

                    <div className="form-field animate-slide-up animate-delay-200">
                      <Label htmlFor="email" className="text-gray-700 epilogue-medium">
                        E-mail *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="rounded-xl border-gray-300 epilogue-regular focus:border-[#0064D2] focus:ring-[#0064D2] transition-all duration-300"
                      />
                    </div>

                    <div className="form-field animate-slide-up animate-delay-300">
                      <Label htmlFor="phone" className="text-gray-700 epilogue-medium">
                        Telefon *
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="rounded-xl border-gray-300 epilogue-regular focus:border-[#0064D2] focus:ring-[#0064D2] transition-all duration-300"
                      />
                    </div>

                    <div className="form-field animate-slide-up animate-delay-400">
                      <Label htmlFor="company" className="text-gray-700 epilogue-medium">
                        Název firmy
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="rounded-xl border-gray-300 epilogue-regular focus:border-[#0064D2] focus:ring-[#0064D2] transition-all duration-300"
                      />
                    </div>

                    <div className="form-field animate-slide-up animate-delay-500">
                      <Label htmlFor="message" className="text-gray-700 epilogue-medium">
                        Stručně popište váš hlavní problém
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="rounded-xl border-gray-300 epilogue-regular focus:border-[#0064D2] focus:ring-[#0064D2] transition-all duration-300"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#0064D2] hover:bg-[#0064D2] rounded-full epilogue-medium transition-all duration-300 hover:scale-105 transform relative overflow-hidden group animate-scale-in animate-delay-600"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Objednat za 15.000 Kč
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                    </Button>

                    <p className="text-xs text-gray-600 text-center epilogue-regular animate-fade-in animate-delay-700">
                      Kliknutím souhlasíte se zpracováním osobních údajů
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8 scroll-reveal">
            <div className="animate-slide-up animate-delay-100">
              <h3 className="text-xl epilogue-bold mb-4">Martin Krejčíř</h3>
              <p className="text-gray-400 epilogue-regular mb-3">
                Business konzultant s více než 20 lety praxe. Pomáhám podnikatelům najít jasný směr a dosáhnout
                konkrétních výsledků.
              </p>
              <a
                href="https://www.martinkrejcir.cz/"
                className="text-[#0064D2] hover:text-white transition-colors epilogue-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.martinkrejcir.cz
              </a>
            </div>

            <div className="animate-slide-up animate-delay-200">
              <h3 className="text-xl epilogue-bold mb-4">Kontakt</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="epilogue-regular">napis@martinkrejcir.cz</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="epilogue-regular">+420 776 025 378</span>
                </div>
              </div>
            </div>

            <div className="animate-slide-up animate-delay-300">
              <h3 className="text-xl epilogue-bold mb-4">Záruka kvality</h3>
              <p className="text-gray-400 epilogue-regular">
                100% záruka spokojenosti. Pokud nebudete spokojeni, vrátíme vám peníze bez otázek.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in animate-delay-500">
            <p className="epilogue-regular">&copy; 2025 Martin Krejčíř. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
