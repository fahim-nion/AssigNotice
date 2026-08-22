// 1. Add state to your component
const [step, setStep] = useState<'phone' | 'code' | 'password'>('phone');
const [phoneNumber, setPhoneNumber] = useState('');
const [verificationCode, setVerificationCode] = useState('');
const [password, setPassword] = useState('');

// 2. Update your "Request Login Code" function
const handleRequestCode = async () => {
  const data = await TelegramAPI.sendCode(phoneNumber);
  if (data.status === 'CODE_SENT') {
    setStep('code'); // This switches the UI to show the OTP box
  }
};

// 3. Update your "Verify Code" function
const handleVerifyCode = async () => {
  const data = await TelegramAPI.verifyCode(verificationCode);
  if (data.status === 'WAITING_FOR_2FA') {
    setStep('password'); // Switch to 2FA password box
  } else if (data.status === 'AUTHORIZED') {
    // Refresh or redirect
  }
};