export const safeShareToWhatsApp = (text: string, phone?: string) => {
  const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
  const url = cleanPhone
    ? `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(text)}`
    : `https://wa.me/?text=${encodeURIComponent(text)}`;
  
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
