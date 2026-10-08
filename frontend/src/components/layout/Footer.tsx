import { useEffect, useState } from "react";
import {
  ExternalLink,
  GraduationCap,
  Building2,
  CreditCard,
  Users,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MessageCircle,
} from "lucide-react";

const footerLinks = [
  { name: "ARU Website", url: "https://www.aru.ac.tz/", icon: GraduationCap },
  { name: "AMIS2 Portal", url: "https://amis2.aru.ac.tz/", icon: Building2 },
  { name: "HESLB OLAMS", url: "https://olas.heslb.go.tz/olams/pre-applicant", icon: CreditCard },
  { name: "ARUSO Website", url: "https://aruso.org/", icon: Users },
];

const socialLinks = [
  { name: "WhatsApp", url: "https://wa.me/255000000000", icon: MessageCircle },
  { name: "Twitter/X", url: "https://twitter.com", icon: Twitter },
  { name: "Facebook", url: "https://facebook.com", icon: Facebook },
  { name: "Instagram", url: "https://instagram.com", icon: Instagram },
  { name: "YouTube", url: "https://youtube.com", icon: Youtube },
];

export function Footer() {
  const [hideFooter, setHideFooter] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPos = window.scrollY;
      const delta = Math.abs(currentPos - lastScrollPos);

      if (delta > 15 && currentPos > lastScrollPos) {
        setHideFooter(true);
      } else {
        setHideFooter(false);
      }

      setLastScrollPos(currentPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPos]);

  return (
    <footer
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 
      w-[96%] md:w-[80%] rounded-2xl 
      border border-white/10 backdrop-blur-xl 
      shadow-[0_0_25px_rgba(0,255,200,0.3)] 
      transition-all duration-500 z-50 
      ${hideFooter ? "opacity-0 translate-y-5" : "opacity-100 translate-y-0"}
      bg-[#0d1b2a]/40`}
      style={{
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Neon top line */}
      <div className="w-full h-[1.5px] bg-gradient-to-r from-[#2fffe0] via-[#4da3ff] to-[#2fffe0] opacity-70 rounded-full"></div>

      <div className="flex items-center justify-between px-4 py-2">

        {/* LEFT → Quick Links */}
        <div className="flex items-center gap-4 md:gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 
              text-xs text-gray-300 
              hover:text-[#2fffe0] transition-all duration-200 
              hover:-translate-y-[1px]"
            >
              <link.icon className="h-3 w-3 group-hover:text-[#2fffe0]" />
              <span className="hidden sm:block">{link.name}</span>
              <ExternalLink className="h-2 w-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* RIGHT → Social Icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 
              transition-all duration-200 hover:-translate-y-[2px]
              shadow-[0_0_8px_rgba(0,255,200,0.3)]"
            >
              <s.icon className="h-4 w-4 text-[#2fffe0] hover:text-[#4da3ff]" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom neon bar */}
      <div className="w-full h-[1.5px] bg-gradient-to-r from-[#4da3ff] via-[#2fffe0] to-[#4da3ff] opacity-70 rounded-full"></div>
    </footer>
  );
}
export default Footer;
