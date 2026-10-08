import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  IdCard,
  Building2,
  UserPlus,
  Loader2,
  X,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RegisterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const departments = [
  "School of Architecture, Construction Economics & Management",
  "School of Earth Sciences, Real Estate, Business & Informatics",
  "School of Environmental Science & Technology",
  "School of Spatial Planning & Social Science",
  "Institute of Human Settlements Studies",
];

const roles = ["Student", "Lecturer", "Department Admin"];

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 200 },
  }),
};

export function RegisterForm({ isOpen, onClose, onSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    role: "Student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Registration Complete!",
      description: "You can now login to your CampusMail account.",
    });

    setIsLoading(false);
    onSuccess();
  };

  const fields = [
    { label: "Full Name", name: "fullName", icon: <User className="h-4 w-4 text-gray-400" />, type: "text", placeholder: "Victor Mpambije" },
    { label: "Student/Staff ID", name: "studentId", icon: <IdCard className="h-4 w-4 text-gray-400" />, type: "text", placeholder: "30000/T.3333" },
    { label: "Email", name: "email", icon: <Mail className="h-4 w-4 text-gray-400" />, type: "email", placeholder: "mpambije@student.aru.ac.tz" },
    { label: "Role", name: "role", type: "select", options: roles },
    { label: "Department", name: "department", type: "select", icon: <Building2 className="h-4 w-4 text-gray-400" />, options: departments },
    { label: "Password", name: "password", type: "password", icon: <Lock className="h-4 w-4 text-gray-400" />, show: showPassword, toggle: () => setShowPassword(!showPassword) },
    { label: "Confirm Password", name: "confirmPassword", type: "password", icon: <Lock className="h-4 w-4 text-gray-400" />, show: showConfirmPassword, toggle: () => setShowConfirmPassword(!showConfirmPassword) },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 overflow-hidden"
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="relative bg-gradient-to-r from-[#004A98] via-[#0EA5E9] to-[#22C55E] p-6 text-white flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 bg-white/20 p-2 rounded-full hover:bg-white/30"
                >
                  <X className="h-4 w-4" />
                </button>
                <img
                  src="assets/AKTEUR_Ardhi-University_LOGO_400x400_200322.webp"
                  alt="ARU Logo"
                  className="h-10 w-10 rounded-lg bg-white p-1 shadow-md"
                />
                <div>
                  <h2 className="text-2xl font-bold tracking-wide">Create ARU Account</h2>
                  <p className="text-white/80">Join the ARU CampusMail community</p>
                </div>
              </div>

              {/* FORM */}
              <form className="p-6 space-y-4 max-h-[60vh] overflow-y-auto" onSubmit={handleSubmit}>
                {fields.map((field, i) => (
                  <motion.div
                    key={field.name}
                    custom={i}
                    variants={fieldVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <label className="text-sm font-medium">{field.label}</label>
                    <div className="relative">
                      {field.icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{field.icon}</div>}
                      {field.type === "select" ? (
                        <select
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          className="input-aru pl-3 rounded-xl"
                          required
                        >
                          <option value="">Select {field.label}</option>
                          {field.options?.map((opt) => (
                            <option key={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type === "password" ? (field.show ? "text" : "password") : field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="input-aru pl-10 pr-10 rounded-xl"
                          required
                        />
                      )}
                      {field.type === "password" && field.toggle && (
                        <button
                          type="button"
                          onClick={field.toggle}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {field.show ? <EyeOff /> : <Eye />}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 mt-4 rounded-3xl font-bold text-white bg-gradient-to-r from-[#004A98] via-[#0EA5E9] to-[#22C55E] shadow-lg shadow-primary/30 hover:shadow-xl"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 inline h-5 w-5 animate-spin" />
                  ) : (
                    <UserPlus className="mr-2 inline h-5 w-5" />
                  )}
                  {isLoading ? "Creating Account..." : "Create Account"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
