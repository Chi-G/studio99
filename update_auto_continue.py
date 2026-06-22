import re

# 1. Update Welcome.jsx
with open('resources/js/Pages/Welcome.jsx', 'r') as f:
    content = f.read()

content = content.replace("import { Head, Link, usePage } from '@inertiajs/react';", "import { Head, Link, usePage, router } from '@inertiajs/react';")

state_replacement = """  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [intendedUrl, setIntendedUrl] = useState('');

  const handleRequestServiceClick = (e) => {
    if (e) e.preventDefault();
    if (auth.user) {
      router.visit('/client/requests/create');
    } else {
      setIntendedUrl('/client/requests/create');
      setIsRegisterModalOpen(true);
    }
  };"""

content = content.replace("  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\n  const [scrolled, setScrolled] = useState(false);", state_replacement)

modals_replacement = """      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => { setIsLoginModalOpen(false); setIsRegisterModalOpen(true); }}
        onSwitchToForgotPassword={() => { setIsLoginModalOpen(false); setIsForgotPasswordModalOpen(true); }}
        intendedUrl={intendedUrl}
      />

      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => { setIsRegisterModalOpen(false); setIsLoginModalOpen(true); }}
        intendedUrl={intendedUrl}
      />"""

content = re.sub(r'<LoginModal[\s\S]*?/>\s*<RegisterModal[\s\S]*?/>', modals_replacement, content)

# Replace buttons manually to avoid changing navbar 'Get Started'
buttons_to_replace = [
    ('onClick={() => setIsRegisterModalOpen(true)} className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-red text-white font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">\n                Request a Service', 
     'onClick={handleRequestServiceClick} className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-red text-white font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">\n                Request a Service'),
    
    ('onClick={() => setIsRegisterModalOpen(true)} className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors mt-2">\n                    Request a Service',
     'onClick={handleRequestServiceClick} className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors mt-2">\n                    Request a Service'),
    
    ('onClick={() => setIsRegisterModalOpen(true)} className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors text-sm">\n                    Request Video Editing',
     'onClick={handleRequestServiceClick} className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors text-sm">\n                    Request Video Editing'),
    
    ('onClick={() => setIsRegisterModalOpen(true)} className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors text-sm">\n                    Build My Website',
     'onClick={handleRequestServiceClick} className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors text-sm">\n                    Build My Website'),
    
    ('onClick={() => setIsRegisterModalOpen(true)} className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors text-sm">\n                    Manage My Social Media',
     'onClick={handleRequestServiceClick} className="inline-flex items-center gap-2 text-brand-red font-bold hover:text-red-400 transition-colors text-sm">\n                    Manage My Social Media'),
     
    ('onClick={() => setIsRegisterModalOpen(true)} className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-red text-white font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">\n              Start Your Project Today',
     'onClick={handleRequestServiceClick} className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-red text-white font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">\n              Start Your Project Today'),
     
    ('<a href="#services" className="hover:text-white transition-colors">Request a Service</a>',
     '<a href="#services" onClick={handleRequestServiceClick} className="hover:text-white transition-colors">Request a Service</a>'),
     
    ('<a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Request a Service</a>',
     '<a href="#services" onClick={(e) => { setIsMobileMenuOpen(false); handleRequestServiceClick(e); }} className="hover:text-white transition-colors">Request a Service</a>')
]

for old, new in buttons_to_replace:
    content = content.replace(old, new)

with open('resources/js/Pages/Welcome.jsx', 'w') as f:
    f.write(content)

# 2. Update RegisterModal.jsx
with open('resources/js/Components/Modals/RegisterModal.jsx', 'r') as f:
    reg_content = f.read()

reg_content = reg_content.replace('export function RegisterModal({ open, onClose, onSwitchToLogin }) {', 'export function RegisterModal({ open, onClose, onSwitchToLogin, intendedUrl }) {')
reg_content = reg_content.replace("""    password: '',
    password_confirmation: '',
  });""", """    password: '',
    password_confirmation: '',
    redirect_to: intendedUrl || '',
  });""")
reg_content = reg_content.replace("""    if (open) {
      clearErrors();
    } else {""", """    if (open) {
      clearErrors();
      setData('redirect_to', intendedUrl || '');
    } else {""")
reg_content = reg_content.replace("}, [open]);", "}, [open, intendedUrl]);")

with open('resources/js/Components/Modals/RegisterModal.jsx', 'w') as f:
    f.write(reg_content)

# 3. Update RegisteredUserController.php
with open('app/Http/Controllers/Auth/RegisteredUserController.php', 'r') as f:
    ruc_content = f.read()

ruc_content = ruc_content.replace("""        Auth::login($user);

        return redirect(route('client.dashboard', absolute: false));""", """        Auth::login($user);

        if ($request->input('redirect_to')) {
            return redirect()->to($request->input('redirect_to'));
        }

        return redirect(route('client.dashboard', absolute: false));""")

with open('app/Http/Controllers/Auth/RegisteredUserController.php', 'w') as f:
    f.write(ruc_content)

print("Done updating Registered user logic.")
