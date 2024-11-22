export function isValidVietnamesePhoneNumber(phoneNumber: string): boolean {
  const regex = /^(0|(\+84))([3|5|7|8|9])+([0-9]{8})$/;
  return regex.test(phoneNumber);
}
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}
