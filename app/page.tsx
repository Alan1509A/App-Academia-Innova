"use client";

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Monitor, Cpu, 
  BookOpen, Terminal, CheckCircle, ArrowRight,
  MonitorPlay, Zap, Target, Compass, Eye,
  Users, Briefcase, FileText, XCircle
} from 'lucide-react';

// Tipos para el componente Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  className?: string;
}

// Tipos para el componente ServiceCard
interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  items: string[];
  colorClass: string;
}

// Tipos para el Modal Legal
interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Componente de Botón
const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const baseStyle = "px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1",
    secondary: "bg-white text-blue-900 border border-blue-200 hover:border-blue-300 hover:bg-blue-50 shadow-sm",
    outline: "border-2 border-white text-white hover:bg-white/10",
    dark: "bg-gray-900 hover:bg-gray-800 text-white shadow-lg transform hover:-translate-y-1"
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Componente de Tarjeta de Servicio
const ServiceCard = ({ icon: Icon, title, items, colorClass }: ServiceCardProps) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start text-gray-600">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Componente Modal para Documentos Legales
const LegalModal = ({ isOpen, onClose, title, children }: LegalModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-600 w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <XCircle className="w-7 h-7" />
          </button>
        </div>
        <div className="p-6 sm:p-8 overflow-y-auto text-gray-600 leading-relaxed text-sm sm:text-base space-y-4">
          {children}
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <Button onClick={onClose} variant="secondary" className="py-2 px-6">Entendido</Button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  // Estado para el formulario de contacto general
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    servicio: ''
  });

  // Estado para el formulario de colaboradores/profesores
  const [collabData, setCollabData] = useState({
    nombre: '',
    contacto: '',
    especialidad: '',
    aportacion: ''
  });

  // Manejar el scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // REEMPLAZA ESTE NÚMERO POR EL TUYO (código de país + número, sin el signo +)
  const NUMERO_WHATSAPP = "5552485628"; 

  // Función para enviar mensaje de clientes (Formulario de Contacto)
  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensaje = `Hola Academia Innova, soy ${formData.nombre}. Mi correo es ${formData.correo}. Me interesa información sobre el servicio de: ${formData.servicio || 'Información General'}.`;
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  // Función para enviar mensaje de profesores/colaboradores (Formulario Únete)
  const handleCollabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensaje = `*NUEVO APLICANTE A EQUIPO INNOVA* 🚀\n\nHola, soy ${collabData.nombre}.\n*Contacto:* ${collabData.contacto}\n*Especialidad:* ${collabData.especialidad}\n*Lo que puedo aportar:* ${collabData.aportacion}\n\nMe gustaría unirme a Academia Innova.`;
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const services = [
    {
      title: "Educación",
      icon: BookOpen,
      colorClass: "bg-blue-100 text-blue-600",
      items: [
        "Computación básica",
        "Microsoft Word, Excel, PowerPoint",
        "Internet seguro",
        "Inteligencia artificial aplicada",
        "Matemáticas",
        "Regularización escolar"
      ]
    },
    {
      title: "Tecnología",
      icon: Cpu,
      colorClass: "bg-gray-100 text-gray-700",
      items: [
        "Soporte técnico",
        "Mantenimiento de computadoras",
        "Instalación de Windows",
        "Optimización de equipos",
        "Diseño de páginas web"
      ]
    },
    {
      title: "Digitalización",
      icon: Zap,
      colorClass: "bg-green-100 text-green-600",
      items: [
        "Digitalización de negocios",
        "Automatización con IA",
        "Asesoría tecnológica",
        "Transformación digital",
        "Estrategias online"
      ]
    }
  ];

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      
      {/* Navegación */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <img src="/logo.png" alt="Logo Academia Innova" className="h-10 w-auto" />
            <div>
              <h1 className={`text-xl font-bold leading-tight ${isScrolled ? 'text-gray-900' : 'text-blue-900'}`}>Academia</h1>
              <p className={`text-sm font-semibold tracking-widest uppercase leading-tight ${isScrolled ? 'text-blue-600' : 'text-blue-700'}`}>Innova</p>
            </div>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('nosotros')} className={`font-medium hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-600' : 'text-blue-900/80'}`}>Nosotros</button>
            <button onClick={() => scrollToSection('servicios')} className={`font-medium hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-600' : 'text-blue-900/80'}`}>Servicios</button>
            <button onClick={() => scrollToSection('unete')} className={`font-medium hover:text-green-600 transition-colors ${isScrolled ? 'text-gray-600' : 'text-blue-900/80'}`}>Únete al equipo</button>
            <Button onClick={() => scrollToSection('contacto')} variant="primary" className="py-2 px-5">Empezar ahora</Button>
          </div>

          {/* Botón Menú Móvil */}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className={isScrolled ? 'text-gray-900' : 'text-blue-900'} /> : <Menu className={isScrolled ? 'text-gray-900' : 'text-blue-900'} />}
          </button>
        </div>

        {/* Menú Móvil Desplegable */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-6 flex flex-col space-y-4">
            <button onClick={() => scrollToSection('nosotros')} className="text-left font-medium text-gray-700 hover:text-blue-600 py-2">Nosotros</button>
            <button onClick={() => scrollToSection('servicios')} className="text-left font-medium text-gray-700 hover:text-blue-600 py-2">Servicios</button>
            <button onClick={() => scrollToSection('unete')} className="text-left font-medium text-gray-700 hover:text-green-600 py-2">Únete al equipo</button>
            <Button onClick={() => scrollToSection('contacto')} className="w-full">Empezar ahora</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-green-100/40 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-6 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              El futuro de la educación digital
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
              Aprende <span className="text-blue-600">hoy.</span><br />
              Innova <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">mañana.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Transformamos vidas a través de la educación, la tecnología y la innovación. Desarrolla habilidades prácticas para enfrentar los retos del futuro.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => scrollToSection('servicios')} className="w-full sm:w-auto text-lg px-8">
                Ver servicios <ArrowRight className="w-5 h-5" />
              </Button>
              <Button onClick={() => scrollToSection('nosotros')} variant="secondary" className="w-full sm:w-auto text-lg px-8">
                Conocer más
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Nuestra Identidad</h2>
              <div className="w-20 h-1 bg-blue-600 mb-8 rounded-full"></div>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Propósito</h3>
                    <p className="text-gray-600 leading-relaxed">Transformar vidas a través de la educación, la tecnología y la innovación, brindando conocimientos prácticos que permitan a las personas desarrollarse académica y profesionalmente.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                      <Compass className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Misión</h3>
                    <p className="text-gray-600 leading-relaxed">Ofrecer educación de calidad, accesible y actualizada, impulsando el desarrollo de habilidades tecnológicas, científicas y digitales mediante una enseñanza práctica e innovadora.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Visión</h3>
                    <p className="text-gray-600 leading-relaxed">Ser una academia referente en México en educación tecnológica e innovación, reconocida por formar personas preparadas para enfrentar los retos del futuro.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-tr from-blue-100 to-green-50 p-8 shadow-inner border border-gray-100 flex items-center justify-center">
                 <div className="grid grid-cols-2 gap-4 w-full h-full">
                    <div className="bg-blue-600 rounded-2xl shadow-lg flex flex-col justify-center items-center text-white p-6 transform hover:scale-105 transition-transform">
                       <Monitor className="w-12 h-12 mb-4" />
                       <span className="font-bold">Educación</span>
                    </div>
                    <div className="bg-gray-800 rounded-2xl shadow-lg flex flex-col justify-center items-center text-white p-6 mt-8 transform hover:scale-105 transition-transform">
                       <Cpu className="w-12 h-12 mb-4" />
                       <span className="font-bold">Tecnología</span>
                    </div>
                    <div className="bg-green-500 rounded-2xl shadow-lg flex flex-col justify-center items-center text-white p-6 -mt-8 transform hover:scale-105 transition-transform">
                       <Zap className="w-12 h-12 mb-4" />
                       <span className="font-bold">Innovación</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg flex flex-col justify-center items-center text-blue-600 p-6 border border-gray-100 transform hover:scale-105 transition-transform">
                       <Terminal className="w-12 h-12 mb-4" />
                       <span className="font-bold">Práctica</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Nuestros Servicios</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600">
              Soluciones integrales diseñadas para impulsar tu desarrollo personal, académico y el crecimiento de tu negocio en la era digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN NUEVA: Únete al equipo */}
      <section id="unete" className="py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Texto de la sección */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 font-semibold text-sm mb-6 border border-green-100">
                <Users className="w-4 h-4" />
                Bolsa de Talento
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">¿Eres profesional o profesor? <span className="text-green-500">Únete al equipo</span></h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                En Academia Innova siempre estamos buscando mentes brillantes. Si eres apasionado por la enseñanza, dominas la tecnología o eres experto en digitalización, queremos conocerte.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Oportunidades de crecimiento y networking.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Monitor className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Imparte clases presenciales o en línea.</span>
                </div>
              </div>
            </div>

            {/* Formulario de Colaboradores */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Envíanos tu propuesta</h3>
              <form className="space-y-4" onSubmit={handleCollabSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                  <input type="text" required placeholder="Ej. Ana García" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all" 
                    value={collabData.nombre} onChange={(e) => setCollabData({...collabData, nombre: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono o Correo</label>
                    <input type="text" required placeholder="Tu contacto principal" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none transition-all" 
                      value={collabData.contacto} onChange={(e) => setCollabData({...collabData, contacto: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tu Especialidad</label>
                    <input type="text" required placeholder="Ej. Matemáticas, IA, etc." className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none transition-all" 
                      value={collabData.especialidad} onChange={(e) => setCollabData({...collabData, especialidad: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">¿Qué te gustaría aportar a la academia?</label>
                  <textarea required rows={3} placeholder="Cuéntanos brevemente tu experiencia y qué cursos o servicios te gustaría ofrecer..." className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none transition-all resize-none"
                    value={collabData.aportacion} onChange={(e) => setCollabData({...collabData, aportacion: e.target.value})}
                  ></textarea>
                </div>
                <Button type="submit" variant="dark" className="w-full mt-2">
                  Enviar propuesta <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para innovar tu futuro?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Únete a Academia Innova y da el primer paso hacia el dominio tecnológico y digital.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
              <form className="grid sm:grid-cols-2 gap-4" onSubmit={handleClientSubmit}>
                <input 
                  type="text" 
                  required
                  placeholder="Tu nombre" 
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="px-4 py-3 rounded-lg bg-white/95 border-0 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none w-full" 
                />
                <input 
                  type="email" 
                  required
                  placeholder="Tu correo electrónico" 
                  value={formData.correo}
                  onChange={(e) => setFormData({...formData, correo: e.target.value})}
                  className="px-4 py-3 rounded-lg bg-white/95 border-0 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none w-full" 
                />
                <select 
                  defaultValue="" 
                  required
                  onChange={(e) => setFormData({...formData, servicio: e.target.value})}
                  className="px-4 py-3 rounded-lg bg-white/95 border-0 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none w-full sm:col-span-2"
                >
                  <option value="" disabled>¿Qué servicio te interesa?</option>
                  <option value="Educación (Cursos, Regularización)">Educación (Cursos, Regularización)</option>
                  <option value="Tecnología (Soporte, Diseño Web)">Tecnología (Soporte, Diseño Web)</option>
                  <option value="Digitalización (Negocios, IA)">Digitalización (Negocios, IA)</option>
                </select>
                <button type="submit" className="sm:col-span-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2 text-lg">
                  Solicitar Información por WhatsApp <ChevronRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Logo Academia Innova" className="h-8 w-auto brightness-0 invert opacity-90" />
                <h2 className="text-xl font-bold text-white">Academia <span className="text-blue-500">Innova</span></h2>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                Transformando vidas a través de la educación, la tecnología y la innovación en México.
              </p>
            </div>
            
            <div className="flex justify-center">
               <span className="italic font-medium text-gray-400">"Aprende hoy. Innova mañana."</span>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <span className="text-sm font-semibold text-gray-400 mb-1">Síguenos:</span>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/share/1BVZwoQt6r/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
                <a href="https://www.instagram.com/academiainnova.mx?igsh=MW1ua2pmODhjNjJnZQ==" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div className="flex flex-col mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} Academia Innova. Todos los derechos reservados.</p>
              <p className="mt-1 text-gray-400">Desarrollado por <span className="text-white font-medium">Alan Martínez</span></p>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors underline underline-offset-4">Aviso de Privacidad</button>
              <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors underline underline-offset-4">Términos y Condiciones</button>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALES LEGALES */}
      <LegalModal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
        title="Aviso de Privacidad"
      >
        <p className="font-semibold text-gray-900">Última actualización: {new Date().toLocaleDateString()}</p>
        <p>En <strong>Academia Innova</strong>, valoramos su privacidad y estamos comprometidos con la protección de sus datos personales, en estricto apego a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México).</p>
        
        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">1. Datos Recabados</h3>
        <p>Para brindarle nuestros servicios educativos y tecnológicos, recabamos los siguientes datos: Nombre completo, correo electrónico, número telefónico y área de interés profesional o educativa.</p>
        
        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">2. Finalidad del Uso de Datos</h3>
        <p>Los datos recabados serán utilizados exclusiva y estrictamente para las siguientes finalidades principales:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Proveer información sobre los servicios educativos y tecnológicos solicitados.</li>
          <li>Evaluar perfiles para posibles colaboraciones laborales (bolsa de trabajo).</li>
          <li>Comunicación directa vía WhatsApp o correo electrónico para seguimiento.</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">3. Derechos ARCO</h3>
        <p>Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información (Rectificación); que la eliminemos de nuestros registros (Cancelación); así como oponerse al uso de sus datos para fines específicos (Oposición).</p>
        
        <p className="mt-4 italic">Para ejercer sus derechos ARCO, por favor contáctenos a través de nuestros canales oficiales descritos en esta página web.</p>
      </LegalModal>

      <LegalModal 
        isOpen={activeModal === 'terms'} 
        onClose={() => setActiveModal(null)} 
        title="Términos y Condiciones"
      >
        <p className="font-semibold text-gray-900">Última actualización: {new Date().toLocaleDateString()}</p>
        <p>Bienvenido al sitio web de <strong>Academia Innova</strong>. Al acceder y utilizar este sitio web, usted acepta estar sujeto a los siguientes términos y condiciones de uso.</p>
        
        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">1. Uso del Sitio Web</h3>
        <p>El contenido de las páginas de este sitio web es para su información y uso general exclusivamente. Está sujeto a cambios sin previo aviso. Ni nosotros ni terceros brindamos ninguna garantía en cuanto a la exactitud, puntualidad, rendimiento, integridad o idoneidad de la información y los materiales encontrados u ofrecidos en este sitio web.</p>
        
        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">2. Propiedad Intelectual</h3>
        <p>Este sitio web contiene material que es de nuestra propiedad o está bajo licencia nuestra. Este material incluye, pero no se limita a, el diseño, la presentación, la apariencia y los gráficos. La reproducción está prohibida salvo de conformidad con el aviso de derechos de autor, que forma parte de estos términos y condiciones.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">3. Servicios y Solicitudes</h3>
        <p>Al enviar información a través de nuestros formularios (Contacto y Bolsa de Talento), usted garantiza que la información proporcionada es verdadera y le pertenece. Academia Innova se reserva el derecho de responder o no a las solicitudes de colaboración basándose en las necesidades operativas de la academia.</p>

        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">4. Enlaces a Terceros</h3>
        <p>De vez en cuando, este sitio web también puede incluir enlaces a otros sitios web (ej. WhatsApp, Redes Sociales). Estos enlaces se proporcionan para su conveniencia para proporcionar más información. No significan que respaldamos los sitios web. No tenemos ninguna responsabilidad por el contenido de los sitios web vinculados.</p>
      </LegalModal>

    </div>
  );
}