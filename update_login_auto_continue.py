# 1. Update LoginModal.jsx
with open('resources/js/Components/Modals/LoginModal.jsx', 'r') as f:
    log_content = f.read()

log_content = log_content.replace('export function LoginModal({ open, onClose, onSwitchToRegister, onSwitchToForgotPassword }) {', 'export function LoginModal({ open, onClose, onSwitchToRegister, onSwitchToForgotPassword, intendedUrl }) {')
log_content = log_content.replace("""    password: '',
    remember: false,
  });""", """    password: '',
    remember: false,
    redirect_to: intendedUrl || '',
  });""")
log_content = log_content.replace("""    if (open) {
      clearErrors();
    } else {""", """    if (open) {
      clearErrors();
      setData('redirect_to', intendedUrl || '');
    } else {""")
log_content = log_content.replace("}, [open]);", "}, [open, intendedUrl]);")

with open('resources/js/Components/Modals/LoginModal.jsx', 'w') as f:
    f.write(log_content)

# 2. Update AuthenticatedSessionController.php
with open('app/Http/Controllers/Auth/AuthenticatedSessionController.php', 'r') as f:
    asc_content = f.read()

asc_content = asc_content.replace("""        Auth::login($user, $request->boolean('remember'));
        $request->session()->regenerate();

        if ($user->role === 'admin') {""", """        Auth::login($user, $request->boolean('remember'));
        $request->session()->regenerate();

        if ($request->input('redirect_to')) {
            return redirect()->to($request->input('redirect_to'));
        }

        if ($user->role === 'admin') {""")

with open('app/Http/Controllers/Auth/AuthenticatedSessionController.php', 'w') as f:
    f.write(asc_content)

print("Done updating Login user logic.")
