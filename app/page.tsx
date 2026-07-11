"use client";

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Monitor, Cpu, 
  BookOpen, Terminal, CheckCircle, ArrowRight,
  Zap, 
  Users, Briefcase, FileText, XCircle,
  Atom, FlaskConical, Globe,
  GraduationCap, Clock, DollarSign, Languages, Star
} from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  className?: string;
}

interface MateriaCardProps {
  icon: React.ElementType;
  title: string;
  items: string[];
  colorClass: string;
  emoji: string;
  proximamente?: boolean;
}

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Interfaz para los docentes 
interface Docente {
  id: string;
  nombre: string;
  rol: string;
  foto: string;
  formacion: string;
  especialidades: string[];
  materias: string[];
  modalidad: string;
  idiomas: string[];
  presentacion: string;
  horarios: string;
  precio: string;
  redes?: {
    linkedin?: string;
    github?: string;
    web?: string;
  };
  proximamente?: boolean;
}

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

const MateriaCard = ({ icon: Icon, title, items, colorClass, emoji, proximamente = false }: MateriaCardProps) => (
  <div className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 ${proximamente ? 'opacity-75 grayscale-[30%]' : 'hover:shadow-xl group'}`}>
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClass} ${!proximamente && 'group-hover:scale-110'} transition-transform duration-300`}>
        <Icon className="w-7 h-7" />
      </div>
      {proximamente && (
        <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Próximamente
        </span>
      )}
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <span>{emoji}</span> {title}
    </h3>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start text-gray-600">
          <CheckCircle className={`w-5 h-5 mr-2 flex-shrink-0 mt-0.5 ${proximamente ? 'text-gray-400' : 'text-green-500'}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
    {proximamente && (
      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-500 italic">Estamos preparando los mejores contenidos.</p>
      </div>
    )}
  </div>
);

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
  
  // Estados para modales
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);
  const [selectedDocente, setSelectedDocente] = useState<Docente | null>(null);

  // Estados para formularios
  const [formData, setFormData] = useState({ nombre: '', correo: '', materia: '' });
  const [collabData, setCollabData] = useState({ nombre: '', contacto: '', especialidad: '', aportacion: '' });

  // REEMPLAZA ESTE NÚMERO POR EL TUYO
  const NUMERO_WHATSAPP = "5645789049"; 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
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

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensaje = `Hola Academia Innova, soy ${formData.nombre}. Mi correo es ${formData.correo}. Me interesa información sobre: ${formData.materia || 'Información General'}.`;
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const handleCollabSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensaje = `*NUEVO APLICANTE A EQUIPO INNOVA* 🚀\n\nHola, soy ${collabData.nombre}.\n*Contacto:* ${collabData.contacto}\n*Especialidad:* ${collabData.especialidad}\n*Aportación:* ${collabData.aportacion}\n\nMe gustaría unirme a la academia.`;
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const handleAgendarProfesor = (profesor: string) => {
    const mensaje = `Hola Academia Innova, me gustaría solicitar información y agendar una clase con el profesor/a *${profesor}*.`;
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const listaDocentes: Docente[] = [
    {
      id: "alan-martinez",
      nombre: "Alan Martínez",
      rol: "Director y Docente",
      // Aquí está el enlace de la foto. Puedes cambiar esto por "/foto-alan.jpg" cuando subas tu foto a la carpeta public
      foto: "/foto-alan2.jpg",
      formacion: "Licenciatura en Ciencias de la Informatica en Instituto Politecnico Nacional - UPIICSA",
      especialidades: ["Matematicas, Desarrollo Web", "Inteligencia Artificial Aplicada", "Ofimática y Herramientas Digitales"],
      materias: ["Algebra, Aritmetica, Computación básica", "IA aplicada", "Diseño web", "Microsoft Office"],
      modalidad: "Individual y Grupal (100% Online)",
      idiomas: ["Español (Nativo)"],
      presentacion: "Soy Alan Eduardo, apasionado por la tecnología, la innovación y la digitalización. Creo firmemente que la educación es la herramienta más poderosa para transformar el futuro de las personas. \n\nMi objetivo en Academia Innova no es solo enseñar a usar herramientas, sino desarrollar un pensamiento crítico y tecnológico en mis estudiantes. Con experiencia en el entorno digital, he diseñado mis clases para que sean dinámicas, prácticas y, sobre todo, aplicables al mundo real, ya sea para mejorar en la escuela, conseguir un mejor empleo o digitalizar un negocio.",
      horarios: "Lunes a Viernes: 4:00 PM - 8:00 PM (Horario flexible bajo disponibilidad)",
      precio: "Desde $100 MXN / hora",
      redes: {
        linkedin: "www.linkedin.com/in/alan-eduardo-martinez-pérez-1514541a6",
      }
    },
    {
      id: "diana abella",
      nombre: "Diana Abella",
      rol: "Docente fundadora y especialista en Gerencia de Proyectos",
      foto: "/foto-diana.jpg",
      formacion: "Profesional en Trabajo Social, Especialista en Gerencia de Proyectos y Formacion Academica en Desarrollo Sostenible y Responsabilidad Social",
      especialidades: ["Gestion de Proyectos Sociales", "Intervencion Comunitaria y acompañamiento psicosocial", "Comunicacion efectiva y liderazgo"],
      materias: ["Formulacion de Proyectos Sociales: de la idea a la accion"],
      modalidad: "Online",
      idiomas: ["Español (Nativo)"],
      presentacion: "Trabajadora social y Especialista en Gerencia de Proyectos con experiencia en diseño e implementacion de proyectos sociales y procesos formativos dirigidos a profesionales y comunidades. Experiencia en docencia en diplomados, diseño curricular y facilitacion de formacion presencial y virtual, con enfoque de derechos humanos, genero y participacion social. Orientada al fortalecimiento de capacidades, la articulacion interinstitucional y la generacion de impacto social sostenible.",
      horarios: "Por definir",
      precio: "350 MXN",
      redes: {
        linkedin: "https://www.linkedin.com/in/diana-abella/",
      }
    }, 
  ];

  const materias = [
    {
      title: "Tecnología", emoji: "💻", icon: Terminal, colorClass: "bg-blue-100 text-blue-600", proximamente: false,
      items: ["Computación básica", "Microsoft Office", "Diseño web", "IA aplicada", "Internet seguro"]
    },
    {
      title: "Matemáticas", emoji: "📐", icon: CalculatorIcon, colorClass: "bg-green-100 text-green-600", proximamente: false,
      items: ["Aritmética y Álgebra", "Geometría y Trigonometría", "Cálculo", "Regularización escolar", "Preparación exámenes"]
    },
    {
      title: "Física", emoji: "⚛️", icon: Atom, colorClass: "bg-purple-100 text-purple-600", proximamente: true,
      items: ["Mecánica Clásica", "Termodinámica", "Electromagnetismo", "Óptica"]
    },
    {
      title: "Química", emoji: "🧪", icon: FlaskConical, colorClass: "bg-yellow-100 text-yellow-600", proximamente: true,
      items: ["Química Orgánica", "Química Inorgánica", "Estequiometría", "Laboratorio Virtual"]
    },
    {
      title: "Idiomas", emoji: "🌎", icon: Globe, colorClass: "bg-red-100 text-red-600", proximamente: true,
      items: ["Inglés Básico a Avanzado", "Preparación TOEFL", "Conversación práctica", "Inglés técnico"]
    }
  ];

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      
      {/* Barra superior de anuncios */}
      <div className="bg-blue-900 text-white text-xs sm:text-sm py-2 px-4 relative z-[60] w-full text-center tracking-wide overflow-hidden whitespace-nowrap overflow-x-auto no-scrollbar">
        <span className="mx-2 sm:mx-4 inline-flex items-center gap-1">📚 Más de 10 áreas de aprendizaje</span>
        <span className="hidden sm:inline text-blue-400">|</span>
        <span className="mx-2 sm:mx-4 inline-flex items-center gap-1">💻 Modalidad 100% en línea</span>
        <span className="hidden sm:inline text-blue-400">|</span>
        <span className="mx-2 sm:mx-4 inline-flex items-center gap-1">👨‍🏫 Docentes especializados</span>
      </div>

      {/* Navegación */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'top-0 bg-white/95 backdrop-blur-md shadow-md py-3' : 'top-8 sm:top-9 bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <img src="/logo.png" alt="Logo Academia Innova" className="h-10 w-auto" />
            <div>
              <h1 className={`text-xl font-bold leading-tight ${isScrolled ? 'text-gray-900' : 'text-blue-900'}`}>Academia</h1>
              <p className={`text-sm font-semibold tracking-widest uppercase leading-tight ${isScrolled ? 'text-blue-600' : 'text-blue-700'}`}>Innova</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('nosotros')} className={`font-medium hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-600' : 'text-blue-900/80'}`}>Nosotros</button>
            <button onClick={() => scrollToSection('materias')} className={`font-medium hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-600' : 'text-blue-900/80'}`}>Cursos</button>
            <button onClick={() => scrollToSection('docentes')} className={`font-medium hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-600' : 'text-blue-900/80'}`}>Docentes</button>
            <button onClick={() => scrollToSection('unete')} className={`font-medium hover:text-green-600 transition-colors ${isScrolled ? 'text-gray-600' : 'text-blue-900/80'}`}>Únete al equipo</button>
          </div>

          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className={isScrolled ? 'text-gray-900' : 'text-blue-900'} /> : <Menu className={isScrolled ? 'text-gray-900' : 'text-blue-900'} />}
          </button>
        </div>

        {/* Menú Móvil */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-6 flex flex-col space-y-4">
            <button onClick={() => scrollToSection('nosotros')} className="text-left font-medium text-gray-700 hover:text-blue-600 py-2">Nosotros</button>
            <button onClick={() => scrollToSection('materias')} className="text-left font-medium text-gray-700 hover:text-blue-600 py-2">Cursos</button>
            <button onClick={() => scrollToSection('docentes')} className="text-left font-medium text-gray-700 hover:text-blue-600 py-2">Docentes</button>
            <button onClick={() => scrollToSection('unete')} className="text-left font-medium text-gray-700 hover:text-green-600 py-2">Únete al equipo</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden">
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
              <Button onClick={() => scrollToSection('materias')} className="w-full sm:w-auto text-lg px-8">
                📚 Explorar cursos
              </Button>
              <Button onClick={() => scrollToSection('docentes')} variant="secondary" className="w-full sm:w-auto text-lg px-8">
                👨‍🏫 Conocer docentes
              </Button>
              <Button onClick={() => scrollToSection('contacto')} variant="outline" className="w-full sm:w-auto text-lg px-8 bg-gray-900 text-white border-gray-900 hover:bg-gray-800">
                🚀 Comenzar ahora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
            <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border-2 border-blue-100 relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center border-4 border-white shadow-sm">1</span>
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">1️⃣ Elige la materia</h3>
              <p className="text-gray-600 text-sm">Explora nuestras áreas y decide qué quieres dominar.</p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border-2 border-green-100 relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white font-bold rounded-full flex items-center justify-center border-4 border-white shadow-sm">2</span>
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">2️⃣ Selecciona al docente</h3>
              <p className="text-gray-600 text-sm">Escoge al especialista y mira su perfil detallado.</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border-2 border-purple-100 relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 text-white font-bold rounded-full flex items-center justify-center border-4 border-white shadow-sm">3</span>
                <CalendarIcon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">3️⃣ Agenda tu clase</h3>
              <p className="text-gray-600 text-sm">Contáctalo directo y elige el horario que más te convenga.</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border-2 border-orange-100 relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white font-bold rounded-full flex items-center justify-center border-4 border-white shadow-sm">4</span>
                <LaptopIcon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">4️⃣ Aprende donde sea</h3>
              <p className="text-gray-600 text-sm">Conéctate 100% online y comienza a innovar tu futuro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-20 bg-gray-50">
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
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
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

      {/* Materias Section */}
      <section id="materias" className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Nuestros Cursos</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600">
              Explora nuestra oferta educativa. Contamos con áreas de aprendizaje diseñadas para impulsar tu desarrollo en la era digital.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materias.map((materia, index) => (
              <MateriaCard key={index} {...materia} />
            ))}
          </div>
        </div>
      </section>

      {/* Docentes Section */}
      <section id="docentes" className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Conoce a nuestros docentes fundadores</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600">
              Aprende de especialistas apasionados por la enseñanza y expertos en su área. Nuestro equipo crece día con día.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {listaDocentes.map((docente) => (
              <div key={docente.id} className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 flex flex-col ${docente.proximamente ? 'border-gray-200 border-dashed opacity-80' : 'border-gray-100 hover:shadow-xl'}`}>
                <div className={`h-32 relative ${docente.proximamente ? 'bg-gray-200' : 'bg-blue-600'}`}>
                  {/* Patrón de fondo */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                  {docente.proximamente && (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-gray-500 font-medium italic">Próximamente...</span>
                    </div>
                  )}
                </div>
                
                <div className="px-6 pb-6 relative flex-grow flex flex-col">
                  <div className={`w-24 h-24 rounded-full border-4 border-white shadow-lg absolute -top-12 left-6 overflow-hidden flex items-center justify-center bg-white ${docente.proximamente ? 'bg-gray-100' : ''}`}>
                    {docente.foto ? (
                      <img src={docente.foto} alt={docente.nombre} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="pt-14 flex flex-col flex-grow">
                    <div className="inline-flex self-start items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
                      {docente.rol}
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${docente.proximamente ? 'text-gray-400' : 'text-gray-900'}`}>{docente.nombre}</h3>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      {!docente.proximamente ? (
                        <Button 
                          variant="secondary" 
                          className="w-full text-sm py-2 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                          onClick={() => setSelectedDocente(docente)}
                        >
                          Ver perfil completo
                        </Button>
                      ) : (
                        <p className="text-gray-400 text-sm leading-relaxed italic text-center">
                          Estamos trabajando para integrar a los mejores profesionales a nuestro equipo.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Únete al equipo Section */}
      <section id="unete" className="py-20 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 font-semibold text-sm mb-6 border border-green-100">
                <Briefcase className="w-4 h-4" />
                Bolsa de Talento
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">¿Eres profesional o profesor? <span className="text-green-500">Únete al equipo</span></h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                En Academia Innova siempre estamos buscando mentes brillantes. Si eres apasionado por la enseñanza, dominas tu materia y quieres inspirar a otros, queremos conocerte y ver cómo puedes aportar a nuestra comunidad.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Oportunidades de crecimiento y flexibilidad.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <LaptopIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Imparte clases 100% en línea a tu propio ritmo.</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Envíanos tu propuesta</h3>
              <form className="space-y-4" onSubmit={handleCollabSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                  <input type="text" required placeholder="Ej. Diana Gómez" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none transition-all" 
                    value={collabData.nombre} onChange={(e) => setCollabData({...collabData, nombre: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono / WhatsApp</label>
                    <input type="text" required placeholder="Tu contacto" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none transition-all" 
                      value={collabData.contacto} onChange={(e) => setCollabData({...collabData, contacto: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tu Especialidad</label>
                    <input type="text" required placeholder="Ej. Inglés, Física..." className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none transition-all" 
                      value={collabData.especialidad} onChange={(e) => setCollabData({...collabData, especialidad: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">¿Qué te gustaría aportar a la academia?</label>
                  <textarea required rows={3} placeholder="Cuéntanos brevemente tu experiencia y qué materias te gustaría impartir..." className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none transition-all resize-none"
                    value={collabData.aportacion} onChange={(e) => setCollabData({...collabData, aportacion: e.target.value})}
                  ></textarea>
                </div>
                <Button type="submit" variant="dark" className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white">
                  Enviar solicitud <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Contacto Final Section */}
      <section id="contacto" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">🚀 ¿Listo para comenzar ahora?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Inscríbete hoy en Academia Innova y da el primer paso hacia tu crecimiento.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
              <form className="grid sm:grid-cols-2 gap-4" onSubmit={handleClientSubmit}>
                <input 
                  type="text" required placeholder="Tu nombre" 
                  value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="px-4 py-3 rounded-lg bg-white/95 border-0 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none w-full" 
                />
                <input 
                  type="email" required placeholder="Tu correo electrónico" 
                  value={formData.correo} onChange={(e) => setFormData({...formData, correo: e.target.value})}
                  className="px-4 py-3 rounded-lg bg-white/95 border-0 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none w-full" 
                />
                <select 
                  defaultValue="" required
                  onChange={(e) => setFormData({...formData, materia: e.target.value})}
                  className="px-4 py-3 rounded-lg bg-white/95 border-0 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none w-full sm:col-span-2"
                >
                  <option value="" disabled>¿Qué área quieres aprender?</option>
                  <option value="Tecnología">💻 Tecnología (Computación, Web, IA)</option>
                  <option value="Matemáticas">📐 Matemáticas (Álgebra, Cálculo)</option>
                  <option value="Física (Lista de Espera)">⚛️ Física (Lista de Espera)</option>
                  <option value="Química (Lista de Espera)">🧪 Química (Lista de Espera)</option>
                  <option value="Idiomas (Lista de Espera)">🌎 Idiomas (Lista de Espera)</option>
                </select>
                <button type="submit" className="sm:col-span-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2 text-lg">
                  Agendar mi clase por WhatsApp <ChevronRight className="w-5 h-5" />
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
                Transformando vidas a través de la educación, la tecnología y la innovación en México. Modalidad 100% en línea.
              </p>
            </div>
            
            <div className="flex justify-center">
               <span className="italic font-medium text-gray-400">"Aprende hoy. Innova mañana."</span>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <span className="text-sm font-semibold text-gray-400 mb-1">Síguenos:</span>
              <div className="flex gap-4">
                <a href="https://facebook.com/tu-pagina" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a>
                <a href="https://instagram.com/tu-pagina" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
                <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
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

      <LegalModal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)} title="Aviso de Privacidad">
        <p className="font-semibold text-gray-900">Última actualización: {new Date().toLocaleDateString()}</p>
        <p>En <strong>Academia Innova</strong>, valoramos su privacidad y estamos comprometidos con la protección de sus datos personales, en estricto apego a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México).</p>
        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">1. Datos Recabados</h3>
        <p>Para brindarle nuestros servicios educativos y tecnológicos, recabamos los siguientes datos: Nombre completo, correo electrónico, número telefónico y área de interés.</p>
        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">2. Finalidad del Uso de Datos</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Proveer información sobre las materias y agendar clases.</li>
          <li>Evaluar perfiles para posibles colaboraciones laborales (bolsa de trabajo).</li>
          <li>Comunicación directa vía WhatsApp o correo electrónico para seguimiento.</li>
        </ul>
        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">3. Derechos ARCO</h3>
        <p>Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información (Rectificación); que la eliminemos de nuestros registros (Cancelación); así como oponerse al uso de sus datos para fines específicos (Oposición).</p>
      </LegalModal>

      <LegalModal isOpen={activeModal === 'terms'} onClose={() => setActiveModal(null)} title="Términos y Condiciones">
        <p className="font-semibold text-gray-900">Última actualización: {new Date().toLocaleDateString()}</p>
        <p>Bienvenido al sitio web de <strong>Academia Innova</strong>. Al acceder y utilizar este sitio web, usted acepta estar sujeto a los siguientes términos y condiciones de uso.</p>
        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">1. Modalidad en Línea</h3>
        <p>Academia Innova ofrece servicios educativos 100% en línea. Es responsabilidad del estudiante contar con el equipo (computadora/tablet) y la conexión a internet necesarios para acceder a sus clases.</p>
        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">2. Agendamiento y Cancelaciones</h3>
        <p>El agendamiento de clases se realiza directamente con los docentes a través de nuestros canales oficiales (WhatsApp). Las políticas de cancelación y reprogramación dependen del acuerdo establecido al momento de agendar la clase.</p>
        <h3 className="text-lg font-bold text-gray-900 mt-6 mb-2">3. Servicios y Solicitudes de Docentes</h3>
        <p>Al enviar información a través de la Bolsa de Talento, usted garantiza que la información proporcionada es verdadera. Academia Innova se reserva el derecho de seleccionar a sus colaboradores basándose en sus estándares de calidad educativa.</p>
      </LegalModal>

      {/* MODAL DEL PERFIL DEL DOCENTE */}
      {selectedDocente && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedDocente(null)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Cabecera del modal */}
            <div className="relative bg-blue-600 p-6 sm:p-8 flex items-center justify-between">
              {/* Patrón de fondo */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 w-full">
                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-2xl p-1 shadow-lg flex-shrink-0 mt-4 sm:mt-0 sm:absolute sm:-bottom-12">
                   <img src={selectedDocente.foto} alt={selectedDocente.nombre} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="sm:ml-36 text-center sm:text-left text-white w-full">
                   <h2 className="text-3xl font-bold mb-1">{selectedDocente.nombre}</h2>
                   <p className="text-blue-100 font-medium">{selectedDocente.rol}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDocente(null)} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-20 bg-black/10 hover:bg-black/20 rounded-full p-1">
                <XCircle className="w-7 h-7" />
              </button>
            </div>

            {/* Cuerpo del modal (Scroll) */}
            <div className="p-6 sm:p-8 overflow-y-auto bg-gray-50 flex-grow sm:pt-16">
               <div className="grid md:grid-cols-3 gap-8">
                  {/* Columna Izquierda (Principal) */}
                  <div className="md:col-span-2 space-y-8">
                     
                     {/* Presentación */}
                     <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
                           <UserIcon className="w-5 h-5 text-blue-600" /> Sobre mí
                        </h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                           {selectedDocente.presentacion}
                        </p>
                     </div>

                     {/* Formación y Especialidades */}
                     <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                           <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-blue-600" /> Formación Académica
                           </h3>
                           <p className="text-gray-600 text-sm">{selectedDocente.formacion}</p>
                        </div>
                        <div>
                           <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <Star className="w-4 h-4 text-blue-600" /> Especialidades
                           </h3>
                           <ul className="space-y-1">
                              {selectedDocente.especialidades.map((esp, i) => (
                                 <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                                    <span className="text-blue-500 font-bold">•</span> {esp}
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>

                     <Button className="w-full mt-4" onClick={() => handleAgendarProfesor(selectedDocente.nombre)}>
                        Agendar Clase <ArrowRight className="w-4 h-4" />
                     </Button>

                  </div>

                  {/* Columna Derecha (Detalles) */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 h-fit">
                     <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Materias</span>
                        <div className="flex flex-wrap gap-2">
                           {selectedDocente.materias.map((mat, i) => (
                              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">{mat}</span>
                           ))}
                        </div>
                     </div>
                     <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Modalidad</span>
                        <p className="text-gray-700 text-sm flex items-center gap-2"><Monitor className="w-4 h-4 text-gray-400" /> {selectedDocente.modalidad}</p>
                     </div>
                     <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Idiomas</span>
                        <p className="text-gray-700 text-sm flex items-center gap-2"><Languages className="w-4 h-4 text-gray-400" /> {selectedDocente.idiomas.join(", ")}</p>
                     </div>
                     <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Horarios Base</span>
                        <p className="text-gray-700 text-sm flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" /> {selectedDocente.horarios}</p>
                     </div>
                     <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Inversión</span>
                        <p className="text-green-600 font-bold flex items-center gap-2"><DollarSign className="w-4 h-4" /> {selectedDocente.precio}</p>
                     </div>
                     
                     {/* Redes Sociales del Docente */}
                     {selectedDocente.redes && (
                        <div className="pt-4 border-t border-gray-100 flex justify-center gap-4">
                           {selectedDocente.redes.linkedin && (
                              <a href={selectedDocente.redes.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                                 <LinkedinIcon className="w-5 h-5" />
                              </a>
                           )}
                           {selectedDocente.redes.web && (
                              <a href={selectedDocente.redes.web} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-600 hover:text-white transition-colors">
                                 <Globe className="w-5 h-5" />
                              </a>
                           )}
                        </div>
                     )}
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Iconos adicionales (SVGs inline) para evitar problemas de importación
function Target(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
}
function Compass(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;
}
function Eye(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}
function UserIcon(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function CalculatorIcon(props: any) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>;
}
function CalendarIcon(props: any) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function LaptopIcon(props: any) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>;
}
// Icono SVG de LinkedIn personalizado
function LinkedinIcon(props: any) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
}